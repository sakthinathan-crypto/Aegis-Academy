/**
 * AEGIS ACADEMY - WEB APP DISPATCHER (Google Apps Script)
 * Main entry point for HTTP GET and POST requests from the Vercel frontend.
 * Handles routing, authentication, error management, and JSON response formatting.
 */

/**
 * Helper to build JSON responses
 */
function jsonResponse(data, status) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Handle HTTP GET requests
 */
function doGet(e) {
  try {
    var params = e && e.parameter ? e.parameter : {};
    var action = params.action || 'ping';

    // 1. Health check & version
    if (action === 'ping' || action === 'health') {
      return jsonResponse({
        success: true,
        service: 'Aegis Academy GAS Backend',
        version: '2.0.0',
        timestamp: new Date().toISOString()
      });
    }

    // 2. Public Content Lists
    if (action === 'listPrograms') {
      return jsonResponse({ success: true, data: ContentService.listPrograms(true) });
    }
    if (action === 'listProjects') {
      return jsonResponse({ success: true, data: ContentService.listProjects(true) });
    }
    if (action === 'listEvents') {
      return jsonResponse({ success: true, data: ContentService.listEvents(true) });
    }

    // 3. Protected Admin Endpoints (Require Valid Token)
    var user = AuthService.authenticateRequest(e);

    if (action === 'getOverview') {
      return jsonResponse(AdminService.getDashboardOverview());
    }
    if (action === 'listEnrollments') {
      return jsonResponse({ success: true, data: EnrollmentService.listEnrollments() });
    }
    if (action === 'listContacts') {
      return jsonResponse({ success: true, data: ContactService.listMessages() });
    }
    if (action === 'listQuotes') {
      return jsonResponse({ success: true, data: QuoteService.listQuotes() });
    }
    if (action === 'listApplications') {
      return jsonResponse({ success: true, data: CareerService.listApplications() });
    }
    if (action === 'getActivityLogs') {
      return jsonResponse({ success: true, data: Database.getAllRecords(Config.SHEETS.ACTIVITY_LOGS, Database.ACTIVITY_HEADERS) });
    }

    return jsonResponse({ success: false, error: 'Unknown GET action: ' + action });
  } catch (err) {
    Logger.log('doGet error: ' + err.toString());
    return jsonResponse({ success: false, error: err.message || err.toString() });
  }
}

/**
 * Handle HTTP POST requests
 */
function doPost(e) {
  try {
    var body = {};
    if (e && e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        // Fallback for form-encoded
        body = e.parameter || {};
      }
    } else if (e && e.parameter) {
      body = e.parameter;
    }

    var action = body.action || (e.parameter ? e.parameter.action : '');

    // 1. Public Form Submissions
    if (action === 'submitEnrollment') {
      var enrResult = EnrollmentService.submitEnrollment(body);
      return jsonResponse(enrResult);
    }

    if (action === 'submitContact') {
      var cntResult = ContactService.submitMessage(body);
      return jsonResponse(cntResult);
    }

    if (action === 'submitQuote') {
      var quoResult = QuoteService.submitQuote(body);
      return jsonResponse(quoResult);
    }

    if (action === 'submitApplication') {
      var appResult = CareerService.submitApplication(body);
      return jsonResponse(appResult);
    }

    // 2. Admin Authentication
    if (action === 'login') {
      var authResult = AuthService.authenticate(body.email, body.password);
      return jsonResponse(authResult);
    }

    // 3. Protected Admin Mutations (Require Valid Token)
    var user = AuthService.authenticateRequest(e);

    if (action === 'updateEnrollmentStatus') {
      var enrUpdate = EnrollmentService.updateEnrollmentStatus(body.enrollmentId, body.status, body.adminNotes);
      return jsonResponse(enrUpdate);
    }

    if (action === 'updateContactStatus') {
      var cntUpdate = ContactService.updateMessageStatus(body.messageId, body.status, body.adminNotes);
      return jsonResponse(cntUpdate);
    }

    if (action === 'updateQuoteStatus') {
      var quoUpdate = QuoteService.updateQuoteStatus(body.quoteId, body.status, body.adminNotes);
      return jsonResponse(quoUpdate);
    }

    if (action === 'updateApplicationStatus') {
      var appUpdate = CareerService.updateApplicationStatus(body.applicationId, body.status, body.adminNotes);
      return jsonResponse(appUpdate);
    }

    if (action === 'saveProgram') {
      var prgSave = ContentService.saveProgram(body.programData);
      return jsonResponse(prgSave);
    }

    return jsonResponse({ success: false, error: 'Unknown POST action: ' + action });
  } catch (err) {
    Logger.log('doPost error: ' + err.toString());
    return jsonResponse({ success: false, error: err.message || err.toString() });
  }
}
