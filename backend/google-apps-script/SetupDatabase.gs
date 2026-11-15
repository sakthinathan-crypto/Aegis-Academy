/**
 * ============================================================================
 * AEGIS ACADEMY — DATABASE INITIALIZER & SCHEMA MIGRATION
 * File: SetupDatabase.gs
 * Description: Idempotent initialization of all 10 Google Sheets schemas.
 * Never deletes existing records. Avoids reusing signing keys as passwords.
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
    { name: Config.SHEETS.PROGRAMS, headers: CatalogContentService.PROGRAM_HEADERS },
    { name: Config.SHEETS.PROJECTS, headers: CatalogContentService.PROJECT_HEADERS },
    { name: Config.SHEETS.EVENTS, headers: CatalogContentService.EVENT_HEADERS },
    { name: Config.SHEETS.ADMIN_USERS, headers: AuthService.HEADERS },
    { name: Config.SHEETS.SETTINGS, headers: ['key', 'value', 'description', 'updatedAt'] },
    { name: Config.SHEETS.ACTIVITY_LOGS, headers: Database.ACTIVITY_HEADERS }
  ];

  schemas.forEach(function(item) {
    var sheet = ss.getSheetByName(item.name);
    if (!sheet) {
      sheet = ss.insertSheet(item.name);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(item.headers);
      var headerRange = sheet.getRange(1, 1, 1, item.headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0052CC');
      headerRange.setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
    }
  });

  // Seed initial Super Admin User ONLY if Admin_Users sheet has no existing users
  var adminSheet = ss.getSheetByName(Config.SHEETS.ADMIN_USERS);
  if (adminSheet.getLastRow() === 1) {
    // Validate that signing secret is properly configured before hashing
    Config.getAdminSecretKey();

    var props = PropertiesService.getScriptProperties();
    var initialPass = props.getProperty('INITIAL_ADMIN_PASSWORD') || '';
    var initialEmail = (props.getProperty('INITIAL_ADMIN_EMAIL') || 'admin@aegisacademy.in').trim().toLowerCase();

    if (!initialPass || initialPass.length < 12) {
      throw new Error(
        'Initial Admin seeding requires INITIAL_ADMIN_PASSWORD (>= 12 chars) in Script Properties. ' +
        'Set it temporarily, run setupSpreadsheetDatabase(), then delete INITIAL_ADMIN_PASSWORD from Script Properties.'
      );
    }

    var salt = AuthService.generateSalt();
    var passHash = AuthService.hashPassword(initialPass, salt);
    var nowIso = new Date().toISOString();

    adminSheet.appendRow([
      'ADM-2026-0001',
      initialEmail,
      'Aegis Super Admin',
      passHash,
      salt,
      Config.ROLES.SUPER_ADMIN,
      true,
      nowIso,
      ''
    ]);

    // Remove temporary bootstrap password property automatically after seeding
    props.deleteProperty('INITIAL_ADMIN_PASSWORD');
    Logger.log('Seeded initial Super Admin account for ' + initialEmail + ' and cleared INITIAL_ADMIN_PASSWORD property.');
  }

  // Seed default Settings if Settings sheet is empty
  var settingsSheet = ss.getSheetByName(Config.SHEETS.SETTINGS);
  if (settingsSheet.getLastRow() === 1) {
    var defaultSettings = [
      ['ADMISSIONS_OPEN', 'true', 'Accept new student enrollments', new Date().toISOString()],
      ['CAREERS_OPEN', 'true', 'Accept job & fellowship applications', new Date().toISOString()],
      ['ACADEMIC_YEAR', '2026-2027', 'Current active academic intake cohort', new Date().toISOString()],
      ['SYSTEM_VERSION', '2.2.0', 'Backend core platform version', new Date().toISOString()]
    ];
    defaultSettings.forEach(function(row) {
      settingsSheet.appendRow(row);
    });
  }

  Database.logActivity('DATABASE_SETUP', 'Spreadsheet schemas verified successfully');
  Logger.log('All 10 Aegis Academy database sheets verified and initialized successfully.');
  return 'All 10 Aegis Academy database sheets verified and initialized successfully.';
}
