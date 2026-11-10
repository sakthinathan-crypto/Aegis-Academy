/**
 * ============================================================================
 * AEGIS ACADEMY — DATABASE INITIALIZER & SCHEMA MIGRATION
 * File: SetupDatabase.gs
 * Description: Idempotent initialization of all 10 Google Sheets schemas.
 * Never deletes existing records.
 * ============================================================================
 */

function setupSpreadsheetDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || Database.getSpreadsheet();
  if (!ss) {
    throw new Error('Please open this script inside the target Google Sheet or configure SPREADSHEET_ID in Script Properties.');
  }

  var schemas = [
    { name: Config.SHEETS.ENROLLMENTS, headers: EnrollmentService.HEADERS },
    { name: Config.SHEETS.CONTACT_MESSAGES, headers: ContactService.HEADERS },
    { name: Config.SHEETS.QUOTE_REQUESTS, headers: QuoteService.HEADERS },
    { name: Config.SHEETS.JOB_APPLICATIONS, headers: CareerService.HEADERS },
    { name: Config.SHEETS.PROGRAMS, headers: ContentService.PROGRAM_HEADERS },
    { name: Config.SHEETS.PROJECTS, headers: ContentService.PROJECT_HEADERS },
    { name: Config.SHEETS.EVENTS, headers: ContentService.EVENT_HEADERS },
    { name: Config.SHEETS.ADMIN_USERS, headers: AuthService.HEADERS },
    { name: Config.SHEETS.SETTINGS, headers: ['key', 'value', 'description', 'updatedAt'] },
    { name: Config.SHEETS.ACTIVITY_LOGS, headers: Database.ACTIVITY_HEADERS }
  ];

  schemas.forEach(function(item) {
    var sheet = ss.getSheetByName(item.name);
    if (!sheet) {
      sheet = ss.insertSheet(item.name);
    }

    // Set headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(item.headers);
      var headerRange = sheet.getRange(1, 1, 1, item.headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0052CC');
      headerRange.setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
    }
  });

  // Seed initial Admin User if Admin_Users sheet is empty
  var adminSheet = ss.getSheetByName(Config.SHEETS.ADMIN_USERS);
  if (adminSheet.getLastRow() === 1) {
    var salt = AuthService.generateSalt();
    // Use master secret to derive the initial setup hash
    var initialPass = Config.getAdminSecretKey();
    var passHash = AuthService.hashPassword(initialPass, salt);
    var nowIso = new Date().toISOString();

    adminSheet.appendRow([
      'ADM-2026-0001',
      'admin@aegisacademy.in',
      'Aegis Super Admin',
      passHash,
      salt,
      Config.ROLES.SUPER_ADMIN,
      true,
      nowIso,
      ''
    ]);
    Logger.log('Seeded initial Super Admin account for admin@aegisacademy.in using configured ADMIN_SECRET_KEY.');
  }

  // Seed default Settings if Settings sheet is empty
  var settingsSheet = ss.getSheetByName(Config.SHEETS.SETTINGS);
  if (settingsSheet.getLastRow() === 1) {
    var defaultSettings = [
      ['ADMISSIONS_OPEN', 'true', 'Accept new student enrollments', new Date().toISOString()],
      ['CAREERS_OPEN', 'true', 'Accept job & fellowship applications', new Date().toISOString()],
      ['ACADEMIC_YEAR', '2026-2027', 'Current active academic intake cohort', new Date().toISOString()],
      ['SYSTEM_VERSION', '2.1.0', 'Backend core platform version', new Date().toISOString()]
    ];
    defaultSettings.forEach(function(row) {
      settingsSheet.appendRow(row);
    });
  }

  Database.logActivity('DATABASE_SETUP', 'Spreadsheet schemas initialized successfully');
  Logger.log('All 10 Aegis Academy database sheets verified and initialized successfully.');
  return 'All 10 Aegis Academy database sheets verified and initialized successfully.';
}
