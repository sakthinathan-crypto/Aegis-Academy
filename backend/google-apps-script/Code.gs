/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT WEB APP DISPATCHER
 * File: Code.gs
 * Description: HTTP GET/POST dispatcher implementing standardized JSON envelopes,
 * server-side authorization enforcement, and error isolation.
 * ============================================================================
 */

/**
 * Standardized Success Response Envelope
 */
function sendSuccess(data, message) {
  var envelope = {
    success: true,
    message: message || 'Operation completed successfully',
    data: data || {},
    error: null
  };
  var output = ContentService.createTextOutput(JSON.stringify(envelope));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Standardized Error Response Envelope
 */
function sendError(code, message) {
  var envelope = {
    success: false,
    message: message || 'Operation failed',
    data: null,
    error: {
      code: code || 'INTERNAL_ERROR',
      message: message || 'An unexpected error occurred'
    }
  };
  var output = ContentService.createTextOutput(JSON.stringify(envelope));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * HTTP GET Dispatcher
 */
function doGet(e) {
  try {
    var params = e && e.parameter ? e.parameter : {};
    var action = params.action || 'ping';

    // 1. Public Health Check
    if (action === 'ping' || action === 'health') {
      return sendSuccess({
        service: 'Aegis Academy GAS Backend',
        version: '2.1.0',
        timestamp: new Date().toISOString()
      }, 'Aegis backend is operational');
    }

    // 2. Public Content Endpoints
    if (action === 'listPrograms') {
      return sendSuccess(ContentService.listPrograms(true), 'Active programs retrieved');
    }
    if (action === 'listProjects') {
      return sendSuccess(ContentService.listProjects(true), 'Active projects retrieved');
    }
    if (action === 'listEvents') {
      return sendSuccess(ContentService.listEvents(true), 'Active events retrieved');
    }

    // 3. Protected Endpoints (Role-based Authorization)
    if (action === 'getOverview') {
      var user = AuthService.authenticateRequest(e, 'view_dashboard');
      return sendSuccess(AdminService.getDashboardOverview(), 'Dashboard metrics calculated');
    }

    if (action === 'listEnrollments') {
      var user = AuthService.authenticateRequest(e, 'manage_enrollments');
      return sendSuccess(EnrollmentService.listEnrollments(), 'Enrollments retrieved');
    }

    if (action === 'listContacts') {
      var user = AuthService.authenticateRequest(e, 'manage_contacts');
      return sendSuccess(ContactService.listMessages(), 'Contact messages retrieved');
    }

    if (action === 'listQuotes') {
      var user = AuthService.authenticateRequest(e, 'manage_quotes');
      return sendSuccess(QuoteService.listQuotes(), 'Quote requests retrieved');
    }

    if (action === 'listApplications') {
      var user = AuthService.authenticateRequest(e, 'manage_careers');
      return sendSuccess(CareerService.listApplications(), 'Job applications retrieved');
    }

    if (action === 'getActivityLogs') {
      var user = AuthService.authenticateRequest(e, 'view_logs');
      return sendSuccess(Database.getAllRecords(Config.SHEETS.ACTIVITY_LOGS, Database.ACTIVITY_HEADERS), 'Activity logs retrieved');
    }

    if (action === 'getResumeDownloadUrl') {
      var user = AuthService.authenticateRequest(e, 'manage_careers');
      var appId = params.applicationId;
      if (!appId) throw new Error('Missing applicationId parameter.');
      return sendSuccess(CareerService.getResumeDownloadUrl(appId), 'Secure resume access URL generated');
    }

    return sendError('UNKNOWN_ACTION', 'Unrecognized GET action: ' + action);
  } catch (err) {
    Logger.log('doGet error: ' + err.toString());
    var code = err.code || 'BAD_REQUEST';
    return sendError(code, err.message || err.toString());
  }
}

/**
 * HTTP POST Dispatcher
 */
function doPost(e) {
  try {
    var body = {};
    if (e && e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        body = e.parameter || {};
      }
    } else if (e && e.parameter) {
      body = e.parameter;
    }

    var action = body.action || (e.parameter ? e.parameter.action : '');

    // 1. Public Submissions
    if (action === 'submitEnrollment') {
      var enrResult = EnrollmentService.submitEnrollment(body);
      return sendSuccess(enrResult, 'Student application submitted successfully');
    }

    if (action === 'submitContact') {
      var cntResult = ContactService.submitMessage(body);
      return sendSuccess(cntResult, 'Message submitted successfully');
    }

    if (action === 'submitQuote') {
      var quoResult = QuoteService.submitQuote(body);
      return sendSuccess(quoResult, 'Quotation request submitted successfully');
    }

    if (action === 'submitApplication') {
      var appResult = CareerService.submitApplication(body);
      return sendSuccess(appResult, 'Career application submitted successfully');
    }

    // 2. Administrator Authentication
    if (action === 'login') {
      var authResult = AuthService.authenticate(body.email, body.password);
      return sendSuccess(authResult, 'Authentication successful');
    }

    // 3. Protected Status Mutations (Requires Authorization)
    if (action === 'updateEnrollmentStatus') {
      var user = AuthService.authenticateRequest(e, 'manage_enrollments');
      var res = EnrollmentService.updateEnrollmentStatus(body.enrollmentId, body.status, body.adminNotes, user.email);
      return sendSuccess(res, 'Enrollment status updated');
    }

    if (action === 'updateContactStatus') {
      var user = AuthService.authenticateRequest(e, 'manage_contacts');
      var res = ContactService.updateMessageStatus(body.messageId, body.status, body.adminNotes, user.email);
      return sendSuccess(res, 'Contact status updated');
    }

    if (action === 'updateQuoteStatus') {
      var user = AuthService.authenticateRequest(e, 'manage_quotes');
      var res = QuoteService.updateQuoteStatus(body.quoteId, body.status, body.adminNotes, user.email);
      return sendSuccess(res, 'Quote status updated');
    }

    if (action === 'updateApplicationStatus') {
      var user = AuthService.authenticateRequest(e, 'manage_careers');
      var res = CareerService.updateApplicationStatus(body.applicationId, body.status, body.adminNotes, user.email);
      return sendSuccess(res, 'Application status updated');
    }

    if (action === 'saveProgram') {
      var user = AuthService.authenticateRequest(e, 'manage_content');
      var res = ContentService.saveProgram(body.programData);
      return sendSuccess(res, 'Program catalog record saved');
    }

    return sendError('UNKNOWN_ACTION', 'Unrecognized POST action: ' + action);
  } catch (err) {
    Logger.log('doPost error: ' + err.toString());
    var code = err.code || 'BAD_REQUEST';
    return sendError(code, err.message || err.toString());
  }
}
