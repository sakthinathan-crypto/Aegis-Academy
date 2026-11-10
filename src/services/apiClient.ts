/**
 * ============================================================================
 * AEGIS ACADEMY — CENTRALIZED PRODUCTION API CLIENT
 * File: src/services/apiClient.ts
 * Description: HTTP client communicating with Google Apps Script Web App.
 * Strict data integrity: failed requests return explicit errors; never silently
 * saves records to local storage.
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

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || '';
const REQUEST_TIMEOUT_MS = 15000; // 15 seconds timeout

class ApiClient {
  private url: string;

  constructor() {
    this.url = APPS_SCRIPT_URL.trim();
  }

  public setEndpoint(url: string) {
    this.url = url.trim();
  }

  public getEndpoint(): string {
    return this.url;
  }

  public isConfigured(): boolean {
    return Boolean(this.url && this.url.startsWith('https://script.google.com/'));
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
   * HTTP GET to Google Apps Script Web App
   */
  public async get<T = any>(action: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
    if (!this.isConfigured()) {
      return this.makeError(
        'BACKEND_NOT_CONFIGURED',
        'Backend endpoint is not configured. Please add VITE_APPS_SCRIPT_URL to your environment variables.'
      );
    }

    const query = new URLSearchParams({
      action,
      ...params,
      _t: Date.now().toString()
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${this.url}?${query.toString()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return this.makeError(
          `HTTP_${response.status}`,
          `Backend server returned HTTP status ${response.status}: ${response.statusText}`
        );
      }

      const json = await response.json();
      return json;
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        return this.makeError('TIMEOUT_ERROR', 'The request timed out after 15 seconds. Please try again.');
      }
      return this.makeError('NETWORK_ERROR', err.message || 'Network error communicating with Google Apps Script.');
    }
  }

  /**
   * HTTP POST to Google Apps Script Web App
   */
  public async post<T = any>(action: string, body: Record<string, any> = {}): Promise<ApiResponse<T>> {
    if (!this.isConfigured()) {
      return this.makeError(
        'BACKEND_NOT_CONFIGURED',
        'Backend endpoint is not configured. Submissions cannot be saved without a connected Google Apps Script URL.'
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
      // Use text/plain to avoid CORS preflight options blocks in Google Apps Script
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return this.makeError(
          `HTTP_${response.status}`,
          `Backend server returned HTTP status ${response.status}: ${response.statusText}`
        );
      }

      const json = await response.json();
      return json;
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        return this.makeError('TIMEOUT_ERROR', 'The submission timed out after 15 seconds. Please try again.');
      }
      return this.makeError('NETWORK_ERROR', err.message || 'Network error submitting to Google Apps Script.');
    }
  }
}

export const apiClient = new ApiClient();
