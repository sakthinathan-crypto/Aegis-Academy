/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: ContactService.gs
 * Description: Visitor contact messages & inquiries management with abuse
 * protection, field sanitization, and status workflow validation.
 * ============================================================================
 */

var ContactService = {
  HEADERS: [
    'messageId',
    'fullName',
    'email',
    'phone',
    'organization',
    'inquiryType',
    'subject',
    'message',
    'status',
    'submittedAt',
    'updatedAt',
    'adminNotes'
  ],

  /**
   * Submit visitor contact message
   */
  submitMessage: function(data) {
    Validation.validateContact(data);

    var cleanEmail = String(data.email).trim().toLowerCase();
    var subject = Validation.sanitizeText(data.subject || 'Website Inquiry', 160, false);
    var messageBody = Validation.sanitizeText(data.message, 2500, true);

    Validation.enforcePublicAbuseProtection(
      'submitContact',
      cleanEmail,
      subject + '|' + messageBody.substring(0, 120)
    );

    var messageId = Database.generateSequentialId(Config.SHEETS.CONTACT_MESSAGES, Config.ID_PREFIXES.CONTACT);
    var nowIso = new Date().toISOString();

    var record = {
      messageId: messageId,
      fullName: Validation.sanitizeText(data.fullName, 100, false),
      email: cleanEmail,
      phone: Validation.sanitizeText(data.phone || '', 25, false),
      organization: Validation.sanitizeText(data.organization || '', 150, false),
      inquiryType: Validation.sanitizeText(data.inquiryType || 'General Inquiry', 80, false),
      subject: subject,
      message: messageBody,
      status: 'New',
      submittedAt: nowIso,
      updatedAt: nowIso,
      adminNotes: ''
    };

    Database.appendRecord(Config.SHEETS.CONTACT_MESSAGES, this.HEADERS, record);

    Database.logActivity('CONTACT_MESSAGE_SUBMITTED', 'Inquiry from ' + record.fullName, {
      messageId: messageId,
      subject: record.subject
    });

    try {
      EmailService.sendContactAcknowledgment(record);
      EmailService.sendTeamAlertEmail('New Contact Message: ' + record.subject, record);
    } catch (e) {
      Logger.log('Contact email note: ' + e.toString());
    }

    return {
      messageId: messageId,
      fullName: record.fullName,
      status: record.status,
      submittedAt: record.submittedAt
    };
  },

  /**
   * List contact messages
   */
  listMessages: function() {
    return Database.getAllRecords(Config.SHEETS.CONTACT_MESSAGES, this.HEADERS);
  },

  /**
   * Update message status with transition validation
   */
  updateMessageStatus: function(messageId, newStatus, adminNotes, userEmail, userRole) {
    var record = Database.getRecordById(Config.SHEETS.CONTACT_MESSAGES, this.HEADERS, 'messageId', messageId);
    if (!record) {
      throw Validation.createError('NOT_FOUND', 'Message record not found.');
    }

    Validation.validateStatusUpdate(
      messageId,
      Config.ID_PREFIXES.CONTACT,
      record.status,
      newStatus,
      Config.STATUSES.CONTACT,
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

    Database.updateRecord(Config.SHEETS.CONTACT_MESSAGES, this.HEADERS, 'messageId', messageId, updates);

    Database.logActivity('CONTACT_STATUS_UPDATED', 'Status changed for ' + messageId, {
      messageId: messageId,
      previousStatus: record.status,
      newStatus: newStatus
    }, userEmail);

    return { messageId: messageId, status: newStatus };
  }
};
