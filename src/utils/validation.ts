export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  // Clean non-digits except +
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
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
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.studentName || data.studentName.trim().length < 2) {
    errors.studentName = 'Full student name is required (min 2 characters).';
  }

  if (!validatePhone(data.phone)) {
    errors.phone = 'Valid phone number required (at least 10 digits).';
  }

  if (!validatePhone(data.whatsapp)) {
    errors.whatsapp = 'Valid WhatsApp number required (at least 10 digits).';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Valid academic or personal email address is required.';
  }

  if (!data.institutionName || data.institutionName.trim().length < 3) {
    errors.institutionName = 'School or College name is required.';
  }

  if (!data.department || data.department.trim().length < 2) {
    errors.department = 'Department / Stream is required.';
  }

  if (!data.yearOfStudy) {
    errors.yearOfStudy = 'Please select your current year or grade of study.';
  }

  if (!data.district || data.district.trim().length < 2) {
    errors.district = 'District / City is required.';
  }

  if (!data.selectedProgram) {
    errors.selectedProgram = 'Please select a program of interest.';
  }

  if (!data.learningMode) {
    errors.learningMode = 'Please select your preferred learning mode.';
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
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Contact person name is required.';
  }

  if (!data.organization || data.organization.trim().length < 2) {
    errors.organization = 'Company or institution name is required.';
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

  if (!data.projectDescription || data.projectDescription.trim().length < 15) {
    errors.projectDescription = 'Please provide a project description (min 15 characters).';
  }

  if (!data.estimatedBudget) {
    errors.estimatedBudget = 'Please select an estimated budget range.';
  }

  if (!data.expectedTimeline) {
    errors.expectedTimeline = 'Please select an expected delivery timeline.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateContactForm(data: {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Your name is required.';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Valid email address is required.';
  }

  if (!data.category) {
    errors.category = 'Please select an inquiry category.';
  }

  if (!data.subject || data.subject.trim().length < 4) {
    errors.subject = 'Subject line is required (at least 4 characters).';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please provide a detailed message (min 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
