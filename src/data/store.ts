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

const INITIAL_ENROLLMENTS: EnrollmentSubmission[] = [];
const INITIAL_QUOTES: QuoteRequestSubmission[] = [];
const INITIAL_MESSAGES: ContactMessage[] = [];

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
