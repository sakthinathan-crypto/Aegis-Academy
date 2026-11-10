/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: Validation.gs
 * Description: Server-side input validation, sanitization, and formula injection protection.
 * ============================================================================
 */

var Validation = {
  /**
   * Sanitizes string to prevent CSV / Google Sheet Formula Injection (=, +, -, @)
   */
  sanitizeFormula: function(val) {
    if (typeof val !== 'string') return val;
    var trimmed = val.trim();
    if (trimmed.length > 0 && ('=+@-'.indexOf(trimmed.charAt(0)) !== -1)) {
      // Prefix with apostrophe so Google Sheets treats it as plain text literal
      return "'" + trimmed;
    }
    return trimmed;
  },

  /**
   * Validates email format
   */
  isValidEmail: function(email) {
    if (!email || typeof email !== 'string') return false;
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim()) && email.length <= 150;
  },

  /**
   * Validates phone format
   */
  isValidPhone: function(phone) {
    if (!phone || typeof phone !== 'string') return false;
    var clean = phone.replace(/[\s\-\(\)\+]/g, '');
    return clean.length >= 7 && clean.length <= 16 && /^\d+$/.test(clean);
  },

  /**
   * Validate student enrollment payload
   */
  validateEnrollment: function(data) {
    var errors = [];
    if (!data.fullName || String(data.fullName).trim().length < 2) {
      errors.push('Full name must be at least 2 characters.');
    }
    if (!this.isValidEmail(data.email)) {
      errors.push('A valid email address is required.');
    }
    if (!this.isValidPhone(data.phone)) {
      errors.push('A valid phone number is required.');
    }
    if (!data.programTitle || String(data.programTitle).trim().length < 2) {
      errors.push('A target program must be selected.');
    }
    if (errors.length > 0) {
      var err = new Error(errors.join(' '));
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
  },

  /**
   * Validate contact message payload
   */
  validateContact: function(data) {
    var errors = [];
    if (!data.fullName || String(data.fullName).trim().length < 2) {
      errors.push('Full name is required.');
    }
    if (!this.isValidEmail(data.email)) {
      errors.push('A valid email address is required.');
    }
    if (!data.message || String(data.message).trim().length < 5) {
      errors.push('Message must contain at least 5 characters.');
    }
    if (errors.length > 0) {
      var err = new Error(errors.join(' '));
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
  },

  /**
   * Validate quote request payload
   */
  validateQuote: function(data) {
    var errors = [];
    if (!data.fullName || String(data.fullName).trim().length < 2) {
      errors.push('Full contact name is required.');
    }
    if (!this.isValidEmail(data.workEmail)) {
      errors.push('A valid work email is required.');
    }
    if (!data.companyName || String(data.companyName).trim().length < 2) {
      errors.push('Company / organization name is required.');
    }
    if (!data.serviceRequired) {
      errors.push('Please specify the service required.');
    }
    if (errors.length > 0) {
      var err = new Error(errors.join(' '));
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
  },

  /**
   * Validate job application payload
   */
  validateJobApplication: function(data) {
    var errors = [];
    if (!data.fullName || String(data.fullName).trim().length < 2) {
      errors.push('Full candidate name is required.');
    }
    if (!this.isValidEmail(data.email)) {
      errors.push('A valid candidate email is required.');
    }
    if (!data.roleApplied) {
      errors.push('Please specify the position applied for.');
    }
    if (errors.length > 0) {
      var err = new Error(errors.join(' '));
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
  }
};
