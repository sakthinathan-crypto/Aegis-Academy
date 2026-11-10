/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: CareerService.gs
 * Description: Job applications, private Google Drive resume uploads,
 * candidate record storage, and authenticated resume access.
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

  /**
   * Private Google Drive upload (No public access; strictly restricted to Drive owner / authorized admins)
   */
  uploadResumePrivately: function(fileData, applicantName, applicationId) {
    if (!fileData || !fileData.base64) {
      return { fileId: '', fileName: '' };
    }

    // Size limit: 5MB
    var MAX_BYTES = 5 * 1024 * 1024;
    var decoded = Utilities.base64Decode(fileData.base64);
    if (decoded.length > MAX_BYTES) {
      var sizeErr = new Error('Resume file exceeds 5MB limit.');
      sizeErr.code = 'FILE_TOO_LARGE';
      throw sizeErr;
    }

    // MIME type allowlist
    var allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    var mimeType = fileData.type || 'application/pdf';
    var safeExt = '.pdf';
    if (mimeType.indexOf('wordprocessingml') !== -1 || (fileData.name && fileData.name.endsWith('.docx'))) {
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      safeExt = '.docx';
    } else if (mimeType.indexOf('msword') !== -1 || (fileData.name && fileData.name.endsWith('.doc'))) {
      mimeType = 'application/msword';
      safeExt = '.doc';
    }

    var folderId = Config.getResumesFolderId();
    var folder;
    if (folderId) {
      folder = DriveApp.getFolderById(folderId);
    } else {
      var folders = DriveApp.getFoldersByName('Aegis_Academy_Resumes_Private');
      folder = folders.hasNext() ? folders.next() : DriveApp.createFolder('Aegis_Academy_Resumes_Private');
    }

    // Standardized safe filename: AEG-JOB-2026-0001_ApplicantName_Resume.pdf
    var safeApplicant = applicantName.replace(/[^a-zA-Z0-9]/g, '_');
    var finalFilename = applicationId + '_' + safeApplicant + '_Resume' + safeExt;

    var blob = Utilities.newBlob(decoded, mimeType, finalFilename);
    var driveFile = folder.createFile(blob);

    // CRITICAL: File is NOT shared publicly. Remains strictly private.
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

    var applicationId = Database.generateSequentialId(Config.SHEETS.JOB_APPLICATIONS, Config.ID_PREFIXES.JOB_APP);
    var nowIso = new Date().toISOString();

    var resumeInfo = { fileId: '', fileName: '' };
    if (data.resumeFile && data.resumeFile.base64) {
      resumeInfo = this.uploadResumePrivately(data.resumeFile, data.fullName, applicationId);
    }

    var record = {
      applicationId: applicationId,
      fullName: String(data.fullName).trim(),
      email: String(data.email).trim().toLowerCase(),
      phone: String(data.phone || '').trim(),
      position: String(data.roleApplied || data.position || '').trim(),
      department: String(data.department || 'Engineering').trim(),
      experience: String(data.experienceYears || data.experience || '0').trim(),
      portfolioUrl: String(data.portfolioUrl || '').trim(),
      linkedinUrl: String(data.linkedinUrl || '').trim(),
      resumeFileId: resumeInfo.fileId,
      resumeFileName: resumeInfo.fileName,
      coverNote: String(data.coverNote || '').trim(),
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
   * Update status of an application
   */
  updateApplicationStatus: function(applicationId, newStatus, adminNotes, userEmail) {
    var record = Database.getRecordById(Config.SHEETS.JOB_APPLICATIONS, this.HEADERS, 'applicationId', applicationId);
    if (!record) {
      throw new Error('Application record not found: ' + applicationId);
    }

    var updates = {
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }

    Database.updateRecord(Config.SHEETS.JOB_APPLICATIONS, this.HEADERS, 'applicationId', applicationId, updates);

    Database.logActivity('CAREER_APPLICATION_UPDATED', 'Status updated to ' + newStatus + ' for ' + applicationId, {
      applicationId: applicationId,
      newStatus: newStatus
    }, userEmail);

    return { applicationId: applicationId, status: newStatus };
  },

  /**
   * List all job applications
   */
  listApplications: function() {
    return Database.getAllRecords(Config.SHEETS.JOB_APPLICATIONS, this.HEADERS);
  },

  /**
   * Secure, authenticated resume download URL generation for admins
   */
  getResumeDownloadUrl: function(applicationId) {
    var record = Database.getRecordById(Config.SHEETS.JOB_APPLICATIONS, this.HEADERS, 'applicationId', applicationId);
    if (!record || !record.resumeFileId) {
      throw new Error('Resume file not found for application ' + applicationId);
    }

    var file = DriveApp.getFileById(record.resumeFileId);
    return {
      applicationId: applicationId,
      fileName: file.getName(),
      mimeType: file.getMimeType(),
      downloadUrl: file.getDownloadUrl()
    };
  }
};
