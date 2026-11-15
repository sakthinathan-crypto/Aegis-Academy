/**
 * AEGIS ACADEMY - ADMIN SERVICE (Google Apps Script)
 * Aggregates live KPI metrics and role-filtered administrative overview from sheets.
 */

var AdminService = (function() {
  /**
   * Calculate live KPI metrics across all sheets; gate activity logs to permitted roles
   */
  function getDashboardOverview(userRole) {
    var enrollments = Database.getAllRecords(Config.SHEETS.ENROLLMENTS, EnrollmentService.HEADERS);
    var contacts = Database.getAllRecords(Config.SHEETS.CONTACT_MESSAGES, ContactService.HEADERS);
    var quotes = Database.getAllRecords(Config.SHEETS.QUOTE_REQUESTS, QuoteService.HEADERS);
    var applications = Database.getAllRecords(Config.SHEETS.JOB_APPLICATIONS, CareerService.HEADERS);

    var pendingEnrollments = enrollments.filter(function(r) {
      return r.status === 'Submitted' || r.status === 'Pending' || r.status === 'Under Review';
    }).length;
    var approvedEnrollments = enrollments.filter(function(r) {
      return r.status === 'Approved' || r.status === 'Enrolled';
    }).length;

    var newContacts = contacts.filter(function(r) {
      return r.status === 'New' || r.status === 'Unread';
    }).length;
    var openQuotes = quotes.filter(function(r) {
      return r.status === 'Submitted' || r.status === 'New' || r.status === 'Under Review' || r.status === 'Reviewing' || r.status === 'Proposal Sent' || r.status === 'Quoted';
    }).length;
    var pendingApplications = applications.filter(function(r) {
      return r.status === 'Submitted' || r.status === 'Under Review';
    }).length;

    var recentLogs = [];
    if (AuthService.roleHasPermission(userRole, 'view_logs')) {
      var logs = Database.getAllRecords(Config.SHEETS.ACTIVITY_LOGS, Database.ACTIVITY_HEADERS);
      recentLogs = logs.slice(-20).reverse();
    }

    return {
      success: true,
      metrics: {
        totalEnrollments: enrollments.length,
        pendingEnrollments: pendingEnrollments,
        approvedEnrollments: approvedEnrollments,
        totalContacts: contacts.length,
        newContacts: newContacts,
        totalQuotes: quotes.length,
        openQuotes: openQuotes,
        totalApplications: applications.length,
        pendingApplications: pendingApplications
      },
      recentActivity: recentLogs,
      generatedAt: new Date().toISOString()
    };
  }

  return {
    getDashboardOverview: getDashboardOverview
  };
})();
