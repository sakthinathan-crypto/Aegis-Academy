/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: QuoteService.gs
 * Description: Enterprise technology service quote requests management
 * ============================================================================
 */

var QuoteService = {
  submit: function(data) {
    if (!data.contact_name || !data.email || !data.service_required) {
      throw new Error('Contact name, email, and service required are mandatory.');
    }

    var quoteId = generateSequentialId(CONFIG.SHEETS.QUOTE_REQUESTS, CONFIG.ID_PREFIXES.QUOTE);
    var now = new Date().toISOString();

    var record = {
      quote_id: quoteId,
      created_at: now,
      updated_at: now,
      contact_name: String(data.contact_name || data.name || '').trim(),
      company_name: String(data.company_name || data.organization || '').trim(),
      email: String(data.email).trim().toLowerCase(),
      phone: String(data.phone || '').trim(),
      service_required: String(data.service_required || data.serviceRequired || '').trim(),
      budget: String(data.budget || data.estimatedBudget || '').trim(),
      project_description: String(data.project_description || data.projectDescription || '').trim(),
      timeline: String(data.timeline || data.expectedTimeline || '').trim(),
      status: 'New',
      assigned_to: '',
      admin_notes: ''
    };

    appendRowRecord(CONFIG.SHEETS.QUOTE_REQUESTS, record);

    try {
      EmailService.sendQuoteConfirmation(record);
      EmailService.sendAdminQuoteAlert(record);
    } catch (e) {
      console.warn('Quote email error:', e);
    }

    return {
      quote_id: quoteId,
      contact_name: record.contact_name,
      service_required: record.service_required,
      created_at: record.created_at
    };
  },

  getAll: function() {
    return readAllRows(CONFIG.SHEETS.QUOTE_REQUESTS);
  },

  update: function(quoteId, updates, adminEmail) {
    if (!quoteId) throw new Error('Quote ID required.');
    updateRowRecord(CONFIG.SHEETS.QUOTE_REQUESTS, 'quote_id', quoteId, updates);
    logActivity(adminEmail, 'UPDATE_QUOTE', 'Quote_Requests', quoteId, 'Quote updated to ' + (updates.status || 'modified'));
    return { success: true, quote_id: quoteId };
  },

  delete: function(quoteId, adminEmail) {
    if (!quoteId) throw new Error('Quote ID required.');
    var res = deleteRowRecord(CONFIG.SHEETS.QUOTE_REQUESTS, 'quote_id', quoteId);
    logActivity(adminEmail, 'DELETE_QUOTE', 'Quote_Requests', quoteId, 'Quote deleted');
    return { success: res, quote_id: quoteId };
  }
};
