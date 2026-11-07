/**
 * AEGIS ACADEMY - DATABASE INITIALIZER (Google Apps Script)
 * Run this function once from the Apps Script editor to automatically initialize
 * all 10 required sheets with correct headers, styling, and initial configuration.
 */

function setupSpreadsheetDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || Config.getSpreadsheet();
  if (!ss) {
    throw new Error('Please open this script inside the target Google Sheet or configure SPREADSHEET_ID in Script Properties.');
  }

  var sheetsDef = [
    {
      name: Config.SHEETS.ENROLLMENTS,
      headers: EnrollmentService.HEADERS
    },
    {
      name: Config.SHEETS.CONTACT_MESSAGES,
      headers: ContactService.HEADERS
    },
    {
      name: Config.SHEETS.QUOTE_REQUESTS,
      headers: QuoteService.HEADERS
    },
    {
      name: Config.SHEETS.JOB_APPLICATIONS,
      headers: CareerService.HEADERS
    },
    {
      name: Config.SHEETS.PROGRAMS,
      headers: ContentService.PROGRAM_HEADERS
    },
    {
      name: Config.SHEETS.PROJECTS,
      headers: ContentService.PROJECT_HEADERS
    },
    {
      name: Config.SHEETS.EVENTS,
      headers: ContentService.EVENT_HEADERS
    },
    {
      name: Config.SHEETS.ADMIN_USERS,
      headers: AuthService.HEADERS
    },
    {
      name: Config.SHEETS.PLATFORM_SETTINGS,
      headers: ['key', 'value', 'description', 'updatedAt']
    },
    {
      name: Config.SHEETS.ACTIVITY_LOGS,
      headers: Database.ACTIVITY_HEADERS
    }
  ];

  sheetsDef.forEach(function(item) {
    var sheet = ss.getSheetByName(item.name);
    if (!sheet) {
      sheet = ss.insertSheet(item.name);
    }

    // Set headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(item.headers);
      var headerRange = sheet.getRange(1, 1, 1, item.headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0052CC');
      headerRange.setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
    }
  });

  // Seed initial Admin User if empty
  var adminSheet = ss.getSheetByName(Config.SHEETS.ADMIN_USERS);
  if (adminSheet.getLastRow() === 1) {
    var salt = Utilities.getUuid().substring(0, 16);
    var defaultPass = 'Aegis@Admin2026!';
    var passHash = AuthService.hashPassword(defaultPass, salt);
    adminSheet.appendRow([
      'ADM-2026-0001',
      'admin@aegisacademy.in',
      'Aegis Super Admin',
      passHash,
      salt,
      Config.ROLES.SUPER_ADMIN,
      true,
      new Date().toISOString(),
      ''
    ]);
  }

  // Seed default Platform Settings if empty
  var settingsSheet = ss.getSheetByName(Config.SHEETS.PLATFORM_SETTINGS);
  if (settingsSheet.getLastRow() === 1) {
    var defaultSettings = [
      ['ADMISSIONS_OPEN', 'true', 'Whether public enrollment forms accept new submissions', new Date().toISOString()],
      ['CAREERS_OPEN', 'true', 'Whether career portal accepts applications', new Date().toISOString()],
      ['ACADEMIC_YEAR', '2026-2027', 'Current academic intake year', new Date().toISOString()],
      ['NOTIFY_EMAIL', 'admissions@aegisacademy.in', 'Notification email address for admissions', new Date().toISOString()]
    ];
    defaultSettings.forEach(function(row) {
      settingsSheet.appendRow(row);
    });
  }

  Logger.log('Aegis Academy Database setup complete! All 10 sheets initialized successfully.');
  return 'Database setup complete! All 10 sheets initialized successfully.';
}
