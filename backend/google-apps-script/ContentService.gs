/**
 * AEGIS ACADEMY - CONTENT SERVICE (Google Apps Script)
 * Manages CRUD operations for Programs, Projects, and Events.
 */

var ContentService = (function() {
  var PROGRAM_HEADERS = [
    'id', 'slug', 'title', 'code', 'division', 'level', 'duration',
    'badge', 'overview', 'curriculumJson', 'toolsJson', 'outcomesJson',
    'prerequisites', 'certification', 'active', 'displayOrder', 'createdAt', 'updatedAt'
  ];

  var PROJECT_HEADERS = [
    'id', 'slug', 'title', 'category', 'clientType', 'industry',
    'summary', 'description', 'techStackJson', 'deliverablesJson',
    'metricsJson', 'featured', 'active', 'createdAt', 'updatedAt'
  ];

  var EVENT_HEADERS = [
    'id', 'slug', 'title', 'category', 'date', 'time', 'location',
    'mode', 'speaker', 'description', 'registrationUrl', 'capacity',
    'registeredCount', 'status', 'active', 'createdAt', 'updatedAt'
  ];

  /**
   * Programs
   */
  function listPrograms(onlyActive) {
    var records = Database.getAllRecords(Config.SHEETS.PROGRAMS, PROGRAM_HEADERS);
    if (onlyActive !== false) {
      return records.filter(function(r) { return r.active === true || r.active === 'true' || r.active === 1; });
    }
    return records;
  }

  function getProgramBySlug(slug) {
    return Database.getRecordById(Config.SHEETS.PROGRAMS, PROGRAM_HEADERS, 'slug', slug);
  }

  function saveProgram(data) {
    var id = data.id || ('PRG-' + Utilities.getUuid().substring(0, 8).toUpperCase());
    var nowIso = new Date().toISOString();
    var existing = Database.getRecordById(Config.SHEETS.PROGRAMS, PROGRAM_HEADERS, 'id', id);

    var record = {
      id: id,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: data.title,
      code: data.code || 'AEG-PRG',
      division: data.division || 'College Programs',
      level: data.level || 'Intermediate',
      duration: data.duration || '12 Weeks',
      badge: data.badge || '',
      overview: data.overview || '',
      curriculumJson: typeof data.curriculum === 'string' ? data.curriculum : JSON.stringify(data.curriculum || []),
      toolsJson: typeof data.tools === 'string' ? data.tools : JSON.stringify(data.tools || []),
      outcomesJson: typeof data.outcomes === 'string' ? data.outcomes : JSON.stringify(data.outcomes || []),
      prerequisites: data.prerequisites || '',
      certification: data.certification || 'Aegis Verified Industry Credential',
      active: data.active !== undefined ? data.active : true,
      displayOrder: data.displayOrder || 1,
      updatedAt: nowIso
    };

    if (existing) {
      record.createdAt = existing.createdAt;
      Database.updateRecord(Config.SHEETS.PROGRAMS, PROGRAM_HEADERS, 'id', id, record);
    } else {
      record.createdAt = nowIso;
      Database.appendRecord(Config.SHEETS.PROGRAMS, PROGRAM_HEADERS, record);
    }

    return { success: true, programId: id };
  }

  /**
   * Projects
   */
  function listProjects(onlyActive) {
    var records = Database.getAllRecords(Config.SHEETS.PROJECTS, PROJECT_HEADERS);
    if (onlyActive !== false) {
      return records.filter(function(r) { return r.active === true || r.active === 'true' || r.active === 1; });
    }
    return records;
  }

  function getProjectBySlug(slug) {
    return Database.getRecordById(Config.SHEETS.PROJECTS, PROJECT_HEADERS, 'slug', slug);
  }

  /**
   * Events
   */
  function listEvents(onlyActive) {
    var records = Database.getAllRecords(Config.SHEETS.EVENTS, EVENT_HEADERS);
    if (onlyActive !== false) {
      return records.filter(function(r) { return r.active === true || r.active === 'true' || r.active === 1; });
    }
    return records;
  }

  return {
    PROGRAM_HEADERS: PROGRAM_HEADERS,
    PROJECT_HEADERS: PROJECT_HEADERS,
    EVENT_HEADERS: EVENT_HEADERS,
    listPrograms: listPrograms,
    getProgramBySlug: getProgramBySlug,
    saveProgram: saveProgram,
    listProjects: listProjects,
    getProjectBySlug: getProjectBySlug,
    listEvents: listEvents
  };
})();
