/**
 * ============================================================================
 * AEGIS ACADEMY — GOOGLE APPS SCRIPT BACKEND
 * File: AuthService.gs
 * Description: Multi-round password derivation, rate-limited admin authentication,
 * JWT-style session tokens, and role-based access control.
 * ============================================================================
 */

var AuthService = {
  HEADERS: ['userId', 'email', 'name', 'passwordHash', 'salt', 'role', 'active', 'createdAt', 'lastLoginAt'],

  /**
   * Multi-iteration key derivation function (1,000 rounds of HMAC-SHA256)
   */
  hashPassword: function(password, salt) {
    if (!password || !salt) throw new Error('Password and salt are required.');
    var derived = salt + password;
    var secret = Config.getAdminSecretKey();

    // 1,000 rounds of HMAC-SHA256
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
   * Create signed HMAC session token (24-hour expiration)
   */
  createToken: function(payload) {
    var secret = Config.getAdminSecretKey();
    var header = Utilities.base64EncodeWebSafe(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    var exp = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    payload.exp = exp;
    payload.iat = Date.now();
    var body = Utilities.base64EncodeWebSafe(JSON.stringify(payload));
    var signature = Utilities.computeHmacSha256Signature(header + '.' + body, secret);
    var sigBase64 = Utilities.base64EncodeWebSafe(signature);
    return header + '.' + body + '.' + sigBase64;
  },

  /**
   * Verify signed session token and validate claims
   */
  verifyToken: function(token) {
    if (!token || typeof token !== 'string') return null;
    var parts = token.split('.');
    if (parts.length !== 3) return null;

    var header = parts[0];
    var body = parts[1];
    var sig = parts[2];

    var secret = Config.getAdminSecretKey();
    var expectedSig = Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(header + '.' + body, secret));
    if (sig !== expectedSig) return null;

    try {
      var jsonStr = Utilities.newBlob(Utilities.base64DecodeWebSafe(body)).getDataAsString();
      var payload = JSON.parse(jsonStr);
      if (payload.exp && Date.now() > payload.exp) {
        return null; // Expired
      }
      return payload;
    } catch (e) {
      return null;
    }
  },

  /**
   * Authenticate admin user with rate limiting against brute force
   */
  authenticate: function(email, password) {
    if (!email || !password) {
      var err = new Error('Email and password are required.');
      err.code = 'INVALID_CREDENTIALS';
      throw err;
    }

    var cleanEmail = String(email).trim().toLowerCase();

    // Check rate limit: max 5 failed attempts per 15 minutes per email
    var cache = CacheService.getScriptCache();
    var attemptsKey = 'login_fail_' + cleanEmail;
    var failedAttempts = parseInt(cache.get(attemptsKey) || '0', 10);
    if (failedAttempts >= 5) {
      var rateErr = new Error('Too many failed login attempts. Account temporarily locked for 15 minutes.');
      rateErr.code = 'RATE_LIMITED';
      throw rateErr;
    }

    var users = Database.getAllRecords(Config.SHEETS.ADMIN_USERS, this.HEADERS, { email: cleanEmail });

    if (users.length === 0) {
      // Record failed attempt
      cache.put(attemptsKey, String(failedAttempts + 1), 900); // 15 mins
      Database.logActivity('ADMIN_LOGIN_FAILED', 'Failed login attempt for unknown user: ' + cleanEmail, {}, cleanEmail);
      var authErr = new Error('Invalid email or password.');
      authErr.code = 'INVALID_CREDENTIALS';
      throw authErr;
    }

    var user = users[0];
    if (user.active !== true && user.active !== 'true' && user.active !== 1) {
      var deactErr = new Error('This administrative account has been deactivated.');
      deactErr.code = 'ACCOUNT_DEACTIVATED';
      throw deactErr;
    }

    var computedHash = this.hashPassword(password, user.salt || '');
    if (computedHash !== user.passwordHash) {
      cache.put(attemptsKey, String(failedAttempts + 1), 900);
      Database.logActivity('ADMIN_LOGIN_FAILED', 'Failed password attempt for ' + cleanEmail, {}, cleanEmail);
      var pwErr = new Error('Invalid email or password.');
      pwErr.code = 'INVALID_CREDENTIALS';
      throw pwErr;
    }

    // Login successful — clear rate limit
    cache.remove(attemptsKey);

    var nowIso = new Date().toISOString();
    Database.updateRecord(Config.SHEETS.ADMIN_USERS, this.HEADERS, 'userId', user.userId, {
      lastLoginAt: nowIso
    });

    var token = this.createToken({
      userId: user.userId,
      email: user.email,
      name: user.name,
      role: user.role
    });

    Database.logActivity('ADMIN_LOGIN_SUCCESS', 'Admin login successful', { role: user.role }, user.email);

    return {
      token: token,
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  },

  /**
   * Authenticate request from event parameter or POST body
   */
  authenticateRequest: function(e, requiredPermission) {
    var token = '';
    if (e.parameter && e.parameter.token) {
      token = e.parameter.token;
    } else if (e.postData && e.postData.contents) {
      try {
        var body = JSON.parse(e.postData.contents);
        token = body.token || '';
      } catch (err) {}
    }

    var user = this.verifyToken(token);
    if (!user) {
      var unauthErr = new Error('Unauthorized: Missing, invalid, or expired session token.');
      unauthErr.code = 'UNAUTHORIZED';
      throw unauthErr;
    }

    // Role-based authorization check
    if (requiredPermission) {
      var userRole = user.role || Config.ROLES.VIEWER;
      var rolePerms = Config.PERMISSIONS[userRole] || [];
      if (rolePerms.indexOf('all') === -1 && rolePerms.indexOf(requiredPermission) === -1) {
        var forbidErr = new Error('Forbidden: Insufficient privileges for action (' + requiredPermission + ').');
        forbidErr.code = 'FORBIDDEN';
        throw forbidErr;
      }
    }

    return user;
  }
};
