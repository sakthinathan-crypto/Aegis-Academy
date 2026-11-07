/**
 * AEGIS ACADEMY - ADMIN METRICS SERVICE
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
  createdAt: string;
}

export const adminService = {
  async getOverview(): Promise<ApiResponse<{ metrics: DashboardMetrics; recentActivity: ActivityLog[] }>> {
    const token = authService.getToken() || '';
    return apiClient.get('getOverview', { token });
  },

  async getActivityLogs(): Promise<ApiResponse<ActivityLog[]>> {
    const token = authService.getToken() || '';
    return apiClient.get('getActivityLogs', { token });
  }
};
