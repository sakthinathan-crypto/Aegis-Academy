/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: Config.gs
 * Description: Production configuration, sheet schemas, roles & prefixes.
 * ============================================================================
 */

var Config = {
  // Read sensitive credentials and IDs from Script Properties
  getSpreadsheetId: function() {
    return PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID') || '';
  },

  getResumesFolderId: function() {
    return PropertiesService.getScriptProperties().getProperty('DRIVE_RESUMES_FOLDER_ID') || '';
  },

  getAdminSecretKey: function() {
    var secret = PropertiesService.getScriptProperties().getProperty('ADMIN_SECRET_KEY');
    if (!secret) {
      throw new Error('ADMIN_SECRET_KEY is not configured in Script Properties.');
    }
    return secret;
  },

  getNotificationEmail: function() {
    return PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL') || 'admissions@aegisacademy.in';
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
    ENROLLMENT: ['Submitted', 'Under Review', 'Contacted', 'Approved', 'Enrolled', 'Archived'],
    CONTACT: ['New', 'In Review', 'Replied', 'Archived'],
    QUOTE: ['Submitted', 'Under Review', 'Proposal Sent', 'Negotiation', 'Approved', 'Archived'],
    JOB: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Offer Extended', 'Archived']
  }
};
