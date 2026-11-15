/**
 * AEGIS ACADEMY - CAREER SERVICE
 * Hardened file validation (size, extension, MIME, binary signature) and
 * POST body token transport for admin resume access.
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
  _hp_field?: string;
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

const MIME_BY_EXT: Record<string, string[]> = {
  '.pdf': ['application/pdf'],
  '.doc': ['application/msword', 'application/octet-stream'],
  '.docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream']
};

function matchesBytes(bytes: Uint8Array, signature: number[]): boolean {
  if (bytes.length < signature.length) return false;
  for (let i = 0; i < signature.length; i++) {
    if (bytes[i] !== signature[i]) return false;
  }
  return true;
}

/**
 * Convert File to Base64 with strict extension, MIME, size, and binary signature validation
 */
export async function fileToBase64(file: File): Promise<{ name: string; type: string; size: number; base64: string }> {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (!file || file.size === 0) {
    throw new Error('Uploaded resume file is empty.');
  }
  if (file.size > MAX_SIZE) {
    throw new Error('File size exceeds the 5MB limit. Please upload a smaller PDF, DOC, or DOCX file.');
  }

  const cleanName = file.name.replace(/^.*[\\/]/, '').trim();
  const extMatch = cleanName.toLowerCase().match(/(\.[a-z0-9]+)$/);
  const ext = extMatch ? extMatch[1] : '';
  if (!ext || !MIME_BY_EXT[ext]) {
    throw new Error('Invalid file extension. Only PDF, DOC, and DOCX resumes are accepted.');
  }

  const declaredMime = (file.type || '').toLowerCase();
  if (declaredMime && !MIME_BY_EXT[ext].includes(declaredMime)) {
    throw new Error('File MIME type does not match the resume extension.');
  }

  // Verify binary file header signature before reading full base64 payload
  const headerBuf = await file.slice(0, 16).arrayBuffer();
  const headerBytes = new Uint8Array(headerBuf);
  if (ext === '.pdf' && !matchesBytes(headerBytes, [0x25, 0x50, 0x44, 0x46, 0x2D])) {
    throw new Error('Invalid PDF file signature. Please upload an authentic PDF document.');
  }
  if (ext === '.doc' && !matchesBytes(headerBytes, [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1])) {
    throw new Error('Invalid DOC file signature. Please upload an authentic Word (.doc) file.');
  }
  if (ext === '.docx' && !matchesBytes(headerBytes, [0x50, 0x4B, 0x03, 0x04])) {
    throw new Error('Invalid DOCX file signature. Please upload an authentic Word (.docx) file.');
  }

  const canonicalMime =
    ext === '.pdf'
      ? 'application/pdf'
      : ext === '.doc'
        ? 'application/msword'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] || '';
      if (!base64) {
        reject(new Error('Failed to encode resume file.'));
        return;
      }
      resolve({
        name: cleanName,
        type: canonicalMime,
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
    return apiClient.post<CareerRecord[]>('listApplications', { token });
  },

  async updateStatus(applicationId: string, status: string, adminNotes?: string, token?: string): Promise<ApiResponse> {
    return apiClient.post('updateApplicationStatus', { applicationId, status, adminNotes, token });
  },

  async getResumeDownloadUrl(applicationId: string, token: string): Promise<ApiResponse<{ downloadUrl: string; fileName: string; mimeType: string }>> {
    return apiClient.post<{ downloadUrl: string; fileName: string; mimeType: string }>('getResumeDownloadUrl', { applicationId, token });
  }
};
