/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: EnrollmentService.gs
 * Description: Student cohort registration, validation, abuse protection,
 * listing, and role-validated status workflows.
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

    var cleanEmail = String(data.email).trim().toLowerCase();
    var programTitle = Validation.sanitizeText(data.programTitle, 150, false);

    Validation.enforcePublicAbuseProtection(
      'submitEnrollment',
      cleanEmail,
      programTitle + '|' + Validation.sanitizeText(data.fullName, 100, false)
    );

    var enrollmentId = Database.generateSequentialId(Config.SHEETS.ENROLLMENTS, Config.ID_PREFIXES.ENROLLMENT);
    var nowIso = new Date().toISOString();

    var record = {
      enrollmentId: enrollmentId,
      fullName: Validation.sanitizeText(data.fullName, 100, false),
      email: cleanEmail,
      phone: Validation.sanitizeText(data.phone || '', 25, false),
      guardianPhone: Validation.sanitizeText(data.guardianPhone || '', 25, false),
      institution: Validation.sanitizeText(data.institution || '', 200, false),
      department: Validation.sanitizeText(data.department || '', 120, false),
      yearOfStudy: Validation.sanitizeText(data.yearOfStudy || '', 80, false),
      district: Validation.sanitizeText(data.district || '', 80, false),
      programTitle: programTitle,
      programCode: Validation.sanitizeText(data.programCode || 'AEG-PRG', 40, false),
      programDivision: Validation.sanitizeText(data.programDivision || 'Higher Education', 80, false),
      deliveryMode: Validation.sanitizeText(data.deliveryMode || 'Hybrid', 40, false),
      comments: Validation.sanitizeText(data.comments || '', 1500, true),
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
      EmailService.sendEnrollmentConfirmation({
        enrollmentId: record.enrollmentId,
        fullName: record.fullName,
        email: record.email,
        programTitle: record.programTitle,
        programCode: record.programCode,
        programDivision: record.programDivision,
        deliveryMode: record.deliveryMode,
        preferredBatch: Validation.sanitizeText(data.preferredBatch || 'Upcoming Intake 2026', 80, false),
        status: record.status
      });
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
  updateEnrollmentStatus: function(enrollmentId, newStatus, adminNotes, userEmail, userRole) {
    var record = Database.getRecordById(Config.SHEETS.ENROLLMENTS, this.HEADERS, 'enrollmentId', enrollmentId);
    if (!record) {
      throw Validation.createError('NOT_FOUND', 'Enrollment record not found.');
    }

    Validation.validateStatusUpdate(
      enrollmentId,
      Config.ID_PREFIXES.ENROLLMENT,
      record.status,
      newStatus,
      Config.STATUSES.ENROLLMENT,
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

    Database.updateRecord(Config.SHEETS.ENROLLMENTS, this.HEADERS, 'enrollmentId', enrollmentId, updates);

    Database.logActivity('ENROLLMENT_STATUS_UPDATED', 'Status changed for ' + enrollmentId, {
      enrollmentId: enrollmentId,
      previousStatus: record.status,
      newStatus: newStatus
    }, userEmail);

    return { enrollmentId: enrollmentId, status: newStatus };
  }
};
