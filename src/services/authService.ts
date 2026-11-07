/**
 * AEGIS ACADEMY - AUTH SERVICE
 * Handles admin session management, JWT storage, and role checks.
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

export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: AdminUser }>> {
    const res = await apiClient.post('login', { email, password });
    if (res.success && res.token && res.user) {
      this.setSession(res.token, res.user);
    }
    return res;
  },

  setSession(token: string, user: AdminUser): void {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  logout(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  getUser(): AdminUser | null {
    const userStr = sessionStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return Boolean(this.getToken() && this.getUser());
  }
};
