/**
 * AEGIS ACADEMY - CONTENT SERVICE (Google Apps Script)
 * Manages CRUD operations for Programs, Projects, and Events with validation.
 */

var CatalogContentService = (function() {
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

  function saveProgram(data, userEmail) {
    Validation.validateProgramData(data);

    var id = data.id ? Validation.sanitizeText(data.id, 40, false) : ('PRG-' + Utilities.getUuid().substring(0, 8).toUpperCase());
    var nowIso = new Date().toISOString();
    var existing = Database.getRecordById(Config.SHEETS.PROGRAMS, PROGRAM_HEADERS, 'id', id);

    var cleanTitle = Validation.sanitizeText(data.title, 150, false);
    var cleanSlug = data.slug
      ? Validation.sanitizeText(data.slug, 120, false)
      : cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    var record = {
      id: id,
      slug: cleanSlug,
      title: cleanTitle,
      code: Validation.sanitizeText(data.code || 'AEG-PRG', 30, false),
      division: Validation.sanitizeText(data.division || 'College Programs', 60, false),
      level: Validation.sanitizeText(data.level || 'Intermediate', 40, false),
      duration: Validation.sanitizeText(data.duration || '12 Weeks', 40, false),
      badge: Validation.sanitizeText(data.badge || '', 40, false),
      overview: Validation.sanitizeText(data.overview || '', 3000, true),
      curriculumJson: typeof data.curriculum === 'string' ? data.curriculum.substring(0, 15000) : JSON.stringify(data.curriculum || []),
      toolsJson: typeof data.tools === 'string' ? data.tools.substring(0, 5000) : JSON.stringify(data.tools || []),
      outcomesJson: typeof data.outcomes === 'string' ? data.outcomes.substring(0, 5000) : JSON.stringify(data.outcomes || []),
      prerequisites: Validation.sanitizeText(data.prerequisites || '', 500, true),
      certification: Validation.sanitizeText(data.certification || 'Aegis Verified Industry Credential', 150, false),
      active: data.active !== undefined ? Boolean(data.active) : true,
      displayOrder: typeof data.displayOrder === 'number' && isFinite(data.displayOrder) ? data.displayOrder : 1,
      updatedAt: nowIso
    };

    if (existing) {
      record.createdAt = existing.createdAt;
      Database.updateRecord(Config.SHEETS.PROGRAMS, PROGRAM_HEADERS, 'id', id, record);
    } else {
      record.createdAt = nowIso;
      Database.appendRecord(Config.SHEETS.PROGRAMS, PROGRAM_HEADERS, record);
    }

    Database.logActivity('PROGRAM_SAVED', 'Program catalog updated: ' + id, { programId: id }, userEmail);

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
