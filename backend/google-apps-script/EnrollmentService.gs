/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: EnrollmentService.gs
 * Description: Student cohort registration, validation, listing, and status workflows.
 * ============================================================================
 */

var EnrollmentService = {
  HEADERS: [
    'enrollmentId',
    'fullName',
    'email',
    'phone',
    'guardianPhone',
    'institution',
    'department',
    'yearOfStudy',
    'district',
    'programTitle',
    'programCode',
    'programDivision',
    'deliveryMode',
    'comments',
    'status',
    'submittedAt',
    'updatedAt',
    'adminNotes'
  ],

  /**
   * Submit student enrollment
   */
  submitEnrollment: function(data) {
    Validation.validateEnrollment(data);

    var enrollmentId = Database.generateSequentialId(Config.SHEETS.ENROLLMENTS, Config.ID_PREFIXES.ENROLLMENT);
    var nowIso = new Date().toISOString();

    var record = {
      enrollmentId: enrollmentId,
      fullName: String(data.fullName).trim(),
      email: String(data.email).trim().toLowerCase(),
      phone: String(data.phone || '').trim(),
      guardianPhone: String(data.guardianPhone || '').trim(),
      institution: String(data.institution || '').trim(),
      department: String(data.department || '').trim(),
      yearOfStudy: String(data.yearOfStudy || '').trim(),
      district: String(data.district || '').trim(),
      programTitle: String(data.programTitle).trim(),
      programCode: String(data.programCode || 'AEG-PRG').trim(),
      programDivision: String(data.programDivision || 'Higher Education').trim(),
      deliveryMode: String(data.deliveryMode || 'Hybrid').trim(),
      comments: String(data.comments || '').trim(),
      status: 'Submitted',
      submittedAt: nowIso,
      updatedAt: nowIso,
      adminNotes: ''
    };

    Database.appendRecord(Config.SHEETS.ENROLLMENTS, this.HEADERS, record);

    Database.logActivity('ENROLLMENT_SUBMITTED', 'Enrollment for ' + record.programTitle, {
      enrollmentId: enrollmentId,
      fullName: record.fullName,
      program: record.programTitle
    });

    // Send email notification (failures do not rollback the database write)
    try {
      EmailService.sendEnrollmentConfirmation(record);
      EmailService.sendTeamAlertEmail('New Student Enrollment: ' + record.programTitle, record);
    } catch (e) {
      Logger.log('Enrollment email note: ' + e.toString());
    }

    return {
      enrollmentId: enrollmentId,
      fullName: record.fullName,
      programTitle: record.programTitle,
      status: record.status,
      submittedAt: record.submittedAt
    };
  },

  /**
   * List all enrollments (Protected admin view)
   */
  listEnrollments: function() {
    return Database.getAllRecords(Config.SHEETS.ENROLLMENTS, this.HEADERS);
  },

  /**
   * Update enrollment status and admin notes
   */
  updateEnrollmentStatus: function(enrollmentId, newStatus, adminNotes, userEmail) {
    var record = Database.getRecordById(Config.SHEETS.ENROLLMENTS, this.HEADERS, 'enrollmentId', enrollmentId);
    if (!record) {
      throw new Error('Enrollment record not found: ' + enrollmentId);
    }

    var updates = {
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }

    Database.updateRecord(Config.SHEETS.ENROLLMENTS, this.HEADERS, 'enrollmentId', enrollmentId, updates);

    Database.logActivity('ENROLLMENT_STATUS_UPDATED', 'Status changed to ' + newStatus + ' for ' + enrollmentId, {
      enrollmentId: enrollmentId,
      newStatus: newStatus
    }, userEmail);

    return { enrollmentId: enrollmentId, status: newStatus };
  }
};
