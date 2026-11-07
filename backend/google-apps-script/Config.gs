/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: Config.gs
 * Description: Central configuration, sheet names, ID prefixes, and enums
 * ============================================================================
 */

var CONFIG = {
  // Spreadsheet & Drive IDs are read from Script Properties for security
  // In Google Apps Script Editor: Project Settings -> Script Properties
  SPREADSHEET_ID: PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID') || '',
  DRIVE_RESUMES_FOLDER_ID: PropertiesService.getScriptProperties().getProperty('DRIVE_RESUMES_FOLDER_ID') || '',
  ADMIN_SECRET_KEY: PropertiesService.getScriptProperties().getProperty('ADMIN_SECRET_KEY') || 'Aegis@2026#SecureAdminKey!',
  EMAIL_SENDER_NAME: PropertiesService.getScriptProperties().getProperty('EMAIL_SENDER_NAME') || 'Aegis Academy Admissions & Team',
  ADMIN_NOTIFICATION_EMAIL: PropertiesService.getScriptProperties().getProperty('ADMIN_NOTIFICATION_EMAIL') || 'sakthisakthi7791@gmail.com',

  // Sheet Names matching Specification Phase Two
  SHEETS: {
    ENROLLMENTS: 'Enrollments',
    CONTACT_MESSAGES: 'Contact_Messages',
    QUOTE_REQUESTS: 'Quote_Requests',
    JOB_APPLICATIONS: 'Job_Applications',
    PROGRAMS: 'Programs',
    PROJECTS: 'Projects',
    EVENTS: 'Events',
    ADMIN_USERS: 'Admin_Users',
    ACTIVITY_LOGS: 'Activity_Logs',
    SETTINGS: 'Settings'
  },

  // Unique ID Prefixes (e.g. AEG-ENR-2026-0001)
  ID_PREFIXES: {
    ENROLLMENT: 'AEG-ENR',
    CONTACT: 'AEG-CNT',
    QUOTE: 'AEG-QUO',
    JOB: 'AEG-JOB',
    PROGRAM: 'AEG-PRG',
    PROJECT: 'AEG-PRJ',
    EVENT: 'AEG-EVT',
    LOG: 'AEG-LOG'
  },

  // Valid status transitions
  STATUSES: {
    ENROLLMENT: ['New', 'Contacted', 'Follow Up', 'Approved', 'Rejected', 'Enrolled', 'Cancelled'],
    CONTACT: ['Unread', 'Read', 'Replied', 'Archived'],
    QUOTE: ['New', 'Reviewing', 'Proposal Sent', 'Negotiation', 'Approved', 'Rejected', 'Completed'],
    JOB: ['Received', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected']
  }
};
