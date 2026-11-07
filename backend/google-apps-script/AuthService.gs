/**
 * AEGIS ACADEMY - AUTH SERVICE (Google Apps Script)
 * Manages admin authentication, secure token issuance, and role-based access.
 */

var AuthService = (function() {
  var HEADERS = ['userId', 'email', 'name', 'passwordHash', 'salt', 'role', 'active', 'createdAt', 'lastLoginAt'];

  /**
   * Helper: compute SHA-256 hash with salt
   */
  function hashPassword(password, salt) {
    var raw = salt + password;
    var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw, Utilities.Charset.UTF_8);
    return digest.map(function(byte) {
      var v = (byte < 0 ? byte + 256 : byte).toString(16);
      return v.length === 1 ? '0' + v : v;
    }).join('');
  }

  /**
   * Helper: create signed HMAC session token
   */
  function createToken(payload) {
    var secret = Config.getAdminSecretKey();
    var header = Utilities.base64EncodeWebSafe(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    var exp = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    payload.exp = exp;
    var body = Utilities.base64EncodeWebSafe(JSON.stringify(payload));
    var signature = Utilities.computeHmacSha256Signature(header + '.' + body, secret);
    var sigBase64 = Utilities.base64EncodeWebSafe(signature);
    return header + '.' + body + '.' + sigBase64;
  }

  /**
   * Helper: verify signed session token
   */
  function verifyToken(token) {
    if (!token) return null;
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
  }

  /**
   * Authenticate admin user
   * @param {string} email
   * @param {string} password
   */
  function authenticate(email, password) {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    var cleanEmail = String(email).trim().toLowerCase();
    var users = Database.getAllRecords(Config.SHEETS.ADMIN_USERS, HEADERS, { email: cleanEmail });

    // Fallback bootstrap admin if sheet is empty or admin secret key matches
    if (users.length === 0) {
      var adminSecret = Config.getAdminSecretKey();
      // If master secret is supplied or default initial login
      if (cleanEmail === 'admin@aegisacademy.in' && password === adminSecret) {
        var token = createToken({
          userId: 'ADM-SUPER-001',
          email: cleanEmail,
          name: 'Super Admin',
          role: Config.ROLES.SUPER_ADMIN
        });

        Database.logActivity('ADMIN_LOGIN', 'Master super admin login successful', { email: cleanEmail });

        return {
          success: true,
          token: token,
          user: {
            userId: 'ADM-SUPER-001',
            email: cleanEmail,
            name: 'Super Admin',
            role: Config.ROLES.SUPER_ADMIN
          }
        };
      }
      throw new Error('Invalid credentials.');
    }

    var user = users[0];
    if (user.active !== true && user.active !== 'true' && user.active !== 1) {
      throw new Error('This administrative account has been deactivated.');
    }

    var computedHash = hashPassword(password, user.salt || '');
    if (computedHash !== user.passwordHash) {
      Database.logActivity('ADMIN_LOGIN_FAILED', 'Failed password attempt for ' + cleanEmail, { email: cleanEmail });
      throw new Error('Invalid credentials.');
    }

    // Update last login timestamp
    Database.updateRecord(Config.SHEETS.ADMIN_USERS, HEADERS, 'userId', user.userId, {
      lastLoginAt: new Date().toISOString()
    });

    var token = createToken({
      userId: user.userId,
      email: user.email,
      name: user.name,
      role: user.role
    });

    Database.logActivity('ADMIN_LOGIN_SUCCESS', 'Admin login successful', { email: user.email, role: user.role });

    return {
      success: true,
      token: token,
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }

  /**
   * Verify token from request
   */
  function authenticateRequest(e) {
    var token = '';
    if (e.parameter && e.parameter.token) {
      token = e.parameter.token;
    } else if (e.postData && e.postData.contents) {
      try {
        var body = JSON.parse(e.postData.contents);
        token = body.token || '';
      } catch (err) {}
    }

    var user = verifyToken(token);
    if (!user) {
      throw new Error('Unauthorized: Invalid or expired session token.');
    }
    return user;
  }

  return {
    HEADERS: HEADERS,
    hashPassword: hashPassword,
    authenticate: authenticate,
    verifyToken: verifyToken,
    authenticateRequest: authenticateRequest
  };
})();
