/**
 * AEGIS ACADEMY - EMAIL SERVICE (Google Apps Script)
 * Sends branded, responsive HTML notifications using Google Apps Script MailApp
 * with strict HTML escaping, header-injection neutralization, recipient validation,
 * and MailApp quota protection.
 */

var EmailService = (function() {
  var BRAND_NAME = 'Aegis Academy';
  var SENDER_NAME = 'Aegis Academy Admissions & Corporate Portal';
  var SUPPORT_EMAIL = 'support@aegisacademy.in';
  var WEBSITE_URL = 'https://www.aegisacademy.in';

  function esc(val) {
    return Validation.escapeHtml(val === undefined || val === null ? '' : String(val));
  }

  function safeSubject(val) {
    return Validation.sanitizeHeaderValue(val, 180);
  }

  function hasMailQuota() {
    try {
      var remaining = MailApp.getRemainingDailyQuota();
      return remaining > Config.SECURITY.MIN_MAIL_QUOTA_RESERVE;
    } catch (e) {
      return true;
    }
  }

  function sendValidatedEmail(to, subject, htmlBody, senderName) {
    if (!Validation.isValidEmail(to)) {
      Logger.log('Email skipped: invalid recipient address.');
      return;
    }
    if (!hasMailQuota()) {
      Logger.log('Email skipped: MailApp remaining daily quota reached safety reserve.');
      return;
    }
    MailApp.sendEmail({
      to: Validation.sanitizeHeaderValue(to, 150),
      name: Validation.sanitizeHeaderValue(senderName || SENDER_NAME, 100),
      subject: safeSubject(subject),
      htmlBody: htmlBody
    });
  }

  /**
   * Base HTML layout wrapping email content (existing design preserved)
   */
  function wrapTemplate(title, preheader, bodyHtml) {
    return '<!DOCTYPE html>' +
      '<html>' +
      '<head>' +
      '<meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '<title>' + esc(title) + '</title>' +
      '<style>' +
      'body { margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1e293b; }' +
      '.container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }' +
      '.header { background: linear-gradient(135deg, #020617 0%, #061434 60%, #0052CC 100%); padding: 36px 30px; text-align: center; }' +
      '.brand { color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; }' +
      '.tagline { color: #38BDF8; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 6px; }' +
      '.content { padding: 36px 32px; font-size: 14px; line-height: 1.6; color: #334155; }' +
      '.id-badge { display: inline-block; background-color: #EAF1FA; border: 1px solid #C9D9EC; color: #0052CC; font-weight: 700; font-family: monospace; font-size: 15px; padding: 8px 16px; border-radius: 8px; margin: 12px 0; }' +
      '.info-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }' +
      '.info-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; word-break: break-word; }' +
      '.info-table td.label { font-weight: 600; color: #64748b; width: 35%; }' +
      '.info-table td.val { color: #0f172a; font-weight: 500; }' +
      '.btn { display: inline-block; background: linear-gradient(135deg, #0052CC 0%, #0077FE 100%); color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 10px; margin: 20px 0; text-align: center; }' +
      '.footer { background-color: #f8fafc; padding: 24px 30px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }' +
      '</style>' +
      '</head>' +
      '<body>' +
      '<div style="display:none;font-size:1px;color:#333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">' + esc(preheader) + '</div>' +
      '<div class="container">' +
      '<div class="header">' +
      '<h1 class="brand">' + esc(BRAND_NAME.toUpperCase()) + '</h1>' +
      '<div class="tagline">Empowering Minds • Engineering Futures</div>' +
      '</div>' +
      '<div class="content">' +
      bodyHtml +
      '</div>' +
      '<div class="footer">' +
      '<p style="margin: 0 0 6px 0;">© ' + new Date().getFullYear() + ' Aegis Academy Pvt. Ltd. All rights reserved.</p>' +
      '<p style="margin: 0;">Chennai & Coimbatore, Tamil Nadu, India • <a href="' + WEBSITE_URL + '" style="color: #0077FE; text-decoration: none;">www.aegisacademy.in</a></p>' +
      '</div>' +
      '</div>' +
      '</body>' +
      '</html>';
  }

  /**
   * 1. Send Enrollment Confirmation to Student
   */
  function sendEnrollmentConfirmation(record) {
    if (!record || !Validation.isValidEmail(record.email)) return;

    var preferredBatch = record.preferredBatch || 'Upcoming Intake';
    var title = 'Enrollment Received - ' + record.enrollmentId;
    var preheader = 'Thank you for enrolling in ' + record.programTitle + ' at Aegis Academy.';

    var body = '<h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Welcome, ' + esc(record.fullName) + '!</h2>' +
      '<p>Thank you for submitting your enrollment request for <strong>' + esc(record.programTitle) + '</strong> at Aegis Academy. Our admissions academic advisory board has received your profile.</p>' +
      '<p>Your official application reference ID is:</p>' +
      '<div style="text-align: center;"><div class="id-badge">' + esc(record.enrollmentId) + '</div></div>' +
      '<table class="info-table">' +
      '<tr><td class="label">Program</td><td class="val">' + esc(record.programTitle) + ' (' + esc(record.programCode) + ')</td></tr>' +
      '<tr><td class="label">Division</td><td class="val">' + esc(record.programDivision) + '</td></tr>' +
      '<tr><td class="label">Delivery Mode</td><td class="val">' + esc(record.deliveryMode) + '</td></tr>' +
      '<tr><td class="label">Preferred Batch</td><td class="val">' + esc(preferredBatch) + '</td></tr>' +
      '<tr><td class="label">Application Status</td><td class="val"><span style="color: #0052CC; font-weight: 700;">' + esc(record.status) + '</span></td></tr>' +
      '</table>' +
      '<h3 style="color: #0f172a; font-size: 15px; margin-top: 24px;">Next Steps:</h3>' +
      '<ol style="padding-left: 20px; line-height: 1.8;">' +
      '<li>An academic advisor will review your eligibility and contact you via phone/WhatsApp within 24 business hours.</li>' +
      '<li>You will receive your batch onboarding schedule, access credentials for the Applied AI Labs, and fee structure details.</li>' +
      '<li>Keep your reference ID (<strong>' + esc(record.enrollmentId) + '</strong>) handy for all future correspondence.</li>' +
      '</ol>' +
      '<p style="margin-top: 24px;">Have questions right away? Reply directly to this email or reach us at <a href="mailto:' + SUPPORT_EMAIL + '" style="color: #0077FE;">' + SUPPORT_EMAIL + '</a>.</p>';

    var htmlBody = wrapTemplate(title, preheader, body);

    sendValidatedEmail(
      record.email,
      'Enrollment Received: ' + record.programTitle + ' [' + record.enrollmentId + ']',
      htmlBody
    );
  }

  /**
   * 2. Send Contact Message Acknowledgment
   */
  function sendContactAcknowledgment(record) {
    if (!record || !Validation.isValidEmail(record.email)) return;

    var title = 'Message Received - ' + record.messageId;
    var preheader = 'We have received your message and will respond shortly.';

    var body = '<h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Hello ' + esc(record.fullName) + ',</h2>' +
      '<p>Thank you for reaching out to Aegis Academy. Your message regarding <strong>' + esc(record.subject) + '</strong> has been logged in our system.</p>' +
      '<div style="text-align: center;"><div class="id-badge">' + esc(record.messageId) + '</div></div>' +
      '<table class="info-table">' +
      '<tr><td class="label">Inquiry Type</td><td class="val">' + esc(record.inquiryType) + '</td></tr>' +
      '<tr><td class="label">Subject</td><td class="val">' + esc(record.subject) + '</td></tr>' +
      '<tr><td class="label">Status</td><td class="val"><span style="color: #0052CC; font-weight: 700;">' + esc(record.status) + '</span></td></tr>' +
      '</table>' +
      '<p>Our team typically responds to inquiries within 12 to 24 business hours.</p>';

    var htmlBody = wrapTemplate(title, preheader, body);

    sendValidatedEmail(
      record.email,
      'We Received Your Message [' + record.messageId + '] - Aegis Academy',
      htmlBody
    );
  }

  /**
   * 3. Send Enterprise Quote Acknowledgment
   */
  function sendQuoteAcknowledgment(record) {
    var recipient = record ? (record.workEmail || record.email) : '';
    if (!Validation.isValidEmail(recipient)) return;

    var orgDisplay = record.companyType ? (record.companyName + ' (' + record.companyType + ')') : record.companyName;
    var title = 'Enterprise Quote Request - ' + record.quoteId;
    var preheader = 'Your enterprise proposal request has been received.';

    var body = '<h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Hello ' + esc(record.fullName) + ',</h2>' +
      '<p>Thank you for considering Aegis Academy for your enterprise engineering and institutional training needs. We have received your request for <strong>' + esc(record.companyName) + '</strong>.</p>' +
      '<div style="text-align: center;"><div class="id-badge">' + esc(record.quoteId) + '</div></div>' +
      '<table class="info-table">' +
      '<tr><td class="label">Organization</td><td class="val">' + esc(orgDisplay) + '</td></tr>' +
      '<tr><td class="label">Service Required</td><td class="val">' + esc(record.serviceRequired) + '</td></tr>' +
      '<tr><td class="label">Estimated Budget</td><td class="val">' + esc(record.budgetRange || 'To be scoped') + '</td></tr>' +
      '<tr><td class="label">Target Timeline</td><td class="val">' + esc(record.targetTimeline || 'Flexible') + '</td></tr>' +
      '</table>' +
      '<p>Our Enterprise Solutions Director will review your specifications and schedule a discovery consultation with you shortly.</p>';

    var htmlBody = wrapTemplate(title, preheader, body);

    sendValidatedEmail(
      recipient,
      'Proposal Request Received: ' + record.companyName + ' [' + record.quoteId + ']',
      htmlBody
    );
  }

  /**
   * 4. Send Job Application Receipt
   */
  function sendApplicationReceiptEmail(record) {
    if (!record || !Validation.isValidEmail(record.email)) return;

    var roleTitle = record.position || record.roleApplied || 'Fellowship / Role';
    var expYears = record.experience || record.experienceYears || '0';
    var title = 'Application Received - ' + record.applicationId;
    var preheader = 'Thank you for applying for ' + roleTitle + ' at Aegis Academy.';

    var body = '<h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Hello ' + esc(record.fullName) + ',</h2>' +
      '<p>Thank you for your interest in joining the Aegis Academy team. Your application for <strong>' + esc(roleTitle) + '</strong> has been safely received.</p>' +
      '<div style="text-align: center;"><div class="id-badge">' + esc(record.applicationId) + '</div></div>' +
      '<table class="info-table">' +
      '<tr><td class="label">Role Applied</td><td class="val">' + esc(roleTitle) + '</td></tr>' +
      '<tr><td class="label">Department</td><td class="val">' + esc(record.department) + '</td></tr>' +
      '<tr><td class="label">Experience</td><td class="val">' + esc(expYears) + ' years</td></tr>' +
      '<tr><td class="label">Status</td><td class="val"><span style="color: #0052CC; font-weight: 700;">' + esc(record.status) + '</span></td></tr>' +
      '</table>' +
      '<p>Our talent acquisition team evaluates candidates on a rolling basis. If your profile aligns with our current engineering or academic initiatives, we will reach out to schedule an introductory conversation.</p>';

    var htmlBody = wrapTemplate(title, preheader, body);

    sendValidatedEmail(
      record.email,
      'Application Received: ' + roleTitle + ' [' + record.applicationId + ']',
      htmlBody
    );
  }

  /**
   * 5. Send Internal Team Alert (All dynamic keys/values escaped; sensitive keys excluded)
   */
  function sendTeamAlertEmail(subject, data) {
    var adminEmail = Config.getNotificationEmail();
    if (!Validation.isValidEmail(adminEmail)) return;

    var excludedKeys = ['adminNotes', 'resumeFileId', 'token', 'password', 'passwordHash', 'salt', 'base64'];
    var rows = '';
    for (var key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
      if (excludedKeys.indexOf(key) !== -1) continue;
      if (typeof data[key] !== 'object' && data[key] !== undefined && data[key] !== null) {
        var strVal = String(data[key]);
        if (strVal.length > 0 && strVal.length <= 500) {
          rows += '<tr><td style="font-weight:600;padding:6px;border-bottom:1px solid #eee;">' +
            esc(key) +
            '</td><td style="padding:6px;border-bottom:1px solid #eee;word-break:break-word;">' +
            esc(strVal) +
            '</td></tr>';
        }
      }
    }

    var safeAlertTitle = esc(subject);
    var html = '<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #e2e8f0;border-radius:8px;">' +
      '<h2 style="color:#0052CC;margin-top:0;">' + safeAlertTitle + '</h2>' +
      '<p>A new event has occurred in the Aegis Academy platform:</p>' +
      '<table style="width:100%;border-collapse:collapse;font-size:13px;">' + rows + '</table>' +
      '<p style="margin-top:20px;font-size:12px;color:#888;">Visit the Admin Dashboard to manage this record.</p>' +
      '</div>';

    sendValidatedEmail(
      adminEmail,
      '[AEGIS ALERT] ' + subject,
      html,
      'Aegis System Notifier'
    );
  }

  return {
    sendEnrollmentConfirmation: sendEnrollmentConfirmation,
    sendContactAcknowledgment: sendContactAcknowledgment,
    sendQuoteAcknowledgment: sendQuoteAcknowledgment,
    sendApplicationReceiptEmail: sendApplicationReceiptEmail,
    sendTeamAlertEmail: sendTeamAlertEmail
  };
})();
