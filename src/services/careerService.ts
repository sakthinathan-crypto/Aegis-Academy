/**
 * AEGIS ACADEMY - CAREER SERVICE
 */

import { apiClient, ApiResponse } from './apiClient';

export interface CareerSubmission {
  fullName: string;
  email: string;
  phone: string;
  qualification?: string;
  collegeOrOrg?: string;
  academicYear?: string;
  roleApplied: string;
  department: string;
  experienceYears?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  coverNote?: string;
  resumeFile?: {
    name: string;
    type: string;
    size: number;
    base64: string;
  };
}

export interface CareerRecord extends Omit<CareerSubmission, 'resumeFile'> {
  applicationId: string;
  resumeDriveFileId?: string;
  resumeDriveUrl?: string;
  resumeFileName?: string;
  status: string;
  submittedAt: string;
  updatedAt: string;
  adminNotes?: string;
}

/**
 * Convert File to Base64 with validation
 */
export async function fileToBase64(file: File): Promise<{ name: string; type: string; size: number; base64: string }> {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    throw new Error('File size exceeds the 5MB limit. Please upload a smaller PDF or DOCX file.');
  }

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
    throw new Error('Invalid file type. Only PDF and DOCX resumes are accepted.');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] || '';
      resolve({
        name: file.name,
        type: file.type || 'application/pdf',
        size: file.size,
        base64
      });
    };
    reader.onerror = () => reject(new Error('Failed to read file. Please try again.'));
    reader.readAsDataURL(file);
  });
}

export const careerService = {
  async submitApplication(data: CareerSubmission): Promise<ApiResponse<{ applicationId: string }>> {
    return apiClient.post('submitApplication', data);
  },

  async listApplications(token?: string): Promise<ApiResponse<CareerRecord[]>> {
    return apiClient.get<CareerRecord[]>('listApplications', { token });
  },

  async updateStatus(applicationId: string, status: string, adminNotes?: string, token?: string): Promise<ApiResponse> {
    return apiClient.post('updateApplicationStatus', { applicationId, status, adminNotes, token });
  },

  async getResumeDownloadUrl(applicationId: string, token: string): Promise<ApiResponse<{ downloadUrl: string; fileName: string; mimeType: string }>> {
    return apiClient.get<{ downloadUrl: string; fileName: string; mimeType: string }>('getResumeDownloadUrl', { applicationId, token });
  }
};
