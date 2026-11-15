/**
 * AEGIS ACADEMY - AUTH SERVICE
 * Handles admin session management, client-side JWT claim validation,
 * backend session verification & revocation, and RBAC permission helpers.
 */

import { apiClient, ApiResponse } from './apiClient';

export interface AdminUser {
  userId: string;
  email: string;
  name: string;
  role: string;
}

const TOKEN_KEY = 'aegis_admin_jwt';
const USER_KEY = 'aegis_admin_user';

const VALID_ROLES = ['Super Admin', 'Admin', 'Coordinator', 'Viewer'] as const;

const ROLE_PERMISSIONS: Record<string, string[]> = {
  'Super Admin': ['all'],
  'Admin': ['view_dashboard', 'manage_enrollments', 'manage_contacts', 'manage_quotes', 'manage_careers', 'manage_content', 'view_logs'],
  'Coordinator': ['view_dashboard', 'manage_enrollments', 'manage_contacts'],
  'Viewer': ['view_dashboard']
};

interface DecodedTokenClaims {
  userId?: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
  jti?: string;
  iss?: string;
}

function decodeBase64Url(segment: string): string | null {
  try {
    const normalized = segment.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

function parseAndValidateClientToken(token: string | null): DecodedTokenClaims | null {
  if (!token || typeof token !== 'string' || token.length < 30 || token.length > 2048) {
    return null;
  }
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const headerStr = decodeBase64Url(parts[0]);
  const payloadStr = decodeBase64Url(parts[1]);
  if (!headerStr || !payloadStr) return null;

  try {
    const header = JSON.parse(headerStr);
    if (!header || header.alg !== 'HS256' || header.typ !== 'JWT') {
      return null;
    }

    const payload: DecodedTokenClaims = JSON.parse(payloadStr);
    if (!payload || typeof payload !== 'object') return null;

    if (typeof payload.exp !== 'number' || !Number.isFinite(payload.exp)) return null;
    if (typeof payload.iat !== 'number' || !Number.isFinite(payload.iat)) return null;
    if (payload.exp <= payload.iat) return null;
    if (Date.now() > payload.exp) return null;

    if (!payload.userId || !payload.email || !payload.role) return null;
    if (!VALID_ROLES.includes(payload.role as any)) return null;

    return payload;
  } catch {
    return null;
  }
}

export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: AdminUser }>> {
    const res = await apiClient.post<{ token: string; user: AdminUser }>('login', {
      email: String(email || '').trim().toLowerCase(),
      password
    });
    const token = res.data?.token;
    const user = res.data?.user;
    if (res.success && token && user && parseAndValidateClientToken(token)) {
      this.setSession(token, user);
    }
    return res;
  },

  async verifySession(): Promise<ApiResponse<{ user: AdminUser; valid: boolean }>> {
    const token = this.getToken();
    if (!token) {
      this.clearLocalSession();
      return {
        success: false,
        message: 'No active session.',
        data: undefined,
        error: { code: 'UNAUTHORIZED', message: 'No active session.' }
      };
    }

    const res = await apiClient.post<{ user: AdminUser; valid: boolean }>('verifySession', { token });
    if (res.success && res.data?.user) {
      sessionStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
    } else if (
      res.error &&
      typeof res.error === 'object' &&
      (res.error.code === 'UNAUTHORIZED' || res.error.code === 'FORBIDDEN')
    ) {
      this.clearLocalSession();
    }
    return res;
  },

  setSession(token: string, user: AdminUser): void {
    const claims = parseAndValidateClientToken(token);
    if (!claims || !user || !VALID_ROLES.includes(user.role as any)) {
      this.clearLocalSession();
      return;
    }
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify({
      userId: user.userId,
      email: user.email,
      name: user.name,
      role: user.role
    }));
  },

  clearLocalSession(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },

  async logout(): Promise<void> {
    const token = sessionStorage.getItem(TOKEN_KEY);
    this.clearLocalSession();
    if (token && parseAndValidateClientToken(token)) {
      try {
        await apiClient.post('logout', { token });
      } catch {
        // Local session already cleared
      }
    }
  },

  getToken(): string | null {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!parseAndValidateClientToken(token)) {
      if (token) {
        this.clearLocalSession();
      }
      return null;
    }
    return token;
  },

  getUser(): AdminUser | null {
    const token = this.getToken();
    if (!token) return null;

    const userStr = sessionStorage.getItem(USER_KEY);
    if (!userStr) {
      this.clearLocalSession();
      return null;
    }
    try {
      const user = JSON.parse(userStr) as AdminUser;
      const claims = parseAndValidateClientToken(token);
      if (
        !user ||
        !claims ||
        user.userId !== claims.userId ||
        user.email.toLowerCase() !== String(claims.email).toLowerCase() ||
        user.role !== claims.role
      ) {
        this.clearLocalSession();
        return null;
      }
      return user;
    } catch {
      this.clearLocalSession();
      return null;
    }
  },

  hasPermission(permission: string, user?: AdminUser | null): boolean {
    const current = user || this.getUser();
    if (!current || !current.role) return false;
    const perms = ROLE_PERMISSIONS[current.role];
    if (!perms) return false;
    return perms.includes('all') || perms.includes(permission);
  },

  isAuthenticated(): boolean {
    return Boolean(this.getToken() && this.getUser());
  }
};
