/**
 * AEGIS ACADEMY - ENTERPRISE QUOTE SERVICE
 * Uses POST body transport for authenticated admin reads/updates.
 */

import { apiClient, ApiResponse } from './apiClient';

export interface QuoteSubmission {
  fullName: string;
  workEmail: string;
  phone: string;
  companyName: string;
  companyType: string;
  serviceRequired: string;
  budgetRange: string;
  targetTimeline: string;
  requirements: string;
  _hp_field?: string;
}

export interface QuoteRecord extends QuoteSubmission {
  quoteId: string;
  status: string;
  submittedAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export const quoteService = {
  async submitQuote(data: QuoteSubmission): Promise<ApiResponse<{ quoteId: string }>> {
    return apiClient.post('submitQuote', data);
  },

  async listQuotes(token?: string): Promise<ApiResponse<QuoteRecord[]>> {
    return apiClient.post<QuoteRecord[]>('listQuotes', { token });
  },

  async updateStatus(quoteId: string, status: string, adminNotes?: string, token?: string): Promise<ApiResponse> {
    return apiClient.post('updateQuoteStatus', { quoteId, status, adminNotes, token });
  }
};
