/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: Database.gs
 * Description: Low-level Google Sheets operations, LockService concurrency
 * protection, sequential unique ID generation, formula sanitization & audit logging.
 * ============================================================================
 */

var Database = {
  ACTIVITY_HEADERS: ['logId', 'timestamp', 'eventType', 'description', 'userEmail', 'metadataJson'],

  getSpreadsheet: function() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) return ss;
    var id = Config.getSpreadsheetId();
    if (id) return SpreadsheetApp.openById(id);
    throw new Error('Spreadsheet not bound. Please configure SPREADSHEET_ID in Script Properties.');
  },

  getSheet: function(sheetName) {
    var ss = this.getSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error('Sheet "' + sheetName + '" not found in spreadsheet. Run setupSpreadsheetDatabase() once to initialize.');
    }
    return sheet;
  },

  /**
   * Thread-safe unique ID generator using LockService
   * Format: AEG-ENR-2026-0001
   */
  generateSequentialId: function(sheetName, prefix) {
    var lock = LockService.getScriptLock();
    var hasLock = lock.tryLock(10000);
    if (!hasLock) {
      throw new Error('Database is currently busy. Could not obtain write lock.');
    }

    try {
      var sheet = this.getSheet(sheetName);
      var lastRow = sheet.getLastRow();
      var year = new Date().getFullYear().toString();
      var sequence = 1;

      if (lastRow > 1) {
        // Scan ID column to find maximum sequence
        var idCol = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
        var targetPrefix = prefix + '-' + year + '-';
        for (var i = 0; i < idCol.length; i++) {
          var existingId = String(idCol[i][0] || '');
          if (existingId.indexOf(targetPrefix) === 0) {
            var parts = existingId.split('-');
            var num = parseInt(parts[parts.length - 1], 10);
            if (!isNaN(num) && num >= sequence) {
              sequence = num + 1;
            }
          }
        }
      }

      var paddedSequence = ('0000' + sequence).slice(-4);
      return prefix + '-' + year + '-' + paddedSequence;
    } finally {
      lock.releaseLock();
    }
  },

  /**
   * Append a single record with formula injection sanitization and LockService protection
   */
  appendRecord: function(sheetName, headers, record) {
    var lock = LockService.getScriptLock();
    var hasLock = lock.tryLock(10000);
    if (!hasLock) {
      throw new Error('Database is currently busy. Please retry.');
    }

    try {
      var sheet = this.getSheet(sheetName);
      var row = headers.map(function(h) {
        var val = record[h];
        if (val === undefined || val === null) return '';
        if (typeof val === 'object') return JSON.stringify(val);
        // Formula injection protection
        return Validation.sanitizeFormula(String(val));
      });
      sheet.appendRow(row);
      return record;
    } finally {
      lock.releaseLock();
    }
  },

  /**
   * Batch read all rows from sheet
   */
  getAllRecords: function(sheetName, headers, filterObj) {
    var sheet = this.getSheet(sheetName);
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) return [];

    var lastCol = headers.length;
    var values = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
    var records = values.map(function(row) {
      var obj = {};
      headers.forEach(function(h, idx) {
        obj[h] = row[idx];
      });
      return obj;
    });

    if (filterObj) {
      return records.filter(function(item) {
        for (var k in filterObj) {
          if (String(item[k]).toLowerCase() !== String(filterObj[k]).toLowerCase()) {
            return false;
          }
        }
        return true;
      });
    }

    return records;
  },

  getRecordById: function(sheetName, headers, idField, idValue) {
    var records = this.getAllRecords(sheetName, headers);
    for (var i = 0; i < records.length; i++) {
      if (String(records[i][idField]) === String(idValue)) {
        return records[i];
      }
    }
    return null;
  },

  /**
   * Update an existing record in-place by ID
   */
  updateRecord: function(sheetName, headers, idField, idValue, updates) {
    var lock = LockService.getScriptLock();
    var hasLock = lock.tryLock(10000);
    if (!hasLock) {
      throw new Error('Database is currently busy. Please retry.');
    }

    try {
      var sheet = this.getSheet(sheetName);
      var lastRow = sheet.getLastRow();
      if (lastRow <= 1) throw new Error('No records in sheet ' + sheetName);

      var idColIdx = headers.indexOf(idField);
      if (idColIdx === -1) throw new Error('ID field ' + idField + ' not in headers');

      var ids = sheet.getRange(2, idColIdx + 1, lastRow - 1, 1).getValues();
      var targetRow = -1;
      for (var r = 0; r < ids.length; r++) {
        if (String(ids[r][0]) === String(idValue)) {
          targetRow = r + 2;
          break;
        }
      }

      if (targetRow === -1) {
        throw new Error('Record not found with ' + idField + '=' + idValue);
      }

      for (var key in updates) {
        var colIdx = headers.indexOf(key);
        if (colIdx !== -1) {
          var val = updates[key];
          if (typeof val === 'object' && val !== null) val = JSON.stringify(val);
          sheet.getRange(targetRow, colIdx + 1).setValue(Validation.sanitizeFormula(String(val)));
        }
      }

      return true;
    } finally {
      lock.releaseLock();
    }
  },

  /**
   * Log administrative and transactional events
   */
  logActivity: function(eventType, description, metadata, userEmail) {
    try {
      var logId = 'LOG-' + Date.now();
      var logRecord = {
        logId: logId,
        timestamp: new Date().toISOString(),
        eventType: eventType,
        description: description,
        userEmail: userEmail || 'system',
        metadataJson: JSON.stringify(metadata || {})
      };
      this.appendRecord(Config.SHEETS.ACTIVITY_LOGS, this.ACTIVITY_HEADERS, logRecord);
    } catch (e) {
      Logger.log('Activity logging note: ' + e.toString());
    }
  }
};
