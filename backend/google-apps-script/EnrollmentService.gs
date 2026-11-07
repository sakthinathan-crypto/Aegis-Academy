/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: EnrollmentService.gs
 * Description: Student enrollment registration, listing, status updates
 * ============================================================================
 */

var EnrollmentService = {
  /**
   * Public: submit enrollment
   */
  submit: function(data) {
    if (!data.student_name || !data.email || !data.phone) {
      throw new Error('Student name, email, and phone number are required.');
    }

    // Generate concurrency-safe sequential ID
    var enrollmentId = generateSequentialId(CONFIG.SHEETS.ENROLLMENTS, CONFIG.ID_PREFIXES.ENROLLMENT);
    var now = new Date().toISOString();

    var record = {
      enrollment_id: enrollmentId,
      created_at: now,
      updated_at: now,
      student_name: String(data.student_name).trim(),
      phone: String(data.phone).trim(),
      whatsapp: String(data.whatsapp || data.phone).trim(),
      email: String(data.email).trim().toLowerCase(),
      institution: String(data.institution || data.institutionName || '').trim(),
      department: String(data.department || '').trim(),
      year: String(data.year || data.yearOfStudy || '').trim(),
      district: String(data.district || '').trim(),
      program: String(data.program || data.selectedProgram || '').trim(),
      learning_mode: String(data.learning_mode || data.learningMode || 'Hybrid').trim(),
      additional_information: String(data.additional_information || data.additionalInfo || '').trim(),
      status: 'New',
      assigned_to: '',
      admin_notes: ''
    };

    appendRowRecord(CONFIG.SHEETS.ENROLLMENTS, record);

    // Send asynchronous confirmation & admin notification (failure does not rollback record)
    try {
      EmailService.sendEnrollmentConfirmation(record);
      EmailService.sendAdminEnrollmentAlert(record);
    } catch (e) {
      console.warn('Enrollment email failed:', e);
    }

    return {
      enrollment_id: enrollmentId,
      student_name: record.student_name,
      program: record.program,
      created_at: record.created_at
    };
  },

  /**
   * Admin: List all enrollments
   */
  getAll: function() {
    return readAllRows(CONFIG.SHEETS.ENROLLMENTS);
  },

  /**
   * Admin: Update status / notes
   */
  update: function(enrollmentId, updates, adminEmail) {
    if (!enrollmentId) throw new Error('Enrollment ID required.');
    updateRowRecord(CONFIG.SHEETS.ENROLLMENTS, 'enrollment_id', enrollmentId, updates);
    logActivity(adminEmail, 'UPDATE_ENROLLMENT', 'Enrollments', enrollmentId, 'Status updated to ' + (updates.status || 'modified'));
    return { success: true, enrollment_id: enrollmentId };
  },

  /**
   * Admin: Delete enrollment
   */
  delete: function(enrollmentId, adminEmail) {
    if (!enrollmentId) throw new Error('Enrollment ID required.');
    var res = deleteRowRecord(CONFIG.SHEETS.ENROLLMENTS, 'enrollment_id', enrollmentId);
    logActivity(adminEmail, 'DELETE_ENROLLMENT', 'Enrollments', enrollmentId, 'Record deleted');
    return { success: res, enrollment_id: enrollmentId };
  }
};
