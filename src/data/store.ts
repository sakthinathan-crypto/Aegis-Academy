import {
  EnrollmentSubmission,
  QuoteRequestSubmission,
  ContactMessage,
  JobPosting,
  EventItem,
  Program,
  Project
} from '../types';
import { PROGRAMS, PROJECTS, EVENTS, CAREER_OPENINGS } from './companyData';

const STORAGE_KEYS = {
  ENROLLMENTS: 'aegis_enrollments_v1',
  QUOTES: 'aegis_quote_requests_v1',
  MESSAGES: 'aegis_contact_messages_v1',
  JOB_APPLICATIONS: 'aegis_job_apps_v1',
  ADMIN_SETTINGS: 'aegis_admin_settings_v1',
  CUSTOM_PROGRAMS: 'aegis_custom_programs_v1',
  CUSTOM_EVENTS: 'aegis_custom_events_v1'
};

const INITIAL_ENROLLMENTS: EnrollmentSubmission[] = [
  {
    id: 'AEGIS-2026-STU8492',
    studentName: 'Priya Narayanan',
    phone: '+91 98450 12345',
    whatsapp: '+91 98450 12345',
    email: 'priya.n@rvce.edu.sample',
    institutionName: 'R.V. College of Engineering',
    department: 'Computer Science and Engineering',
    yearOfStudy: '3rd Year Undergraduate',
    district: 'Bengaluru Urban',
    selectedProgram: 'full-stack-web-development',
    learningMode: 'Hybrid',
    additionalInfo: 'Interested in frontend specialization and placement prep.',
    submittedAt: '2026-11-04T10:30:00Z',
    status: 'Contacted'
  },
  {
    id: 'AEGIS-2026-STU5921',
    studentName: 'Harish Kalyan',
    phone: '+91 97890 54321',
    whatsapp: '+91 97890 54321',
    email: 'harish.kalyan@mit.sample.in',
    institutionName: 'Manipal Institute of Technology',
    department: 'Artificial Intelligence & Data Science',
    yearOfStudy: '4th Year Undergraduate',
    district: 'Udupi',
    selectedProgram: 'generative-ai',
    learningMode: 'Virtual Live',
    additionalInfo: 'Looking to build RAG capstone for final semester project.',
    submittedAt: '2026-11-03T16:15:00Z',
    status: 'Enrolled'
  },
  {
    id: 'AEGIS-2026-STU3184',
    studentName: 'Ananya Deshmukh',
    phone: '+91 98230 45678',
    whatsapp: '+91 98230 45678',
    email: 'ananya.d@coep.ac.sample',
    institutionName: 'College of Engineering, Pune',
    department: 'Information Technology',
    yearOfStudy: '2nd Year Undergraduate',
    district: 'Pune',
    selectedProgram: 'cybersecurity',
    learningMode: 'In-Person',
    additionalInfo: 'Enthusiastic about penetration testing & CTF competitions.',
    submittedAt: '2026-11-05T08:45:00Z',
    status: 'Pending'
  }
];

const INITIAL_QUOTES: QuoteRequestSubmission[] = [
  {
    id: 'AEGIS-2026-QTE1048',
    name: 'Suresh Kumar Menon',
    organization: 'Apex Logistics & Cold Chain Solutions',
    email: 'suresh.menon@apexlogistics.sample.in',
    phone: '+91 94470 12890',
    serviceRequired: 'Web Application Development',
    projectDescription: 'We require a centralized fleet dispatch and cold-storage sensor telemetry portal with real-time exception alerting.',
    estimatedBudget: '$15,000 - $30,000',
    expectedTimeline: '2-3 Months',
    additionalRequirements: 'Must integrate with existing GPS hardware APIs.',
    submittedAt: '2026-11-04T14:20:00Z',
    status: 'Reviewing'
  },
  {
    id: 'AEGIS-2026-QTE8923',
    name: 'Dr. Vasudevan Iyer',
    organization: 'Vidya Jyothi Group of Institutions',
    email: 'principal@vidyajyothi.sample.org',
    phone: '+91 98400 98765',
    serviceRequired: 'Digital Presence & Brand Strategy',
    projectDescription: 'Complete digital portal revamp and autonomous student admission inquiry bot for our 3 engineering campuses.',
    estimatedBudget: '$8,000 - $15,000',
    expectedTimeline: '1-2 Months',
    additionalRequirements: 'Requires bilingual language support.',
    submittedAt: '2026-11-02T11:00:00Z',
    status: 'Quoted'
  }
];

const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'AEGIS-2026-MSG4021',
    name: 'Rajeshwari Sen',
    email: 'rajeshwari.sen@deloitte.sample.com',
    phone: '+91 98310 65432',
    category: 'Education Inquiry',
    subject: 'Corporate Bootcamp for 2027 Graduate Trainee Batch',
    message: 'We are seeking a 4-week custom hands-on full-stack training module for our incoming batch of 60 software analyst campus recruits.',
    submittedAt: '2026-11-05T06:10:00Z',
    status: 'Unread'
  },
  {
    id: 'AEGIS-2026-MSG3118',
    name: 'Karan Malhotra',
    email: 'karan@malhotracapital.sample.in',
    phone: '+91 99100 88219',
    category: 'Partnership',
    subject: 'Exploring Strategic Incubation Collaboration',
    message: 'Interested in understanding Aegis Academy incubation programs and potential sponsorship for HackAegis 2026.',
    submittedAt: '2026-11-03T09:40:00Z',
    status: 'Replied'
  }
];

function getSafeItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Failed reading storage key: ${key}`, err);
    return defaultValue;
  }
}

function setSafeItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed saving storage key: ${key}`, err);
  }
}

export const StorageStore = {
  // Enrollments
  getEnrollments(): EnrollmentSubmission[] {
    return getSafeItem<EnrollmentSubmission[]>(STORAGE_KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
  },
  saveEnrollment(submission: EnrollmentSubmission): void {
    const list = this.getEnrollments();
    const updated = [submission, ...list];
    setSafeItem(STORAGE_KEYS.ENROLLMENTS, updated);
  },
  updateEnrollmentStatus(id: string, status: EnrollmentSubmission['status']): void {
    const list = this.getEnrollments();
    const updated = list.map(item => item.id === id ? { ...item, status } : item);
    setSafeItem(STORAGE_KEYS.ENROLLMENTS, updated);
  },
  deleteEnrollment(id: string): void {
    const list = this.getEnrollments().filter(item => item.id !== id);
    setSafeItem(STORAGE_KEYS.ENROLLMENTS, updatedList(list));
  },

  // Quotes
  getQuoteRequests(): QuoteRequestSubmission[] {
    return getSafeItem<QuoteRequestSubmission[]>(STORAGE_KEYS.QUOTES, INITIAL_QUOTES);
  },
  saveQuoteRequest(submission: QuoteRequestSubmission): void {
    const list = this.getQuoteRequests();
    const updated = [submission, ...list];
    setSafeItem(STORAGE_KEYS.QUOTES, updated);
  },
  updateQuoteStatus(id: string, status: QuoteRequestSubmission['status']): void {
    const list = this.getQuoteRequests();
    const updated = list.map(item => item.id === id ? { ...item, status } : item);
    setSafeItem(STORAGE_KEYS.QUOTES, updated);
  },
  deleteQuote(id: string): void {
    const list = this.getQuoteRequests().filter(item => item.id !== id);
    setSafeItem(STORAGE_KEYS.QUOTES, list);
  },

  // Messages
  getContactMessages(): ContactMessage[] {
    return getSafeItem<ContactMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
  },
  saveContactMessage(msg: ContactMessage): void {
    const list = this.getContactMessages();
    const updated = [msg, ...list];
    setSafeItem(STORAGE_KEYS.MESSAGES, updated);
  },
  updateMessageStatus(id: string, status: ContactMessage['status']): void {
    const list = this.getContactMessages();
    const updated = list.map(item => item.id === id ? { ...item, status } : item);
    setSafeItem(STORAGE_KEYS.MESSAGES, updated);
  },
  deleteMessage(id: string): void {
    const list = this.getContactMessages().filter(item => item.id !== id);
    setSafeItem(STORAGE_KEYS.MESSAGES, list);
  },

  // Reset to default sample
  resetToInitial(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.ENROLLMENTS);
    localStorage.removeItem(STORAGE_KEYS.QUOTES);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  }
};

function updatedList<T>(list: T[]): T[] {
  return list;
}
