/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT WEB APP DISPATCHER
 * File: Code.gs
 * Description: Hardened HTTP GET/POST dispatcher enforcing POST-body token
 * transport, strict payload size bounds, role-based authorization,
 * standardized JSON envelopes, and sanitized public error responses.
 * ============================================================================
 */

var CLIENT_SAFE_ERROR_CODES = [
  'VALIDATION_ERROR',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'RATE_LIMITED',
  'DUPLICATE_SUBMISSION',
  'FILE_TOO_LARGE',
  'INVALID_FILE',
  'NOT_FOUND',
  'PAYLOAD_TOO_LARGE',
  'UNKNOWN_ACTION',
  'METHOD_NOT_ALLOWED',
  'INVALID_CREDENTIALS',
  'SERVICE_BUSY'
];

var PROTECTED_ACTIONS = [
  'getOverview',
  'listEnrollments',
  'listContacts',
  'listQuotes',
  'listApplications',
  'getActivityLogs',
  'getResumeDownloadUrl',
  'updateEnrollmentStatus',
  'updateContactStatus',
  'updateQuoteStatus',
  'updateApplicationStatus',
  'saveProgram',
  'verifySession',
  'logout'
];

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
 * Convert caught error into a safe public response without leaking internal internals
 */
function handleDispatcherError(contextLabel, err) {
  var errCode = err && err.code ? String(err.code) : 'INTERNAL_ERROR';
  var isSafe = Boolean(err && (err.isClientSafe || CLIENT_SAFE_ERROR_CODES.indexOf(errCode) !== -1));

  // Log message only (never log tokens/payloads)
  Logger.log(contextLabel + ' [' + errCode + ']: ' + (err && err.message ? err.message : String(err)));

  if (isSafe) {
    return sendError(errCode, err.message || 'Request could not be processed.');
  }
  return sendError('INTERNAL_ERROR', 'An internal server error occurred. Please try again later.');
}

/**
 * HTTP GET Dispatcher (Strictly Public Read-Only Endpoints; No Session Tokens in URLs)
 */
function doGet(e) {
  try {
    var params = e && e.parameter ? e.parameter : {};

    // Never accept session tokens via URL query string
    if (params.token) {
      return sendError('UNAUTHORIZED', 'Session tokens must not be transmitted in URL query parameters.');
    }

    var action = String(params.action || 'ping');

    // 1. Public Health Check
    if (action === 'ping' || action === 'health') {
      return sendSuccess({
        service: 'Aegis Academy GAS Backend',
        version: '2.2.0',
        timestamp: new Date().toISOString()
      }, 'Aegis backend is operational');
    }

    // 2. Public Content Endpoints
    if (action === 'listPrograms') {
      return sendSuccess(CatalogContentService.listPrograms(true), 'Active programs retrieved');
    }
    if (action === 'listProjects') {
      return sendSuccess(CatalogContentService.listProjects(true), 'Active projects retrieved');
    }
    if (action === 'listEvents') {
      return sendSuccess(CatalogContentService.listEvents(true), 'Active events retrieved');
    }

    // 3. Reject Protected Actions on GET
    if (PROTECTED_ACTIONS.indexOf(action) !== -1) {
      return sendError('METHOD_NOT_ALLOWED', 'Protected operations require POST with session token in the JSON request body.');
    }

    return sendError('UNKNOWN_ACTION', 'Unrecognized GET action.');
  } catch (err) {
    return handleDispatcherError('doGet error', err);
  }
}

/**
 * HTTP POST Dispatcher
 */
function doPost(e) {
  try {
    // Reject tokens placed in URL query string on POST requests too
    if (e && e.parameter && e.parameter.token) {
      return sendError('UNAUTHORIZED', 'Session tokens must not be transmitted in URL query parameters.');
    }

    if (!e || !e.postData || typeof e.postData.contents !== 'string') {
      return sendError('VALIDATION_ERROR', 'Missing JSON request body.');
    }

    var rawBody = e.postData.contents;
    if (rawBody.length > Config.SECURITY.MAX_RESUME_PAYLOAD_BYTES) {
      return sendError('PAYLOAD_TOO_LARGE', 'Request payload exceeds maximum allowed size.');
    }

    var body;
    try {
      body = JSON.parse(rawBody);
    } catch (parseErr) {
      return sendError('VALIDATION_ERROR', 'Malformed JSON request body.');
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return sendError('VALIDATION_ERROR', 'Invalid JSON payload structure.');
    }

    var action = String(body.action || '');

    // Enforce compact 64 KB payload limit for all endpoints except resume upload (submitApplication)
    if (action !== 'submitApplication' && rawBody.length > Config.SECURITY.MAX_JSON_BYTES) {
      return sendError('PAYLOAD_TOO_LARGE', 'Request payload exceeds maximum allowed size for this endpoint.');
    }

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

    // 2. Administrator Authentication & Session Lifecycle
    if (action === 'login') {
      var authResult = AuthService.authenticate(body.email, body.password);
      return sendSuccess(authResult, 'Authentication successful');
    }

    if (action === 'verifySession') {
      var sessionUser = AuthService.authenticateRequest(e, 'view_dashboard', body);
      return sendSuccess({ user: sessionUser, valid: true }, 'Session verified');
    }

    if (action === 'logout') {
      var revResult = AuthService.revokeToken(body.token);
      return sendSuccess(revResult, 'Session terminated');
    }

    // 3. Protected Admin Read Endpoints (via POST so tokens remain out of URLs)
    if (action === 'getOverview') {
      var overviewUser = AuthService.authenticateRequest(e, 'view_dashboard', body);
      return sendSuccess(AdminService.getDashboardOverview(overviewUser.role), 'Dashboard metrics calculated');
    }

    if (action === 'listEnrollments') {
      AuthService.authenticateRequest(e, 'manage_enrollments', body);
      return sendSuccess(EnrollmentService.listEnrollments(), 'Enrollments retrieved');
    }

    if (action === 'listContacts') {
      AuthService.authenticateRequest(e, 'manage_contacts', body);
      return sendSuccess(ContactService.listMessages(), 'Contact messages retrieved');
    }

    if (action === 'listQuotes') {
      AuthService.authenticateRequest(e, 'manage_quotes', body);
      return sendSuccess(QuoteService.listQuotes(), 'Quote requests retrieved');
    }

    if (action === 'listApplications') {
      AuthService.authenticateRequest(e, 'manage_careers', body);
      return sendSuccess(CareerService.listApplications(), 'Job applications retrieved');
    }

    if (action === 'getActivityLogs') {
      AuthService.authenticateRequest(e, 'view_logs', body);
      return sendSuccess(Database.getAllRecords(Config.SHEETS.ACTIVITY_LOGS, Database.ACTIVITY_HEADERS), 'Activity logs retrieved');
    }

    if (action === 'getResumeDownloadUrl') {
      var resumeUser = AuthService.authenticateRequest(e, 'manage_careers', body);
      if (!body.applicationId) {
        return sendError('VALIDATION_ERROR', 'Missing applicationId parameter.');
      }
      return sendSuccess(
        CareerService.getResumeDownloadUrl(body.applicationId, resumeUser.email, resumeUser.role),
        'Secure resume access URL generated'
      );
    }

    // 4. Protected Status Mutations (Requires Authorization)
    if (action === 'updateEnrollmentStatus') {
      var enrUser = AuthService.authenticateRequest(e, 'manage_enrollments', body);
      var enrUpd = EnrollmentService.updateEnrollmentStatus(body.enrollmentId, body.status, body.adminNotes, enrUser.email, enrUser.role);
      return sendSuccess(enrUpd, 'Enrollment status updated');
    }

    if (action === 'updateContactStatus') {
      var cntUser = AuthService.authenticateRequest(e, 'manage_contacts', body);
      var cntUpd = ContactService.updateMessageStatus(body.messageId, body.status, body.adminNotes, cntUser.email, cntUser.role);
      return sendSuccess(cntUpd, 'Contact status updated');
    }

    if (action === 'updateQuoteStatus') {
      var quoUser = AuthService.authenticateRequest(e, 'manage_quotes', body);
      var quoUpd = QuoteService.updateQuoteStatus(body.quoteId, body.status, body.adminNotes, quoUser.email, quoUser.role);
      return sendSuccess(quoUpd, 'Quote status updated');
    }

    if (action === 'updateApplicationStatus') {
      var carUser = AuthService.authenticateRequest(e, 'manage_careers', body);
      var carUpd = CareerService.updateApplicationStatus(body.applicationId, body.status, body.adminNotes, carUser.email, carUser.role);
      return sendSuccess(carUpd, 'Application status updated');
    }

    if (action === 'saveProgram') {
      var prgUser = AuthService.authenticateRequest(e, 'manage_content', body);
      var prgRes = CatalogContentService.saveProgram(body.programData, prgUser.email);
      return sendSuccess(prgRes, 'Program catalog record saved');
    }

    return sendError('UNKNOWN_ACTION', 'Unrecognized POST action.');
  } catch (err) {
    return handleDispatcherError('doPost error', err);
  }
}
