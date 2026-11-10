/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: QuoteService.gs
 * Description: Enterprise software and institutional quote requests.
 * ============================================================================
 */

var QuoteService = {
  HEADERS: [
    'quoteId',
    'fullName',
    'companyName',
    'workEmail',
    'phone',
    'serviceRequired',
    'requirements',
    'budgetRange',
    'targetTimeline',
    'status',
    'submittedAt',
    'updatedAt',
    'adminNotes'
  ],

  /**
   * Submit enterprise quotation request
   */
  submitQuote: function(data) {
    Validation.validateQuote(data);

    var quoteId = Database.generateSequentialId(Config.SHEETS.QUOTE_REQUESTS, Config.ID_PREFIXES.QUOTE);
    var nowIso = new Date().toISOString();

    var record = {
      quoteId: quoteId,
      fullName: String(data.fullName).trim(),
      companyName: String(data.companyName).trim(),
      workEmail: String(data.workEmail).trim().toLowerCase(),
      phone: String(data.phone || '').trim(),
      serviceRequired: String(data.serviceRequired).trim(),
      requirements: String(data.requirements || '').trim(),
      budgetRange: String(data.budgetRange || '').trim(),
      targetTimeline: String(data.targetTimeline || '').trim(),
      status: 'Submitted',
      submittedAt: nowIso,
      updatedAt: nowIso,
      adminNotes: ''
    };

    Database.appendRecord(Config.SHEETS.QUOTE_REQUESTS, this.HEADERS, record);

    Database.logActivity('QUOTE_REQUEST_SUBMITTED', 'Quote for ' + record.companyName, {
      quoteId: quoteId,
      company: record.companyName,
      service: record.serviceRequired
    });

    try {
      EmailService.sendQuoteAcknowledgment(record);
      EmailService.sendTeamAlertEmail('New Quote Request: ' + record.companyName, record);
    } catch (e) {
      Logger.log('Quote email note: ' + e.toString());
    }

    return {
      quoteId: quoteId,
      companyName: record.companyName,
      status: record.status,
      submittedAt: record.submittedAt
    };
  },

  /**
   * List quote requests
   */
  listQuotes: function() {
    return Database.getAllRecords(Config.SHEETS.QUOTE_REQUESTS, this.HEADERS);
  },

  /**
   * Update quote status
   */
  updateQuoteStatus: function(quoteId, newStatus, adminNotes, userEmail) {
    var record = Database.getRecordById(Config.SHEETS.QUOTE_REQUESTS, this.HEADERS, 'quoteId', quoteId);
    if (!record) {
      throw new Error('Quote request not found: ' + quoteId);
    }

    var updates = {
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }

    Database.updateRecord(Config.SHEETS.QUOTE_REQUESTS, this.HEADERS, 'quoteId', quoteId, updates);

    Database.logActivity('QUOTE_STATUS_UPDATED', 'Status changed to ' + newStatus + ' for ' + quoteId, {
      quoteId: quoteId,
      newStatus: newStatus
    }, userEmail);

    return { quoteId: quoteId, status: newStatus };
  }
};
