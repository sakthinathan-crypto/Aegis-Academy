/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: Database.gs
 * Description: Low-level Google Sheets operations, LockService concurrency
 * protection, sequential unique ID generation, and audit logging.
 * ============================================================================
 */

function getSpreadsheet() {
  var id = CONFIG.SPREADSHEET_ID;
  if (!id) {
    // If not in Script Properties, try active spreadsheet if bound
    try {
      return SpreadsheetApp.getActiveSpreadsheet();
    } catch (e) {
      throw new Error('SPREADSHEET_ID property is missing. Please set it in Apps Script Project Settings -> Script Properties.');
    }
  }
  return SpreadsheetApp.openById(id);
}

function getSheet(sheetName) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('Sheet "' + sheetName + '" not found in spreadsheet. Run setupSpreadsheetDatabase() once to initialize.');
  }
  return sheet;
}

/**
 * Thread-safe unique ID generator using LockService
 * Format: AEG-ENR-2026-0001
 */
function generateSequentialId(sheetName, prefix) {
  var lock = LockService.getScriptLock();
  var success = lock.tryLock(10000); // Wait up to 10 seconds for lock
  if (!success) {
    throw new Error('Could not obtain database lock to generate unique ID. Please retry.');
  }

  try {
    var sheet = getSheet(sheetName);
    var lastRow = sheet.getLastRow();
    var year = new Date().getFullYear().toString();
    var sequence = 1;

    if (lastRow > 1) {
      // Read first column (IDs)
      var idCol = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      for (var i = idCol.length - 1; i >= 0; i--) {
        var existingId = String(idCol[i][0] || '');
        if (existingId.indexOf(prefix + '-' + year + '-') === 0) {
          var parts = existingId.split('-');
          var num = parseInt(parts[parts.length - 1], 10);
          if (!isNaN(num) && num >= sequence) {
            sequence = num + 1;
            break;
          }
        }
      }
    }

    var paddedSequence = ('0000' + sequence).slice(-4);
    return prefix + '-' + year + '-' + paddedSequence;
  } finally {
    lock.releaseLock();
  }
}

/**
 * Reads all rows from a sheet as an array of objects mapped by header names
 */
function readAllRows(sheetName) {
  var sheet = getSheet(sheetName);
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow <= 1 || lastCol === 0) {
    return [];
  }

  var data = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  var headers = data[0];
  var rows = [];

  for (var i = 1; i < data.length; i++) {
    var rowObj = {};
    var hasContent = false;
    for (var j = 0; j < headers.length; j++) {
      var headerKey = String(headers[j]).trim();
      var cellVal = data[i][j];
      if (cellVal instanceof Date) {
        cellVal = cellVal.toISOString();
      }
      rowObj[headerKey] = cellVal;
      if (cellVal !== '' && cellVal !== null && cellVal !== undefined) {
        hasContent = true;
      }
    }
    if (hasContent) {
      rows.push(rowObj);
    }
  }

  return rows;
}

/**
 * Appends an object as a new row in the target sheet based on header mapping
 */
function appendRowRecord(sheetName, recordObj) {
  var lock = LockService.getScriptLock();
  var success = lock.tryLock(10000);
  if (!success) {
    throw new Error('Database is busy, please retry in a moment.');
  }

  try {
    var sheet = getSheet(sheetName);
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var rowValues = [];

    for (var i = 0; i < headers.length; i++) {
      var key = String(headers[i]).trim();
      var val = recordObj[key];
      if (val === undefined || val === null) {
        val = '';
      }
      rowValues.push(val);
    }

    sheet.appendRow(rowValues);
    return recordObj;
  } finally {
    lock.releaseLock();
  }
}

/**
 * Updates a row by primary key column
 */
function updateRowRecord(sheetName, idColumnName, idValue, updatesObj) {
  var lock = LockService.getScriptLock();
  var success = lock.tryLock(10000);
  if (!success) {
    throw new Error('Database is busy, please retry.');
  }

  try {
    var sheet = getSheet(sheetName);
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if (lastRow <= 1) return null;

    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var idColIdx = -1;
    for (var h = 0; h < headers.length; h++) {
      if (String(headers[h]).trim() === idColumnName) {
        idColIdx = h;
        break;
      }
    }
    if (idColIdx === -1) {
      throw new Error('Column ' + idColumnName + ' not found in sheet ' + sheetName);
    }

    var idRange = sheet.getRange(2, idColIdx + 1, lastRow - 1, 1).getValues();
    var targetRowIdx = -1;
    for (var r = 0; r < idRange.length; r++) {
      if (String(idRange[r][0]).trim() === String(idValue).trim()) {
        targetRowIdx = r + 2; // 1-indexed including header
        break;
      }
    }

    if (targetRowIdx === -1) {
      throw new Error('Record with ' + idColumnName + '="' + idValue + '" not found.');
    }

    // Update row
    updatesObj.updated_at = new Date().toISOString();
    for (var col = 0; col < headers.length; col++) {
      var key = String(headers[col]).trim();
      if (updatesObj[key] !== undefined) {
        sheet.getRange(targetRowIdx, col + 1).setValue(updatesObj[key]);
      }
    }

    return { success: true, updated_id: idValue };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Deletes a row by primary key column
 */
function deleteRowRecord(sheetName, idColumnName, idValue) {
  var lock = LockService.getScriptLock();
  var success = lock.tryLock(10000);
  if (!success) {
    throw new Error('Database is busy, please retry.');
  }

  try {
    var sheet = getSheet(sheetName);
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) return false;

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var idColIdx = -1;
    for (var h = 0; h < headers.length; h++) {
      if (String(headers[h]).trim() === idColumnName) {
        idColIdx = h;
        break;
      }
    }
    if (idColIdx === -1) throw new Error('ID column not found.');

    var idRange = sheet.getRange(2, idColIdx + 1, lastRow - 1, 1).getValues();
    for (var r = 0; r < idRange.length; r++) {
      if (String(idRange[r][0]).trim() === String(idValue).trim()) {
        sheet.deleteRow(r + 2);
        return true;
      }
    }
    return false;
  } finally {
    lock.releaseLock();
  }
}

/**
 * Records activity in the Activity_Logs sheet
 */
function logActivity(adminEmail, action, moduleName, recordId, description) {
  try {
    var logId = 'AEG-LOG-' + new Date().getTime();
    var logRecord = {
      log_id: logId,
      timestamp: new Date().toISOString(),
      admin_email: adminEmail || 'system',
      action: action || 'UNKNOWN',
      module: moduleName || 'GENERAL',
      record_id: recordId || '',
      description: description || ''
    };
    appendRowRecord(CONFIG.SHEETS.ACTIVITY_LOGS, logRecord);
  } catch (err) {
    console.warn('Logging failed (non-critical):', err);
  }
}
