/**
 * AEGIS ACADEMY - CAREER SERVICE (Google Apps Script)
 * Manages job applications, applicant resume uploads to Google Drive,
 * record creation in the Job_Applications sheet, and notification triggers.
 */

var CareerService = (function() {
  var HEADERS = [
    'applicationId',
    'fullName',
    'email',
    'phone',
    'roleApplied',
    'department',
    'experienceYears',
    'portfolioUrl',
    'linkedinUrl',
    'resumeDriveFileId',
    'resumeDriveUrl',
    'resumeFileName',
    'coverNote',
    'status',
    'submittedAt',
    'updatedAt',
    'adminNotes'
  ];

  /**
   * Upload resume binary base64 to Google Drive folder
   * @param {Object} fileData { name, type, base64 }
   * @param {string} applicantName
   * @param {string} applicationId
   * @return {Object} { fileId, fileUrl, fileName }
   */
  function uploadResumeToDrive(fileData, applicantName, applicationId) {
    if (!fileData || !fileData.base64) {
      return { fileId: '', fileUrl: '', fileName: '' };
    }

    try {
      var folderId = Config.getDriveResumesFolderId();
      var folder;
      if (folderId) {
        folder = DriveApp.getFolderById(folderId);
      } else {
        // Fallback: create or retrieve folder named "Aegis_Academy_Resumes" in root
        var folders = DriveApp.getFoldersByName('Aegis_Academy_Resumes');
        if (folders.hasNext()) {
          folder = folders.next();
        } else {
          folder = DriveApp.createFolder('Aegis_Academy_Resumes');
        }
      }

      var decoded = Utilities.base64Decode(fileData.base64);
      var safeName = (fileData.name || 'Resume.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
      var standardizedName = applicationId + '_' + applicantName.replace(/[^a-zA-Z0-9]/g, '_') + '_' + safeName;
      var contentType = fileData.type || 'application/pdf';

      var blob = Utilities.newBlob(decoded, contentType, standardizedName);
      var driveFile = folder.createFile(blob);
      
      // Make viewable via link for admin review
      driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

      return {
        fileId: driveFile.getId(),
        fileUrl: driveFile.getUrl(),
        fileName: standardizedName
      };
    } catch (err) {
      Logger.log('Error uploading resume to Drive: ' + err.toString());
      return {
        fileId: '',
        fileUrl: '',
        fileName: fileData.name || 'Upload_Failed',
        error: err.toString()
      };
    }
  }

  /**
   * Submit new career application
   * @param {Object} payload
   * @return {Object} { success, applicationId, data }
   */
  function submitApplication(payload) {
    if (!payload.fullName || !payload.email || !payload.roleApplied) {
      throw new Error('Full name, email, and role applied are required fields.');
    }

    // Generate unique ID
    var applicationId = Database.generateUniqueId(Config.SHEETS.JOB_APPLICATIONS, Config.ID_PREFIXES.JOB_APP);
    var nowIso = new Date().toISOString();

    // Handle resume upload
    var resumeInfo = { fileId: '', fileUrl: '', fileName: '' };
    if (payload.resumeFile) {
      resumeInfo = uploadResumeToDrive(payload.resumeFile, payload.fullName, applicationId);
    }

    var record = {
      applicationId: applicationId,
      fullName: String(payload.fullName).trim(),
      email: String(payload.email).trim().toLowerCase(),
      phone: String(payload.phone || '').trim(),
      roleApplied: String(payload.roleApplied).trim(),
      department: String(payload.department || 'Engineering').trim(),
      experienceYears: String(payload.experienceYears || '0'),
      portfolioUrl: String(payload.portfolioUrl || '').trim(),
      linkedinUrl: String(payload.linkedinUrl || '').trim(),
      resumeDriveFileId: resumeInfo.fileId,
      resumeDriveUrl: resumeInfo.fileUrl,
      resumeFileName: resumeInfo.fileName,
      coverNote: String(payload.coverNote || '').trim(),
      status: Config.APPLICATION_STATUS.SUBMITTED,
      submittedAt: nowIso,
      updatedAt: nowIso,
      adminNotes: ''
    };

    Database.appendRecord(Config.SHEETS.JOB_APPLICATIONS, HEADERS, record);

    // Record activity log
    Database.logActivity('CAREER_APPLICATION_SUBMITTED', 'Job application submitted for ' + record.roleApplied, {
      applicationId: applicationId,
      fullName: record.fullName,
      email: record.email,
      roleApplied: record.roleApplied
    });

    // Send email notifications
    try {
      EmailService.sendApplicationReceiptEmail(record);
      EmailService.sendTeamAlertEmail('New Job Application: ' + record.roleApplied, record);
    } catch (e) {
      Logger.log('Email delivery note: ' + e.toString());
    }

    return {
      success: true,
      applicationId: applicationId,
      data: record
    };
  }

  /**
   * Update status of an application
   */
  function updateApplicationStatus(applicationId, newStatus, adminNotes) {
    var record = Database.getRecordById(Config.SHEETS.JOB_APPLICATIONS, HEADERS, 'applicationId', applicationId);
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

    Database.updateRecord(Config.SHEETS.JOB_APPLICATIONS, HEADERS, 'applicationId', applicationId, updates);

    Database.logActivity('CAREER_APPLICATION_UPDATED', 'Status updated to ' + newStatus + ' for ' + applicationId, {
      applicationId: applicationId,
      newStatus: newStatus
    });

    return { success: true, applicationId: applicationId, status: newStatus };
  }

  /**
   * List all job applications
   */
  function listApplications(filters) {
    return Database.getAllRecords(Config.SHEETS.JOB_APPLICATIONS, HEADERS, filters);
  }

  return {
    HEADERS: HEADERS,
    submitApplication: submitApplication,
    updateApplicationStatus: updateApplicationStatus,
    listApplications: listApplications
  };
})();
