/**
 * AEGIS ACADEMY - CONTACT SERVICE
 * Uses POST body transport for authenticated admin reads/updates.
 */

import { apiClient, ApiResponse } from './apiClient';

export interface ContactSubmission {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  inquiryType: string;
  subject: string;
  message: string;
  _hp_field?: string;
}

export interface ContactRecord extends ContactSubmission {
  messageId: string;
  status: string;
  submittedAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export const contactService = {
  async submitContact(data: ContactSubmission): Promise<ApiResponse<{ messageId: string }>> {
    return apiClient.post('submitContact', data);
  },

  async listMessages(token?: string): Promise<ApiResponse<ContactRecord[]>> {
    return apiClient.post<ContactRecord[]>('listContacts', { token });
  },

  async updateStatus(messageId: string, status: string, adminNotes?: string, token?: string): Promise<ApiResponse> {
    return apiClient.post('updateContactStatus', { messageId, status, adminNotes, token });
  }
};
