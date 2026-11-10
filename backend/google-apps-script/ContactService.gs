/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: ContactService.gs
 * Description: Visitor contact messages & inquiries management.
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

    var messageId = Database.generateSequentialId(Config.SHEETS.CONTACT_MESSAGES, Config.ID_PREFIXES.CONTACT);
    var nowIso = new Date().toISOString();

    var record = {
      messageId: messageId,
      fullName: String(data.fullName).trim(),
      email: String(data.email).trim().toLowerCase(),
      phone: String(data.phone || '').trim(),
      organization: String(data.organization || '').trim(),
      inquiryType: String(data.inquiryType || 'General Inquiry').trim(),
      subject: String(data.subject || 'Website Inquiry').trim(),
      message: String(data.message).trim(),
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
   * Update message status
   */
  updateMessageStatus: function(messageId, newStatus, adminNotes, userEmail) {
    var record = Database.getRecordById(Config.SHEETS.CONTACT_MESSAGES, this.HEADERS, 'messageId', messageId);
    if (!record) {
      throw new Error('Message not found: ' + messageId);
    }

    var updates = {
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }

    Database.updateRecord(Config.SHEETS.CONTACT_MESSAGES, this.HEADERS, 'messageId', messageId, updates);

    Database.logActivity('CONTACT_STATUS_UPDATED', 'Status changed to ' + newStatus + ' for ' + messageId, {
      messageId: messageId,
      newStatus: newStatus
    }, userEmail);

    return { messageId: messageId, status: newStatus };
  }
};
