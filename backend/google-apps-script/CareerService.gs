/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: CareerService.gs
 * Description: Job applications, strict resume validation (extension, MIME,
 * Base64 integrity, binary file signatures & ZIP/DOCX inspection), private
 * Google Drive storage, and authorized resume access.
 * ============================================================================
 */

var CareerService = {
  HEADERS: [
    'applicationId',
    'fullName',
    'email',
    'phone',
    'position',
    'department',
    'experience',
    'portfolioUrl',
    'linkedinUrl',
    'resumeFileId',
    'resumeFileName',
    'coverNote',
    'status',
    'submittedAt',
    'updatedAt',
    'adminNotes'
  ],

  ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx'],

  MIME_BY_EXTENSION: {
    '.pdf': ['application/pdf'],
    '.doc': ['application/msword', 'application/octet-stream'],
    '.docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream']
  },

  /**
   * Check binary magic signature of decoded bytes (GAS returns signed bytes -128..127)
   */
  matchesMagicBytes: function(bytes, signature) {
    if (!bytes || bytes.length < signature.length) return false;
    for (var i = 0; i < signature.length; i++) {
      if ((bytes[i] & 0xff) !== signature[i]) return false;
    }
    return true;
  },

  /**
   * Verify actual file binary signature (PDF / DOC / DOCX)
   */
  verifyResumeSignature: function(bytes, expectedExt, safeMime) {
    if (!bytes || bytes.length < 16) {
      throw Validation.createError('INVALID_FILE', 'Resume file appears empty or corrupted.');
    }

    // PDF: "%PDF-" (25 50 44 46 2D)
    if (expectedExt === '.pdf') {
      if (!this.matchesMagicBytes(bytes, [0x25, 0x50, 0x44, 0x46, 0x2D])) {
        throw Validation.createError('INVALID_FILE', 'File content does not match a valid PDF signature.');
      }
      return;
    }

    // DOC (OLE2 Compound Document): D0 CF 11 E0 A1 B1 1A E1
    if (expectedExt === '.doc') {
      if (!this.matchesMagicBytes(bytes, [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1])) {
        throw Validation.createError('INVALID_FILE', 'File content does not match a valid Microsoft Word (.doc) signature.');
      }
      return;
    }

    // DOCX (OpenXML ZIP archive): PK\x03\x04 + validate ZIP entries contain [Content_Types].xml & word/
    if (expectedExt === '.docx') {
      if (!this.matchesMagicBytes(bytes, [0x50, 0x4B, 0x03, 0x04])) {
        throw Validation.createError('INVALID_FILE', 'File content does not match a valid DOCX archive signature.');
      }
      try {
        var zipBlob = Utilities.newBlob(bytes, 'application/zip', 'check.docx');
        var entries = Utilities.unzip(zipBlob);
        var hasContentTypes = false;
        var hasWordFolder = false;
        for (var i = 0; i < entries.length; i++) {
          var entryName = entries[i].getName();
          if (entryName === '[Content_Types].xml') hasContentTypes = true;
          if (entryName.indexOf('word/') === 0) hasWordFolder = true;
        }
        if (!hasContentTypes || !hasWordFolder) {
          throw new Error('Missing required DOCX structure.');
        }
      } catch (zipErr) {
        throw Validation.createError('INVALID_FILE', 'Uploaded DOCX archive failed structural verification.');
      }
      return;
    }

    throw Validation.createError('INVALID_FILE', 'Unsupported resume file type.');
  },

  /**
   * Private Google Drive upload (No public access; strictly restricted to Drive owner / authorized admins)
   */
  uploadResumePrivately: function(fileData, applicantName, applicationId) {
    if (!fileData || typeof fileData !== 'object' || !fileData.base64) {
      return { fileId: '', fileName: '' };
    }

    if (typeof fileData.base64 !== 'string') {
      throw Validation.createError('INVALID_FILE', 'Invalid resume payload encoding.');
    }

    // Reject oversized Base64 payload BEFORE decoding to protect Apps Script memory/CPU
    var rawBase64 = fileData.base64.replace(/\s+/g, '');
    if (rawBase64.length === 0) {
      return { fileId: '', fileName: '' };
    }
    if (rawBase64.length > Config.SECURITY.MAX_BASE64_CHARS) {
      throw Validation.createError('FILE_TOO_LARGE', 'Encoded resume payload exceeds the 5MB limit.');
    }

    // Validate strict Base64 characters and padding
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(rawBase64) || rawBase64.length % 4 !== 0) {
      throw Validation.createError('INVALID_FILE', 'Malformed Base64 data in resume upload.');
    }

    // Extract and validate extension strictly (prevent path traversal or arbitrary file extensions)
    var originalName = Validation.sanitizeText(fileData.name || '', 150, false);
    // Strip path components if provided
    originalName = originalName.replace(/^.*[\\\/]/, '');
    var extMatch = originalName.toLowerCase().match(/(\.[a-z0-9]+)$/);
    var safeExt = extMatch ? extMatch[1] : '';
    if (this.ALLOWED_EXTENSIONS.indexOf(safeExt) === -1) {
      throw Validation.createError('INVALID_FILE', 'Invalid file extension. Only .pdf, .doc, and .docx files are accepted.');
    }

    // Validate declared MIME type strictly against allowed list for the extension
    var declaredMime = String(fileData.type || '').trim().toLowerCase();
    var allowedMimesForExt = this.MIME_BY_EXTENSION[safeExt];
    if (declaredMime && allowedMimesForExt.indexOf(declaredMime) === -1) {
      throw Validation.createError('INVALID_FILE', 'Declared MIME type does not match the uploaded resume extension.');
    }

    var canonicalMime =
      safeExt === '.pdf'
        ? 'application/pdf'
        : safeExt === '.doc'
          ? 'application/msword'
          : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    var decoded;
    try {
      decoded = Utilities.base64Decode(rawBase64);
    } catch (decodeErr) {
      throw Validation.createError('INVALID_FILE', 'Failed to decode Base64 resume payload.');
    }

    if (!decoded || decoded.length === 0) {
      throw Validation.createError('INVALID_FILE', 'Uploaded resume file is empty.');
    }
    if (decoded.length > Config.SECURITY.MAX_RESUME_FILE_BYTES) {
      throw Validation.createError('FILE_TOO_LARGE', 'Resume file exceeds 5MB limit.');
    }

    // Verify magic bytes / binary archive structure
    this.verifyResumeSignature(decoded, safeExt, canonicalMime);

    var folderId = Config.getResumesFolderId();
    var folder;
    if (folderId) {
      folder = DriveApp.getFolderById(folderId);
    } else {
      var folders = DriveApp.getFoldersByName('Aegis_Academy_Resumes_Private');
      folder = folders.hasNext() ? folders.next() : DriveApp.createFolder('Aegis_Academy_Resumes_Private');
    }

    // Ensure parent folder does not have public link sharing
    try {
      folder.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
    } catch (shareFolderErr) {}

    // Standardized safe filename (strip dots/slashes/control chars)
    var safeApplicant = String(applicantName || 'Candidate')
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .substring(0, 40) || 'Candidate';
    var finalFilename = applicationId + '_' + safeApplicant + '_Resume' + safeExt;

    var blob = Utilities.newBlob(decoded, canonicalMime, finalFilename);
    var driveFile = folder.createFile(blob);

    // Explicitly enforce private-only Drive permissions on the uploaded file
    try {
      driveFile.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
    } catch (shareFileErr) {}

    return {
      fileId: driveFile.getId(),
      fileName: finalFilename
    };
  },

  /**
   * Submit job application
   */
  submitApplication: function(data) {
    Validation.validateJobApplication(data);

    var cleanEmail = String(data.email).trim().toLowerCase();
    var roleApplied = Validation.sanitizeText(data.roleApplied || data.position || '', 120, false);

    Validation.enforcePublicAbuseProtection(
      'submitApplication',
      cleanEmail,
      roleApplied + '|' + Validation.sanitizeText(data.fullName, 100, false)
    );

    var applicationId = Database.generateSequentialId(Config.SHEETS.JOB_APPLICATIONS, Config.ID_PREFIXES.JOB_APP);
    var nowIso = new Date().toISOString();

    var resumeInfo = { fileId: '', fileName: '' };
    if (data.resumeFile && data.resumeFile.base64) {
      resumeInfo = this.uploadResumePrivately(data.resumeFile, data.fullName, applicationId);
    }

    var record = {
      applicationId: applicationId,
      fullName: Validation.sanitizeText(data.fullName, 100, false),
      email: cleanEmail,
      phone: Validation.sanitizeText(data.phone || '', 25, false),
      position: roleApplied,
      department: Validation.sanitizeText(data.department || 'Engineering', 100, false),
      experience: Validation.sanitizeText(data.experienceYears || data.experience || '0', 30, false),
      portfolioUrl: Validation.isValidSafeUrl(data.portfolioUrl) ? String(data.portfolioUrl).trim() : '',
      linkedinUrl: Validation.isValidSafeUrl(data.linkedinUrl) ? String(data.linkedinUrl).trim() : '',
      resumeFileId: resumeInfo.fileId,
      resumeFileName: resumeInfo.fileName,
      coverNote: Validation.sanitizeText(data.coverNote || '', 2500, true),
      status: 'Submitted',
      submittedAt: nowIso,
      updatedAt: nowIso,
      adminNotes: ''
    };

    Database.appendRecord(Config.SHEETS.JOB_APPLICATIONS, this.HEADERS, record);

    Database.logActivity('CAREER_APPLICATION_SUBMITTED', 'Candidate applied for ' + record.position, {
      applicationId: applicationId,
      position: record.position
    });

    try {
      EmailService.sendApplicationReceiptEmail(record);
      EmailService.sendTeamAlertEmail('New Job Application: ' + record.position, record);
    } catch (e) {
      Logger.log('Career email note: ' + e.toString());
    }

    return {
      applicationId: applicationId,
      position: record.position,
      status: record.status,
      submittedAt: record.submittedAt
    };
  },

  /**
   * Update status of an application with transition validation
   */
  updateApplicationStatus: function(applicationId, newStatus, adminNotes, userEmail, userRole) {
    var record = Database.getRecordById(Config.SHEETS.JOB_APPLICATIONS, this.HEADERS, 'applicationId', applicationId);
    if (!record) {
      throw Validation.createError('NOT_FOUND', 'Application record not found.');
    }

    Validation.validateStatusUpdate(
      applicationId,
      Config.ID_PREFIXES.JOB_APP,
      record.status,
      newStatus,
      Config.STATUSES.JOB,
      adminNotes,
      userRole
    );

    var updates = {
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    if (adminNotes !== undefined) {
      updates.adminNotes = Validation.sanitizeText(adminNotes, 1000, true);
    }

    Database.updateRecord(Config.SHEETS.JOB_APPLICATIONS, this.HEADERS, 'applicationId', applicationId, updates);

    Database.logActivity('CAREER_APPLICATION_UPDATED', 'Status updated for ' + applicationId, {
      applicationId: applicationId,
      previousStatus: record.status,
      newStatus: newStatus
    }, userEmail);

    return { applicationId: applicationId, status: newStatus };
  },

  /**
   * List all job applications (Protected admin view)
   */
  listApplications: function() {
    var rows = Database.getAllRecords(Config.SHEETS.JOB_APPLICATIONS, this.HEADERS);
    // Provide clean normalized aliases expected by frontend AdminDashboard while preserving DB schema
    return rows.map(function(r) {
      return {
        applicationId: r.applicationId,
        fullName: r.fullName,
        email: r.email,
        phone: r.phone,
        roleApplied: r.position,
        position: r.position,
        department: r.department,
        experienceYears: r.experience,
        experience: r.experience,
        portfolioUrl: r.portfolioUrl,
        linkedinUrl: r.linkedinUrl,
        resumeDriveFileId: r.resumeFileId,
        resumeFileName: r.resumeFileName,
        coverNote: r.coverNote,
        status: r.status,
        submittedAt: r.submittedAt,
        updatedAt: r.updatedAt,
        adminNotes: r.adminNotes
      };
    });
  },

  /**
   * Secure, authenticated resume download URL generation for authorized admins
   */
  getResumeDownloadUrl: function(applicationId, userEmail, userRole) {
    if (!AuthService.roleHasPermission(userRole, 'manage_careers')) {
      throw Validation.createError('FORBIDDEN', 'Insufficient privileges to access candidate resumes.');
    }
    if (!Validation.isValidRecordId(applicationId, Config.ID_PREFIXES.JOB_APP)) {
      throw Validation.createError('VALIDATION_ERROR', 'Invalid applicationId parameter.');
    }

    var record = Database.getRecordById(Config.SHEETS.JOB_APPLICATIONS, this.HEADERS, 'applicationId', applicationId);
    if (!record || !record.resumeFileId) {
      throw Validation.createError('NOT_FOUND', 'Resume file not found for specified application.');
    }

    var file = DriveApp.getFileById(record.resumeFileId);
    if (file.isTrashed()) {
      throw Validation.createError('NOT_FOUND', 'Resume file is no longer available.');
    }

    // Re-assert private access before returning download URL
    try {
      file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
    } catch (err) {}

    Database.logActivity('RESUME_DOWNLOAD_ACCESSED', 'Authorized admin accessed private resume for ' + applicationId, {
      applicationId: applicationId,
      fileName: file.getName()
    }, userEmail);

    return {
      applicationId: applicationId,
      fileName: file.getName(),
      mimeType: file.getMimeType(),
      downloadUrl: file.getDownloadUrl()
    };
  }
};
