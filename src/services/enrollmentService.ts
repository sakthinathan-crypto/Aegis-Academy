/**
 * AEGIS ACADEMY - ENROLLMENT SERVICE
 * Uses POST body transport for authenticated admin reads/updates.
 */

import { apiClient, ApiResponse } from './apiClient';

export interface EnrollmentSubmission {
  fullName: string;
  email: string;
  phone: string;
  guardianName?: string;
  guardianPhone?: string;
  institution: string;
  programTitle: string;
  programCode: string;
  programDivision: string;
  deliveryMode: string;
  preferredBatch: string;
  comments?: string;
  _hp_field?: string;
}

export interface EnrollmentRecord extends EnrollmentSubmission {
  enrollmentId: string;
  status: string;
  submittedAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export const enrollmentService = {
  async submitEnrollment(data: EnrollmentSubmission): Promise<ApiResponse<{ enrollmentId: string }>> {
    return apiClient.post('submitEnrollment', data);
  },

  async listEnrollments(token?: string): Promise<ApiResponse<EnrollmentRecord[]>> {
    return apiClient.post<EnrollmentRecord[]>('listEnrollments', { token });
  },

  async updateStatus(enrollmentId: string, status: string, adminNotes?: string, token?: string): Promise<ApiResponse> {
    return apiClient.post('updateEnrollmentStatus', { enrollmentId, status, adminNotes, token });
  }
};
