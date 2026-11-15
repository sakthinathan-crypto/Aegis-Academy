/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: AuthService.gs
 * Description: Constant-time multi-round password derivation, brute-force
 * rate-limited authentication without account enumeration, strict HMAC-SHA256
 * session tokens with revocation & live Admin_Users verification, and RBAC.
 * ============================================================================
 */

var AuthService = {
  HEADERS: ['userId', 'email', 'name', 'passwordHash', 'salt', 'role', 'active', 'createdAt', 'lastLoginAt'],

  /**
   * Constant-time string comparison to mitigate timing side-channels
   */
  constantTimeEqual: function(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return false;
    var maxLen = Math.max(a.length, b.length);
    var diff = a.length ^ b.length;
    for (var i = 0; i < maxLen; i++) {
      var codeA = i < a.length ? a.charCodeAt(i) : 0;
      var codeB = i < b.length ? b.charCodeAt(i) : 0;
      diff |= (codeA ^ codeB);
    }
    return diff === 0;
  },

  /**
   * Multi-iteration key derivation function (1,000 rounds of HMAC-SHA256)
   */
  hashPassword: function(password, salt) {
    if (!password || !salt) throw new Error('Password and salt are required.');
    var derived = String(salt) + String(password);
    var secret = Config.getAdminSecretKey();

    for (var i = 0; i < 1000; i++) {
      var sig = Utilities.computeHmacSha256Signature(derived + ':' + i, secret);
      derived = Utilities.base64Encode(sig);
    }
    return derived;
  },

  /**
   * Generates a 16-character cryptographically unique hex salt
   */
  generateSalt: function() {
    return Utilities.getUuid().replace(/-/g, '').substring(0, 16);
  },

  /**
   * Decode Base64WebSafe segment cleanly to UTF-8 string
   */
  decodeBase64UrlToString: function(segment) {
    var bytes = Utilities.base64DecodeWebSafe(segment);
    return Utilities.newBlob(bytes).getDataAsString('UTF-8');
  },

  /**
   * Verify user exists, is active, and retrieve authoritative role from Admin_Users
   */
  getAuthoritativeActiveAdmin: function(userId, email) {
    var users = Database.getAllRecords(Config.SHEETS.ADMIN_USERS, this.HEADERS, { userId: String(userId) });
    if (!users || users.length === 0) return null;

    var user = users[0];
    var isActive = user.active === true || user.active === 'true' || user.active === 1;
    if (!isActive) return null;

    var sheetEmail = String(user.email || '').trim().toLowerCase();
    var tokenEmail = String(email || '').trim().toLowerCase();
    if (!sheetEmail || sheetEmail !== tokenEmail) return null;

    var role = String(user.role || '');
    if (!Config.PERMISSIONS[role]) return null;

    return {
      userId: String(user.userId),
      email: sheetEmail,
      name: String(user.name || ''),
      role: role
    };
  },

  /**
   * Create signed HMAC-SHA256 session token with strict claims and JTI
   */
  createToken: function(payload) {
    if (!payload || !payload.userId || !payload.email || !payload.role) {
      throw new Error('Token payload requires userId, email, and role.');
    }
    if (!Config.PERMISSIONS[payload.role]) {
      throw new Error('Invalid administrative role.');
    }

    var secret = Config.getAdminSecretKey();
    var now = Date.now();
    var exp = now + Config.SECURITY.TOKEN_TTL_MS;

    var headerObj = { alg: 'HS256', typ: 'JWT' };
    var claims = {
      iss: Config.SECURITY.TOKEN_ISSUER,
      sub: String(payload.userId),
      jti: Utilities.getUuid(),
      userId: String(payload.userId),
      email: String(payload.email).trim().toLowerCase(),
      name: String(payload.name || ''),
      role: String(payload.role),
      iat: now,
      exp: exp
    };

    var header = Utilities.base64EncodeWebSafe(JSON.stringify(headerObj));
    var body = Utilities.base64EncodeWebSafe(JSON.stringify(claims));
    var signature = Utilities.computeHmacSha256Signature(header + '.' + body, secret);
    var sigBase64 = Utilities.base64EncodeWebSafe(signature);
    return header + '.' + body + '.' + sigBase64;
  },

  /**
   * Strictly verify signed session token, claims, revocation, and live DB status
   */
  verifyToken: function(token) {
    if (!token || typeof token !== 'string') return null;
    if (token.length < 30 || token.length > Config.SECURITY.MAX_TOKEN_LENGTH) return null;

    var parts = token.split('.');
    if (parts.length !== 3) return null;

    var header = parts[0];
    var body = parts[1];
    var sig = parts[2];
    var segRegex = /^[A-Za-z0-9\-_=]+$/;
    if (!segRegex.test(header) || !segRegex.test(body) || !segRegex.test(sig)) {
      return null;
    }

    var secret = Config.getAdminSecretKey();
    var expectedSig = Utilities.base64EncodeWebSafe(
      Utilities.computeHmacSha256Signature(header + '.' + body, secret)
    );
    if (!this.constantTimeEqual(sig, expectedSig)) return null;

    try {
      var headerObj = JSON.parse(this.decodeBase64UrlToString(header));
      if (!headerObj || headerObj.alg !== 'HS256' || headerObj.typ !== 'JWT') {
        return null;
      }

      var payload = JSON.parse(this.decodeBase64UrlToString(body));
      if (!payload || typeof payload !== 'object') return null;

      // Require strict issuer, subject, jti, and numeric iat/exp claims
      if (payload.iss !== Config.SECURITY.TOKEN_ISSUER) return null;
      if (typeof payload.jti !== 'string' || payload.jti.length < 8) return null;
      if (typeof payload.iat !== 'number' || !isFinite(payload.iat)) return null;
      if (typeof payload.exp !== 'number' || !isFinite(payload.exp)) return null;
      if (payload.exp <= payload.iat) return null;
      if ((payload.exp - payload.iat) > (Config.SECURITY.TOKEN_TTL_MS + 60000)) return null;

      var now = Date.now();
      if (now > payload.exp) return null; // Expired
      if (payload.iat > now + 60000) return null; // Future-dated beyond 60s skew

      if (typeof payload.userId !== 'string' || !payload.userId) return null;
      if (!Validation.isValidEmail(payload.email)) return null;
      if (typeof payload.role !== 'string' || !Config.PERMISSIONS[payload.role]) return null;

      // Reject explicitly logged-out / revoked tokens
      var cache = CacheService.getScriptCache();
      if (cache.get('revoked_jti_' + payload.jti)) {
        return null;
      }

      // Enforce live Admin_Users state and prevent stale/escalated roles
      var activeAdmin = this.getAuthoritativeActiveAdmin(payload.userId, payload.email);
      if (!activeAdmin) return null;
      if (!this.constantTimeEqual(activeAdmin.role, payload.role)) {
        return null;
      }

      return {
        userId: activeAdmin.userId,
        email: activeAdmin.email,
        name: activeAdmin.name,
        role: activeAdmin.role,
        jti: payload.jti,
        exp: payload.exp
      };
    } catch (e) {
      return null;
    }
  },

  /**
   * Revoke an active session token on logout
   */
  revokeToken: function(token) {
    var verified = this.verifyToken(token);
    if (!verified) {
      return { revoked: false };
    }
    var remainingSec = Math.max(60, Math.min(21600, Math.ceil((verified.exp - Date.now()) / 1000)));
    CacheService.getScriptCache().put('revoked_jti_' + verified.jti, '1', remainingSec);
    Database.logActivity('ADMIN_LOGOUT', 'Admin session revoked', {}, verified.email);
    return { revoked: true };
  },

  /**
   * Authenticate admin user with atomic rate limiting & timing-safe non-enumerating errors
   */
  authenticate: function(email, password) {
    if (!Validation.isValidEmail(email) || typeof password !== 'string' || password.length === 0 || password.length > 256) {
      throw Validation.createError('INVALID_CREDENTIALS', 'Invalid email or password.');
    }

    var cleanEmail = String(email).trim().toLowerCase();
    var emailHash = Validation.sha256Hex(cleanEmail).substring(0, 24);
    var attemptsKey = 'login_fail_' + emailHash;
    var globalKey = 'login_global_fail';

    var authOutcome = null;
    var failureEvent = null;
    var lock = LockService.getScriptLock();
    var hasLock = lock.tryLock(5000);
    if (!hasLock) {
      throw Validation.createError('RATE_LIMITED', 'Authentication service busy. Please try again shortly.');
    }

    try {
      var cache = CacheService.getScriptCache();
      var globalFailures = parseInt(cache.get(globalKey) || '0', 10);
      if (globalFailures >= Config.SECURITY.LOGIN_GLOBAL_BURST_MAX) {
        throw Validation.createError('RATE_LIMITED', 'Too many authentication attempts. Please try again later.');
      }

      var failedAttempts = parseInt(cache.get(attemptsKey) || '0', 10);
      if (failedAttempts >= Config.SECURITY.LOGIN_MAX_ATTEMPTS) {
        throw Validation.createError('RATE_LIMITED', 'Too many failed login attempts. Please try again in 15 minutes.');
      }

      var users = Database.getAllRecords(Config.SHEETS.ADMIN_USERS, this.HEADERS, { email: cleanEmail });

      if (!users || users.length === 0) {
        // Equalize timing to prevent account enumeration
        this.hashPassword('dummy-padding-check', '0000000000000000');
        cache.put(attemptsKey, String(failedAttempts + 1), Config.SECURITY.LOGIN_LOCKOUT_SECONDS);
        cache.put(globalKey, String(globalFailures + 1), Config.SECURITY.LOGIN_GLOBAL_BURST_SECONDS);
        failureEvent = { desc: 'Failed login attempt (unmatched account)', actor: 'system' };
      } else {
        var user = users[0];
        var isActive = user.active === true || user.active === 'true' || user.active === 1;
        if (!isActive) {
          // Do not disclose account deactivation status on unauthenticated login
          this.hashPassword('dummy-padding-check', '0000000000000000');
          cache.put(attemptsKey, String(failedAttempts + 1), Config.SECURITY.LOGIN_LOCKOUT_SECONDS);
          cache.put(globalKey, String(globalFailures + 1), Config.SECURITY.LOGIN_GLOBAL_BURST_SECONDS);
          failureEvent = { desc: 'Login rejected for inactive account', actor: cleanEmail };
        } else {
          var computedHash = this.hashPassword(password, user.salt || '');
          if (!this.constantTimeEqual(computedHash, String(user.passwordHash || ''))) {
            cache.put(attemptsKey, String(failedAttempts + 1), Config.SECURITY.LOGIN_LOCKOUT_SECONDS);
            cache.put(globalKey, String(globalFailures + 1), Config.SECURITY.LOGIN_GLOBAL_BURST_SECONDS);
            failureEvent = { desc: 'Failed password verification', actor: cleanEmail };
          } else {
            var role = String(user.role || '');
            if (!Config.PERMISSIONS[role]) {
              failureEvent = { desc: 'Invalid role configured on admin account', actor: cleanEmail };
            } else {
              // Login successful — clear per-email rate limit atomically under lock
              cache.remove(attemptsKey);
              authOutcome = {
                userId: user.userId,
                email: cleanEmail,
                name: user.name,
                role: role
              };
            }
          }
        }
      }
    } finally {
      lock.releaseLock();
    }

    if (failureEvent) {
      Database.logActivity('ADMIN_LOGIN_FAILED', failureEvent.desc, {}, failureEvent.actor);
      throw Validation.createError('INVALID_CREDENTIALS', 'Invalid email or password.');
    }

    var nowIso = new Date().toISOString();
    Database.updateRecord(Config.SHEETS.ADMIN_USERS, this.HEADERS, 'userId', authOutcome.userId, {
      lastLoginAt: nowIso
    });

    var token = this.createToken(authOutcome);
    Database.logActivity('ADMIN_LOGIN_SUCCESS', 'Admin login successful', { role: authOutcome.role }, cleanEmail);

    return {
      token: token,
      user: authOutcome
    };
  },

  /**
   * Check whether a role holds a specific permission
   */
  roleHasPermission: function(role, requiredPermission) {
    if (!requiredPermission) return true;
    var rolePerms = Config.PERMISSIONS[role];
    if (!rolePerms) return false;
    return rolePerms.indexOf('all') !== -1 || rolePerms.indexOf(requiredPermission) !== -1;
  },

  /**
   * Authenticate request strictly from POST JSON body (never URL query parameters)
   */
  authenticateRequest: function(e, requiredPermission, parsedBody) {
    // Explicitly reject tokens passed via URL query string to prevent history/log leakage
    if (e && e.parameter && e.parameter.token) {
      throw Validation.createError(
        'UNAUTHORIZED',
        'Session tokens must not be sent in URL query parameters.'
      );
    }

    var token = '';
    if (parsedBody && typeof parsedBody.token === 'string') {
      token = parsedBody.token;
    } else if (e && e.postData && e.postData.contents) {
      try {
        var body = JSON.parse(e.postData.contents);
        token = typeof body.token === 'string' ? body.token : '';
      } catch (err) {}
    }

    var user = this.verifyToken(token);
    if (!user) {
      throw Validation.createError('UNAUTHORIZED', 'Unauthorized: Missing, invalid, or expired session token.');
    }

    if (requiredPermission && !this.roleHasPermission(user.role, requiredPermission)) {
      Database.logActivity('AUTHORIZATION_DENIED', 'Forbidden action attempted: ' + requiredPermission, {
        role: user.role,
        requiredPermission: requiredPermission
      }, user.email);
      throw Validation.createError('FORBIDDEN', 'Forbidden: Insufficient privileges for action (' + requiredPermission + ').');
    }

    return user;
  }
};
