/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: Validation.gs
 * Description: Server-side input validation, strict length & allowed-value
 * enforcement, URL & header sanitization, HTML escaping, formula injection
 * protection, and abuse/rate-limiting helpers.
 * ============================================================================
 */

var Validation = {
  /**
   * Build a structured, client-safe error object
   */
  createError: function(code, message) {
    var err = new Error(message);
    err.code = code;
    err.isClientSafe = true;
    return err;
  },

  /**
   * Sanitizes string to prevent CSV / Google Sheet Formula Injection (=, +, -, @, tab, CR, |)
   */
  sanitizeFormula: function(val) {
    if (typeof val !== 'string') return val;
    var raw = val.replace(/\x00/g, '');
    var trimmed = raw.trim();
    var formulaTriggers = ['=', '+', '-', '@', '\t', '\r', '|'];
    if (
      (raw.length > 0 && formulaTriggers.indexOf(raw.charAt(0)) !== -1) ||
      (trimmed.length > 0 && formulaTriggers.indexOf(trimmed.charAt(0)) !== -1)
    ) {
      // Prefix with apostrophe so Google Sheets treats it strictly as plain text literal
      return "'" + trimmed;
    }
    return trimmed;
  },

  /**
   * Strip dangerous control characters and enforce maximum string length
   */
  sanitizeText: function(val, maxLength, allowNewlines) {
    if (val === undefined || val === null) return '';
    var str = String(val);
    if (allowNewlines) {
      str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    } else {
      str = str.replace(/[\x00-\x1F\x7F]/g, ' ');
    }
    str = str.trim();
    if (maxLength && str.length > maxLength) {
      str = str.substring(0, maxLength);
    }
    return str;
  },

  /**
   * Prevent Email Header Injection (strip CR, LF, NUL, control chars)
   */
  sanitizeHeaderValue: function(val, maxLength) {
    if (val === undefined || val === null) return '';
    var clean = String(val).replace(/[\r\n\x00-\x1F\x7F]+/g, ' ').trim();
    if (maxLength && clean.length > maxLength) {
      clean = clean.substring(0, maxLength);
    }
    return clean;
  },

  /**
   * Escape HTML special characters before interpolating user data into HTML emails
   */
  escapeHtml: function(val) {
    if (val === undefined || val === null) return '';
    return String(val)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  /**
   * Validates email format strictly (no CRLF, no whitespace, single @, valid length)
   */
  isValidEmail: function(email) {
    if (!email || typeof email !== 'string') return false;
    if (/[\r\n\x00-\x1F\x7F]/.test(email)) return false;
    var trimmed = email.trim();
    if (trimmed.length < 5 || trimmed.length > 150) return false;
    var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return regex.test(trimmed);
  },

  /**
   * Validates phone format (7 to 16 digits)
   */
  isValidPhone: function(phone) {
    if (!phone || typeof phone !== 'string') return false;
    var trimmed = phone.trim();
    if (trimmed.length > 25) return false;
    var clean = trimmed.replace(/[\s\-\(\)\+]/g, '');
    return clean.length >= 7 && clean.length <= 16 && /^\d+$/.test(clean);
  },

  /**
   * Validates external HTTP/HTTPS URL (blocks javascript:, data:, vbscript:, etc.)
   */
  isValidSafeUrl: function(url) {
    if (!url || typeof url !== 'string') return false;
    var trimmed = url.trim();
    if (trimmed.length < 8 || trimmed.length > 500) return false;
    if (/[\s\r\n\x00-\x1F\x7F]/.test(trimmed)) return false;
    return /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/i.test(trimmed);
  },

  /**
   * Validates record ID format
   */
  isValidRecordId: function(id, expectedPrefix) {
    if (!id || typeof id !== 'string') return false;
    var trimmed = id.trim();
    if (!/^[A-Z0-9\-]{6,40}$/.test(trimmed)) return false;
    if (expectedPrefix && trimmed.indexOf(expectedPrefix + '-') !== 0) return false;
    return true;
  },

  /**
   * Check allowed option value
   */
  isAllowedOption: function(val, allowedList) {
    if (!val || typeof val !== 'string') return false;
    return allowedList.indexOf(val.trim()) !== -1;
  },

  /**
   * Reject automated submissions that populate hidden honeypot fields
   */
  assertNoBotHoneypot: function(data) {
    if (!data || typeof data !== 'object') return;
    if (data._hp_field && String(data._hp_field).trim().length > 0) {
      throw this.createError('VALIDATION_ERROR', 'Submission could not be verified. Please refresh and try again.');
    }
  },

  /**
   * Compute SHA-256 hex digest for cache keys & deduplication
   */
  sha256Hex: function(input) {
    var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(input), Utilities.Charset.UTF_8);
    var hex = '';
    for (var i = 0; i < bytes.length; i++) {
      var b = bytes[i] & 0xff;
      hex += (b < 16 ? '0' : '') + b.toString(16);
    }
    return hex;
  },

  /**
   * Enforce sliding/window rate limits & duplicate submission checks for public forms
   */
  enforcePublicAbuseProtection: function(action, email, uniqueContent) {
    var lock = LockService.getScriptLock();
    var hasLock = lock.tryLock(5000);
    if (!hasLock) {
      throw this.createError('RATE_LIMITED', 'Server is handling high request volume. Please try again in a moment.');
    }

    try {
      var cache = CacheService.getScriptCache();
      var cleanEmail = String(email || '').trim().toLowerCase();

      // 1. Global burst protection against automated flooding & quota exhaustion
      var burstKey = 'pub_burst_all';
      var burstCount = parseInt(cache.get(burstKey) || '0', 10);
      if (burstCount >= Config.SECURITY.PUBLIC_GLOBAL_BURST_MAX) {
        throw this.createError('RATE_LIMITED', 'High submission traffic detected. Please wait a few minutes and try again.');
      }

      // 2. Per-email across all public forms (hourly guard)
      var emailHash = this.sha256Hex(cleanEmail).substring(0, 24);
      var hourlyKey = 'pub_hr_' + emailHash;
      var hourlyCount = parseInt(cache.get(hourlyKey) || '0', 10);
      if (hourlyCount >= Config.SECURITY.PUBLIC_EMAIL_HOURLY_MAX) {
        throw this.createError('RATE_LIMITED', 'You have reached the hourly submission limit. Please wait before submitting again.');
      }

      // 3. Per-email per-action window (max 3 per 10 min)
      var actionKey = 'pub_act_' + action + '_' + emailHash;
      var actionCount = parseInt(cache.get(actionKey) || '0', 10);
      if (actionCount >= Config.SECURITY.PUBLIC_RATE_LIMIT_MAX) {
        throw this.createError('RATE_LIMITED', 'Multiple submissions detected from this email. Please wait 10 minutes before submitting again.');
      }

      // 4. Exact duplicate submission check (10 min window)
      var payloadFingerprint = this.sha256Hex(action + '|' + cleanEmail + '|' + String(uniqueContent || '').trim().toLowerCase()).substring(0, 32);
      var dedupeKey = 'pub_dup_' + payloadFingerprint;
      if (cache.get(dedupeKey)) {
        throw this.createError('DUPLICATE_SUBMISSION', 'An identical submission was already received recently. Please check your confirmation email.');
      }

      // Record counters
      cache.put(burstKey, String(burstCount + 1), Config.SECURITY.PUBLIC_GLOBAL_BURST_SECONDS);
      cache.put(hourlyKey, String(hourlyCount + 1), 3600);
      cache.put(actionKey, String(actionCount + 1), Config.SECURITY.PUBLIC_RATE_WINDOW_SECONDS);
      cache.put(dedupeKey, '1', Config.SECURITY.DUPLICATE_WINDOW_SECONDS);
    } finally {
      lock.releaseLock();
    }
  },

  /**
   * Validate student enrollment payload
   */
  validateEnrollment: function(data) {
    if (!data || typeof data !== 'object') {
      throw this.createError('VALIDATION_ERROR', 'Invalid enrollment payload.');
    }
    this.assertNoBotHoneypot(data);

    var errors = [];
    var fullName = this.sanitizeText(data.fullName, 100, false);
    if (fullName.length < 2) {
      errors.push('Full name must be between 2 and 100 characters.');
    }
    if (!this.isValidEmail(data.email)) {
      errors.push('A valid email address is required.');
    }
    if (!this.isValidPhone(data.phone)) {
      errors.push('A valid primary phone number (7-16 digits) is required.');
    }
    if (data.guardianPhone && String(data.guardianPhone).trim().length > 0 && !this.isValidPhone(data.guardianPhone)) {
      errors.push('Guardian/WhatsApp phone number format is invalid.');
    }
    var programTitle = this.sanitizeText(data.programTitle, 150, false);
    if (programTitle.length < 2) {
      errors.push('A target program must be selected.');
    }
    if (data.deliveryMode && !this.isAllowedOption(data.deliveryMode, Config.ALLOWED_OPTIONS.DELIVERY_MODES)) {
      errors.push('Invalid learning delivery mode selected.');
    }
    if (data.institution && String(data.institution).trim().length > 200) {
      errors.push('Institution field exceeds maximum allowed length (200 chars).');
    }
    if (data.comments && String(data.comments).length > 1500) {
      errors.push('Comments exceed maximum allowed length (1500 chars).');
    }

    if (errors.length > 0) {
      throw this.createError('VALIDATION_ERROR', errors.join(' '));
    }
  },

  /**
   * Validate contact message payload
   */
  validateContact: function(data) {
    if (!data || typeof data !== 'object') {
      throw this.createError('VALIDATION_ERROR', 'Invalid contact payload.');
    }
    this.assertNoBotHoneypot(data);

    var errors = [];
    var fullName = this.sanitizeText(data.fullName, 100, false);
    if (fullName.length < 2) {
      errors.push('Full name must be between 2 and 100 characters.');
    }
    if (!this.isValidEmail(data.email)) {
      errors.push('A valid email address is required.');
    }
    if (data.phone && String(data.phone).trim().length > 0 && !this.isValidPhone(data.phone)) {
      errors.push('Phone number format is invalid.');
    }
    if (data.organization && String(data.organization).trim().length > 150) {
      errors.push('Organization name exceeds 150 characters.');
    }
    if (data.inquiryType && !this.isAllowedOption(data.inquiryType, Config.ALLOWED_OPTIONS.INQUIRY_TYPES)) {
      errors.push('Invalid inquiry type selected.');
    }
    var subject = this.sanitizeText(data.subject, 160, false);
    if (subject.length > 0 && subject.length < 2) {
      errors.push('Subject must be at least 2 characters.');
    }
    var message = this.sanitizeText(data.message, 2500, true);
    if (message.length < 5) {
      errors.push('Message must contain between 5 and 2500 characters.');
    }

    if (errors.length > 0) {
      throw this.createError('VALIDATION_ERROR', errors.join(' '));
    }
  },

  /**
   * Validate quote request payload
   */
  validateQuote: function(data) {
    if (!data || typeof data !== 'object') {
      throw this.createError('VALIDATION_ERROR', 'Invalid quote request payload.');
    }
    this.assertNoBotHoneypot(data);

    var errors = [];
    var fullName = this.sanitizeText(data.fullName, 100, false);
    if (fullName.length < 2) {
      errors.push('Full contact name must be between 2 and 100 characters.');
    }
    if (!this.isValidEmail(data.workEmail)) {
      errors.push('A valid work email is required.');
    }
    if (data.phone && String(data.phone).trim().length > 0 && !this.isValidPhone(data.phone)) {
      errors.push('A valid contact phone number is required.');
    }
    var companyName = this.sanitizeText(data.companyName, 150, false);
    if (companyName.length < 2) {
      errors.push('Company / organization name is required (max 150 characters).');
    }
    var serviceRequired = this.sanitizeText(data.serviceRequired, 150, false);
    if (serviceRequired.length < 2) {
      errors.push('Please specify the service required.');
    }
    if (data.budgetRange && !this.isAllowedOption(data.budgetRange, Config.ALLOWED_OPTIONS.BUDGET_RANGES)) {
      errors.push('Invalid budget range option.');
    }
    if (data.targetTimeline && !this.isAllowedOption(data.targetTimeline, Config.ALLOWED_OPTIONS.TARGET_TIMELINES)) {
      errors.push('Invalid target timeline option.');
    }
    if (data.requirements && String(data.requirements).length > 3000) {
      errors.push('Project requirements exceed maximum length (3000 chars).');
    }

    if (errors.length > 0) {
      throw this.createError('VALIDATION_ERROR', errors.join(' '));
    }
  },

  /**
   * Validate job application payload
   */
  validateJobApplication: function(data) {
    if (!data || typeof data !== 'object') {
      throw this.createError('VALIDATION_ERROR', 'Invalid job application payload.');
    }
    this.assertNoBotHoneypot(data);

    var errors = [];
    var fullName = this.sanitizeText(data.fullName, 100, false);
    if (fullName.length < 2) {
      errors.push('Full candidate name must be between 2 and 100 characters.');
    }
    if (!this.isValidEmail(data.email)) {
      errors.push('A valid candidate email is required.');
    }
    if (data.phone && String(data.phone).trim().length > 0 && !this.isValidPhone(data.phone)) {
      errors.push('Candidate phone number format is invalid.');
    }
    var roleApplied = this.sanitizeText(data.roleApplied || data.position, 120, false);
    if (roleApplied.length < 2) {
      errors.push('Please specify the position applied for.');
    }
    if (data.department && String(data.department).trim().length > 100) {
      errors.push('Department exceeds 100 characters.');
    }
    var exp = data.experienceYears !== undefined ? String(data.experienceYears).trim() : (data.experience !== undefined ? String(data.experience).trim() : '');
    if (exp && !this.isAllowedOption(exp, Config.ALLOWED_OPTIONS.EXPERIENCE_LEVELS)) {
      errors.push('Invalid experience level selection.');
    }
    if (data.linkedinUrl && String(data.linkedinUrl).trim().length > 0 && !this.isValidSafeUrl(data.linkedinUrl)) {
      errors.push('LinkedIn / Profile URL must be a valid HTTP/HTTPS link.');
    }
    if (data.portfolioUrl && String(data.portfolioUrl).trim().length > 0 && !this.isValidSafeUrl(data.portfolioUrl)) {
      errors.push('Portfolio URL must be a valid HTTP/HTTPS link.');
    }
    if (data.coverNote && String(data.coverNote).length > 2500) {
      errors.push('Cover note exceeds maximum allowed length (2500 chars).');
    }

    if (errors.length > 0) {
      throw this.createError('VALIDATION_ERROR', errors.join(' '));
    }
  },

  /**
   * Validate administrative status transition & notes
   */
  validateStatusUpdate: function(id, idPrefix, currentStatus, newStatus, allowedStatuses, adminNotes, actorRole) {
    if (!this.isValidRecordId(id, idPrefix)) {
      throw this.createError('VALIDATION_ERROR', 'Invalid record identifier.');
    }
    if (!newStatus || typeof newStatus !== 'string' || allowedStatuses.indexOf(newStatus) === -1) {
      throw this.createError('VALIDATION_ERROR', 'Invalid status value specified.');
    }
    if (
      Config.TERMINAL_STATUSES.indexOf(currentStatus) !== -1 &&
      newStatus !== currentStatus &&
      actorRole !== Config.ROLES.SUPER_ADMIN
    ) {
      throw this.createError('FORBIDDEN', 'Terminal records (' + currentStatus + ') can only be reopened by a Super Admin.');
    }
    if (adminNotes !== undefined && adminNotes !== null && String(adminNotes).length > 1000) {
      throw this.createError('VALIDATION_ERROR', 'Admin notes cannot exceed 1000 characters.');
    }
  },

  /**
   * Validate program catalog save payload
   */
  validateProgramData: function(data) {
    if (!data || typeof data !== 'object') {
      throw this.createError('VALIDATION_ERROR', 'Invalid program payload.');
    }
    var title = this.sanitizeText(data.title, 150, false);
    if (title.length < 3) {
      throw this.createError('VALIDATION_ERROR', 'Program title must be between 3 and 150 characters.');
    }
    if (data.id && !/^[A-Za-z0-9\-]{3,40}$/.test(String(data.id))) {
      throw this.createError('VALIDATION_ERROR', 'Invalid program ID format.');
    }
    if (data.slug && !/^[a-z0-9\-]{2,120}$/.test(String(data.slug))) {
      throw this.createError('VALIDATION_ERROR', 'Program slug may only contain lowercase letters, numbers, and hyphens.');
    }
  }
};
