/**
 * ============================================================================
 * AEGIS ACADEMY — CENTRALIZED PRODUCTION API CLIENT
 * File: src/services/apiClient.ts
 * Description: Hardened HTTP client communicating with Google Apps Script Web App.
 * Security rules:
 * - Never transmits session tokens in URL query parameters.
 * - Strictly validates Google Apps Script HTTPS endpoint format.
 * - Validates JSON envelope structure and triggers session expiry handling.
 * - Never logs credentials, tokens, or personal information.
 * ============================================================================
 */

export interface ApiError {
  code: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: ApiError | string | null;
  [key: string]: any;
}

const APPS_SCRIPT_URL =
  import.meta.env.VITE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbw5Gf_RRV0To7gOKDJjfBr-Z0nRmJ-7jYfYUVZ__HplBPIAGIaQW61Be_HvX650P819/exec';
const REQUEST_TIMEOUT_MS = 15000; // 15 seconds timeout
const GAS_URL_PATTERN = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/;

type UnauthorizedListener = () => void;

class ApiClient {
  private url: string;
  private unauthorizedListeners: Set<UnauthorizedListener> = new Set();

  constructor() {
    this.url = String(APPS_SCRIPT_URL || '').trim();
  }

  public onUnauthorized(listener: UnauthorizedListener): () => void {
    this.unauthorizedListeners.add(listener);
    return () => {
      this.unauthorizedListeners.delete(listener);
    };
  }

  private notifyUnauthorized(): void {
    this.unauthorizedListeners.forEach(listener => {
      try {
        listener();
      } catch {
        // Ignore listener errors
      }
    });
  }

  public setEndpoint(url: string) {
    const trimmed = String(url || '').trim();
    if (!GAS_URL_PATTERN.test(trimmed)) {
      throw new Error('Invalid Google Apps Script endpoint format.');
    }
    this.url = trimmed;
  }

  public getEndpoint(): string {
    return this.url;
  }

  public isConfigured(): boolean {
    return GAS_URL_PATTERN.test(this.url);
  }

  public isConnected(): boolean {
    return this.isConfigured();
  }

  /**
   * Helper to format standard error responses
   */
  private makeError(code: string, message: string): ApiResponse<any> {
    return {
      success: false,
      message,
      data: null,
      error: { code, message }
    };
  }

  /**
   * Validate and normalize parsed API response envelope
   */
  private validateResponseEnvelope<T>(raw: unknown): ApiResponse<T> {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return this.makeError('INVALID_RESPONSE', 'Received malformed response from backend server.');
    }
    const obj = raw as Record<string, any>;
    if (typeof obj.success !== 'boolean') {
      return this.makeError('INVALID_RESPONSE', 'Unexpected backend response structure.');
    }

    const errCode = typeof obj.error === 'object' && obj.error ? obj.error.code : undefined;
    if (!obj.success && errCode === 'UNAUTHORIZED') {
      this.notifyUnauthorized();
    }

    return obj as ApiResponse<T>;
  }

  /**
   * HTTP GET to Google Apps Script Web App (Strictly for public unauthenticated reads)
   */
  public async get<T = any>(action: string, params: Record<string, string | number | boolean> = {}): Promise<ApiResponse<T>> {
    if (!this.isConfigured()) {
      return this.makeError(
        'BACKEND_NOT_CONFIGURED',
        'Backend service is currently unavailable. Please try again later.'
      );
    }

    // Hard block against leaking tokens in query strings
    if (Object.prototype.hasOwnProperty.call(params, 'token')) {
      return this.makeError(
        'SECURITY_POLICY_VIOLATION',
        'Session tokens must not be passed in GET query parameters.'
      );
    }

    const cleanParams: Record<string, string> = {
      action: String(action),
      _t: Date.now().toString()
    };
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) {
        cleanParams[k] = String(v);
      }
    }

    const query = new URLSearchParams(cleanParams);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${this.url}?${query.toString()}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        },
        credentials: 'omit',
        referrerPolicy: 'strict-origin-when-cross-origin',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return this.makeError(
          `HTTP_${response.status}`,
          'Unable to retrieve data from the server right now.'
        );
      }

      const json = await response.json();
      return this.validateResponseEnvelope<T>(json);
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err && err.name === 'AbortError') {
        return this.makeError('TIMEOUT_ERROR', 'The request timed out after 15 seconds. Please try again.');
      }
      return this.makeError('NETWORK_ERROR', 'Network error communicating with the server. Please check your connection.');
    }
  }

  /**
   * HTTP POST to Google Apps Script Web App (Uses text/plain to avoid CORS OPTIONS preflight; keeps tokens & PII in TLS body)
   */
  public async post<T = any>(action: string, body: Record<string, any> = {}): Promise<ApiResponse<T>> {
    if (!this.isConfigured()) {
      return this.makeError(
        'BACKEND_NOT_CONFIGURED',
        'Backend service is not configured. Submissions could not be sent.'
      );
    }

    const payload = {
      action,
      ...body,
      _clientTimestamp: new Date().toISOString()
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        credentials: 'omit',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return this.makeError(
          `HTTP_${response.status}`,
          'The server could not process your request right now. Please try again.'
        );
      }

      const json = await response.json();
      return this.validateResponseEnvelope<T>(json);
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err && err.name === 'AbortError') {
        return this.makeError('TIMEOUT_ERROR', 'The submission timed out after 15 seconds. Please try again.');
      }
      return this.makeError('NETWORK_ERROR', 'Network error submitting your request. Please check your connection.');
    }
  }
}

export const apiClient = new ApiClient();
