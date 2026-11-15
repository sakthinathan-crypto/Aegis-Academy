/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: QuoteService.gs
 * Description: Enterprise software and institutional quote requests with
 * abuse protection, sanitization, and status workflow validation.
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

    var cleanEmail = String(data.workEmail).trim().toLowerCase();
    var companyName = Validation.sanitizeText(data.companyName, 150, false);
    var serviceRequired = Validation.sanitizeText(data.serviceRequired, 150, false);

    Validation.enforcePublicAbuseProtection(
      'submitQuote',
      cleanEmail,
      companyName + '|' + serviceRequired
    );

    var quoteId = Database.generateSequentialId(Config.SHEETS.QUOTE_REQUESTS, Config.ID_PREFIXES.QUOTE);
    var nowIso = new Date().toISOString();

    var record = {
      quoteId: quoteId,
      fullName: Validation.sanitizeText(data.fullName, 100, false),
      companyName: companyName,
      workEmail: cleanEmail,
      phone: Validation.sanitizeText(data.phone || '', 25, false),
      serviceRequired: serviceRequired,
      requirements: Validation.sanitizeText(data.requirements || '', 3000, true),
      budgetRange: Validation.sanitizeText(data.budgetRange || '', 80, false),
      targetTimeline: Validation.sanitizeText(data.targetTimeline || '', 80, false),
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
      EmailService.sendQuoteAcknowledgment({
        quoteId: record.quoteId,
        fullName: record.fullName,
        companyName: record.companyName,
        companyType: Validation.sanitizeText(data.companyType || '', 80, false),
        workEmail: record.workEmail,
        serviceRequired: record.serviceRequired,
        budgetRange: record.budgetRange,
        targetTimeline: record.targetTimeline
      });
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
   * Update quote status with transition validation
   */
  updateQuoteStatus: function(quoteId, newStatus, adminNotes, userEmail, userRole) {
    var record = Database.getRecordById(Config.SHEETS.QUOTE_REQUESTS, this.HEADERS, 'quoteId', quoteId);
    if (!record) {
      throw Validation.createError('NOT_FOUND', 'Quote request not found.');
    }

    Validation.validateStatusUpdate(
      quoteId,
      Config.ID_PREFIXES.QUOTE,
      record.status,
      newStatus,
      Config.STATUSES.QUOTE,
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

    Database.updateRecord(Config.SHEETS.QUOTE_REQUESTS, this.HEADERS, 'quoteId', quoteId, updates);

    Database.logActivity('QUOTE_STATUS_UPDATED', 'Status changed for ' + quoteId, {
      quoteId: quoteId,
      previousStatus: record.status,
      newStatus: newStatus
    }, userEmail);

    return { quoteId: quoteId, status: newStatus };
  }
};
