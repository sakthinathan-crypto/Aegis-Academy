export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const FIELD_LIMITS = {
  NAME_MAX: 100,
  EMAIL_MAX: 150,
  PHONE_MAX: 25,
  ORGANIZATION_MAX: 150,
  INSTITUTION_MAX: 150,
  DEPARTMENT_MAX: 100,
  DISTRICT_MAX: 80,
  SUBJECT_MAX: 160,
  MESSAGE_MAX: 2500,
  REQUIREMENTS_MAX: 3000,
  URL_MAX: 500
} as const;

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  if (/[\r\n\x00-\x1F\x7F]/.test(email)) return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > FIELD_LIMITS.EMAIL_MAX) return false;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(trimmed);
}

export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const trimmed = phone.trim();
  if (trimmed.length > FIELD_LIMITS.PHONE_MAX) return false;
  const cleaned = trimmed.replace(/[\s\-()+]/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15 && /^\d+$/.test(cleaned);
}

/**
 * Validates and normalizes an external HTTP/HTTPS URL, returning null if unsafe (blocks javascript:, data:, etc.)
 */
export function getSafeExternalUrl(url?: string | null, allowedHostSuffixes?: string[]): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed || trimmed.length > FIELD_LIMITS.URL_MAX) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }
    if (allowedHostSuffixes && allowedHostSuffixes.length > 0) {
      const host = parsed.hostname.toLowerCase();
      const matches = allowedHostSuffixes.some(
        suffix => host === suffix || host.endsWith('.' + suffix)
      );
      if (!matches) return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

export function generateApplicationId(prefix: string = 'AEGIS'): string {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}-${year}-${randomChars}${timestamp}`;
}

export function validateEnrollmentForm(data: {
  studentName: string;
  phone: string;
  whatsapp: string;
  email: string;
  institutionName: string;
  department: string;
  yearOfStudy: string;
  district: string;
  selectedProgram: string;
  learningMode: string;
  additionalInfo?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  const studentName = data.studentName ? data.studentName.trim() : '';
  if (studentName.length < 2 || studentName.length > FIELD_LIMITS.NAME_MAX) {
    errors.studentName = 'Full student name must be between 2 and 100 characters.';
  }

  if (!validatePhone(data.phone)) {
    errors.phone = 'Valid phone number required (10-15 digits).';
  }

  if (!validatePhone(data.whatsapp)) {
    errors.whatsapp = 'Valid WhatsApp number required (10-15 digits).';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Valid academic or personal email address is required.';
  }

  const institutionName = data.institutionName ? data.institutionName.trim() : '';
  if (institutionName.length < 3 || institutionName.length > FIELD_LIMITS.INSTITUTION_MAX) {
    errors.institutionName = 'School or College name must be between 3 and 150 characters.';
  }

  const department = data.department ? data.department.trim() : '';
  if (department.length < 2 || department.length > FIELD_LIMITS.DEPARTMENT_MAX) {
    errors.department = 'Department / Stream must be between 2 and 100 characters.';
  }

  if (!data.yearOfStudy) {
    errors.yearOfStudy = 'Please select your current year or grade of study.';
  }

  const district = data.district ? data.district.trim() : '';
  if (district.length < 2 || district.length > FIELD_LIMITS.DISTRICT_MAX) {
    errors.district = 'District / City must be between 2 and 80 characters.';
  }

  if (!data.selectedProgram) {
    errors.selectedProgram = 'Please select a program of interest.';
  }

  if (!data.learningMode) {
    errors.learningMode = 'Please select your preferred learning mode.';
  }

  if (data.additionalInfo && data.additionalInfo.length > FIELD_LIMITS.MESSAGE_MAX) {
    errors.additionalInfo = 'Additional information cannot exceed 2500 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateQuoteRequest(data: {
  name: string;
  organization: string;
  email: string;
  phone: string;
  serviceRequired: string;
  projectDescription: string;
  estimatedBudget: string;
  expectedTimeline: string;
  additionalRequirements?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  const name = data.name ? data.name.trim() : '';
  if (name.length < 2 || name.length > FIELD_LIMITS.NAME_MAX) {
    errors.name = 'Contact person name must be between 2 and 100 characters.';
  }

  const organization = data.organization ? data.organization.trim() : '';
  if (organization.length < 2 || organization.length > FIELD_LIMITS.ORGANIZATION_MAX) {
    errors.organization = 'Company or institution name must be between 2 and 150 characters.';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Valid corporate or organizational email address required.';
  }

  if (!validatePhone(data.phone)) {
    errors.phone = 'Valid contact phone number is required.';
  }

  if (!data.serviceRequired) {
    errors.serviceRequired = 'Please specify the primary service needed.';
  }

  const projectDesc = data.projectDescription ? data.projectDescription.trim() : '';
  if (projectDesc.length < 15 || projectDesc.length > FIELD_LIMITS.REQUIREMENTS_MAX) {
    errors.projectDescription = 'Please provide a project description (15 to 3000 characters).';
  }

  if (!data.estimatedBudget) {
    errors.estimatedBudget = 'Please select an estimated budget range.';
  }

  if (!data.expectedTimeline) {
    errors.expectedTimeline = 'Please select an expected delivery timeline.';
  }

  if (data.additionalRequirements && data.additionalRequirements.length > 500) {
    errors.additionalRequirements = 'Additional requirements cannot exceed 500 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  category: string;
  subject: string;
  message: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  const name = data.name ? data.name.trim() : '';
  if (name.length < 2 || name.length > FIELD_LIMITS.NAME_MAX) {
    errors.name = 'Your name must be between 2 and 100 characters.';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Valid email address is required.';
  }

  if (data.phone && data.phone.trim().length > 0 && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid 10-15 digit phone number.';
  }

  if (data.organization && data.organization.length > FIELD_LIMITS.ORGANIZATION_MAX) {
    errors.organization = 'Organization name cannot exceed 150 characters.';
  }

  if (!data.category) {
    errors.category = 'Please select an inquiry category.';
  }

  const subject = data.subject ? data.subject.trim() : '';
  if (subject.length < 4 || subject.length > FIELD_LIMITS.SUBJECT_MAX) {
    errors.subject = 'Subject line must be between 4 and 160 characters.';
  }

  const message = data.message ? data.message.trim() : '';
  if (message.length < 10 || message.length > FIELD_LIMITS.MESSAGE_MAX) {
    errors.message = 'Please provide a detailed message (10 to 2500 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateCareerApplicationForm(data: {
  candidateName: string;
  email: string;
  phone: string;
  qualification: string;
  collegeOrOrg: string;
  linkedInOrPortfolio: string;
  coverNote?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  const name = data.candidateName ? data.candidateName.trim() : '';
  if (name.length < 2 || name.length > FIELD_LIMITS.NAME_MAX) {
    errors.candidateName = 'Full name must be between 2 and 100 characters.';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'A valid email address is required.';
  }

  if (!validatePhone(data.phone)) {
    errors.phone = 'A valid phone number (10-15 digits) is required.';
  }

  const qualification = data.qualification ? data.qualification.trim() : '';
  if (qualification.length < 2 || qualification.length > FIELD_LIMITS.DEPARTMENT_MAX) {
    errors.qualification = 'Academic qualification is required (max 100 chars).';
  }

  const collegeOrOrg = data.collegeOrOrg ? data.collegeOrOrg.trim() : '';
  if (collegeOrOrg.length < 2 || collegeOrOrg.length > FIELD_LIMITS.ORGANIZATION_MAX) {
    errors.collegeOrOrg = 'College or organization name is required (max 150 chars).';
  }

  if (!getSafeExternalUrl(data.linkedInOrPortfolio)) {
    errors.linkedInOrPortfolio = 'Please provide a valid http:// or https:// LinkedIn or GitHub profile URL.';
  }

  if (data.coverNote && data.coverNote.length > FIELD_LIMITS.MESSAGE_MAX) {
    errors.coverNote = 'Cover note cannot exceed 2500 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
