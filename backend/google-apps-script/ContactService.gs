/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: ContactService.gs
 * Description: Visitor contact messages & inquiries management
 * ============================================================================
 */

var ContactService = {
  submit: function(data) {
    if (!data.name || !data.email || !data.message) {
      throw new Error('Name, email, and message are required.');
    }

    var messageId = generateSequentialId(CONFIG.SHEETS.CONTACT_MESSAGES, CONFIG.ID_PREFIXES.CONTACT);
    var now = new Date().toISOString();

    var record = {
      message_id: messageId,
      created_at: now,
      updated_at: now,
      name: String(data.name).trim(),
      email: String(data.email).trim().toLowerCase(),
      phone: String(data.phone || '').trim(),
      subject: String(data.subject || 'General Inquiry').trim(),
      message: String(data.message).trim(),
      status: 'Unread',
      admin_notes: ''
    };

    appendRowRecord(CONFIG.SHEETS.CONTACT_MESSAGES, record);

    try {
      EmailService.sendContactConfirmation(record);
      EmailService.sendAdminContactAlert(record);
    } catch (e) {
      console.warn('Contact email error:', e);
    }

    return {
      message_id: messageId,
      name: record.name,
      created_at: record.created_at
    };
  },

  getAll: function() {
    return readAllRows(CONFIG.SHEETS.CONTACT_MESSAGES);
  },

  update: function(messageId, updates, adminEmail) {
    if (!messageId) throw new Error('Message ID required.');
    updateRowRecord(CONFIG.SHEETS.CONTACT_MESSAGES, 'message_id', messageId, updates);
    logActivity(adminEmail, 'UPDATE_MESSAGE', 'Contact_Messages', messageId, 'Status updated to ' + (updates.status || 'modified'));
    return { success: true, message_id: messageId };
  },

  delete: function(messageId, adminEmail) {
    if (!messageId) throw new Error('Message ID required.');
    var res = deleteRowRecord(CONFIG.SHEETS.CONTACT_MESSAGES, 'message_id', messageId);
    logActivity(adminEmail, 'DELETE_MESSAGE', 'Contact_Messages', messageId, 'Message deleted');
    return { success: res, message_id: messageId };
  }
};
