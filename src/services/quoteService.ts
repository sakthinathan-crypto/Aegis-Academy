/**
 * AEGIS ACADEMY - ENTERPRISE QUOTE SERVICE
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
    return apiClient.get<QuoteRecord[]>('listQuotes', { token });
  },

  async updateStatus(quoteId: string, status: string, adminNotes?: string, token?: string): Promise<ApiResponse> {
    return apiClient.post('updateQuoteStatus', { quoteId, status, adminNotes, token });
  }
};
