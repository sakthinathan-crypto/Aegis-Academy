/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: Config.gs
 * Description: Production configuration, sheet schemas, RBAC roles,
 * security limits, allowed option lists, and workflow state transitions.
 * ============================================================================
 */

var Config = {
  // Read sensitive credentials and IDs strictly from Script Properties
  getSpreadsheetId: function() {
    return PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID') || '';
  },

  getResumesFolderId: function() {
    return PropertiesService.getScriptProperties().getProperty('DRIVE_RESUMES_FOLDER_ID') || '';
  },

  getAdminSecretKey: function() {
    var secret = PropertiesService.getScriptProperties().getProperty('ADMIN_SECRET_KEY');
    if (!secret || String(secret).trim().length < 32) {
      throw new Error('ADMIN_SECRET_KEY must be configured in Script Properties with at least 32 characters.');
    }
    return String(secret);
  },

  getNotificationEmail: function() {
    return PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL') || 'admissions@aegisacademy.in';
  },

  // Compatibility alias used by EmailService
  getAdminNotificationEmail: function() {
    return this.getNotificationEmail();
  },

  SECURITY: {
    TOKEN_ISSUER: 'aegis-academy-gas',
    TOKEN_TTL_MS: 6 * 60 * 60 * 1000, // 6 hours (matches max CacheService TTL for guaranteed revocation)
    MAX_TOKEN_LENGTH: 2048,
    MAX_JSON_BYTES: 64 * 1024, // 64 KB for standard JSON payloads
    MAX_RESUME_PAYLOAD_BYTES: 8 * 1024 * 1024, // 8 MB for application + base64 resume
    MAX_RESUME_FILE_BYTES: 5 * 1024 * 1024, // 5 MB decoded file limit
    MAX_BASE64_CHARS: 7340032, // ~7 MB base64 characters before decoding
    LOGIN_MAX_ATTEMPTS: 5,
    LOGIN_LOCKOUT_SECONDS: 900, // 15 minutes
    LOGIN_GLOBAL_BURST_MAX: 30,
    LOGIN_GLOBAL_BURST_SECONDS: 300,
    PUBLIC_RATE_LIMIT_MAX: 3, // Max 3 submissions per email+action per window
    PUBLIC_RATE_WINDOW_SECONDS: 600, // 10 minutes
    PUBLIC_EMAIL_HOURLY_MAX: 8, // Max 8 total form submissions per email per hour
    PUBLIC_GLOBAL_BURST_MAX: 45, // Global burst cap across public submits
    PUBLIC_GLOBAL_BURST_SECONDS: 300, // 5 minutes
    DUPLICATE_WINDOW_SECONDS: 600, // 10 minutes identical payload guard
    MIN_MAIL_QUOTA_RESERVE: 5
  },

  SHEETS: {
    ENROLLMENTS: 'Enrollments',
    CONTACT_MESSAGES: 'Contact_Messages',
    QUOTE_REQUESTS: 'Quote_Requests',
    JOB_APPLICATIONS: 'Job_Applications',
    PROGRAMS: 'Programs',
    PROJECTS: 'Projects',
    EVENTS: 'Events',
    ADMIN_USERS: 'Admin_Users',
    SETTINGS: 'Settings',
    ACTIVITY_LOGS: 'Activity_Logs'
  },

  ID_PREFIXES: {
    ENROLLMENT: 'AEG-ENR',
    CONTACT: 'AEG-CON',
    QUOTE: 'AEG-QUO',
    JOB_APP: 'AEG-JOB',
    PROGRAM: 'AEG-PRG',
    PROJECT: 'AEG-PRJ',
    EVENT: 'AEG-EVT'
  },

  ROLES: {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Admin',
    COORDINATOR: 'Coordinator',
    VIEWER: 'Viewer'
  },

  PERMISSIONS: {
    'Super Admin': ['all'],
    'Admin': ['view_dashboard', 'manage_enrollments', 'manage_contacts', 'manage_quotes', 'manage_careers', 'manage_content', 'view_logs'],
    'Coordinator': ['view_dashboard', 'manage_enrollments', 'manage_contacts'],
    'Viewer': ['view_dashboard']
  },

  STATUSES: {
    ENROLLMENT: ['Submitted', 'Pending', 'Under Review', 'Contacted', 'Approved', 'Enrolled', 'Archived'],
    CONTACT: ['New', 'Unread', 'In Review', 'Replied', 'Archived'],
    QUOTE: ['Submitted', 'New', 'Under Review', 'Reviewing', 'Proposal Sent', 'Quoted', 'Negotiation', 'Approved', 'Closed', 'Archived'],
    JOB: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Offer Extended', 'Hired', 'Archived']
  },

  ALLOWED_OPTIONS: {
    DELIVERY_MODES: ['Hybrid', 'In-Person', 'Virtual Live', 'Online', 'On-Campus'],
    INQUIRY_TYPES: [
      'Education & Training',
      'Technology Services',
      'Institutional Partnership',
      'Partnership',
      'Internship',
      'Career Opportunities',
      'General Enquiry',
      'General Inquiry'
    ],
    BUDGET_RANGES: [
      '$5,000 - $10,000',
      '$5,000 - $15,000',
      '$15,000 - $30,000',
      '$30,000 - $60,000',
      '$60,000+'
    ],
    TARGET_TIMELINES: [
      '1-2 Months',
      '2-3 Months',
      '4-6 Months',
      '8-12 Weeks',
      'Ongoing Retainer'
    ],
    EXPERIENCE_LEVELS: ['0', '0-1', '1-3', '3-5', '5+']
  },

  TERMINAL_STATUSES: ['Archived', 'Closed']
};
