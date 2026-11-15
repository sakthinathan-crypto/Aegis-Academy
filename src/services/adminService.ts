/**
 * AEGIS ACADEMY - ADMIN METRICS SERVICE
 * Uses POST JSON body transport so session tokens are never leaked in URLs.
 */

import { apiClient, ApiResponse } from './apiClient';
import { authService } from './authService';

export interface DashboardMetrics {
  totalEnrollments: number;
  pendingEnrollments: number;
  approvedEnrollments: number;
  totalContacts: number;
  newContacts: number;
  totalQuotes: number;
  openQuotes: number;
  totalApplications: number;
  pendingApplications: number;
}

export interface ActivityLog {
  logId: string;
  eventType: string;
  description: string;
  metadataJson?: string;
  createdAt?: string;
  timestamp?: string;
}

export const adminService = {
  async getOverview(): Promise<ApiResponse<{ metrics: DashboardMetrics; recentActivity: ActivityLog[] }>> {
    const token = authService.getToken() || '';
    return apiClient.post('getOverview', { token });
  },

  async getActivityLogs(): Promise<ApiResponse<ActivityLog[]>> {
    const token = authService.getToken() || '';
    return apiClient.post('getActivityLogs', { token });
  }
};
