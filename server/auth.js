import crypto from 'node:crypto';
import { db } from './db.js';

// Create schema for admin credentials and active sessions
db.exec(`
  CREATE TABLE IF NOT EXISTS admin_credentials (
    username TEXT PRIMARY KEY,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'superadmin',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin_sessions (
    token TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    FOREIGN KEY (username) REFERENCES admin_credentials(username) ON DELETE CASCADE
  );
`);

/**
 * Cryptographically Secure Password Hashing (Anti-Brute-Force & Salted)
 * Uses scrypt (CPU and memory hard key derivation function)
 */
export function hashPassword(plainTextPassword) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(plainTextPassword, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

/**
 * Timing-Safe Password Verification (Immunizes Against Timing Attacks)
 */
export function verifyPassword(plainTextPassword, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;

  try {
    const [salt, key] = storedHash.split(':');
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(plainTextPassword, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch (err) {
    return false;
  }
}

/**
 * Initialize Lead Developer & Studio Owner Admin Accounts with Hashed Credentials
 */
export function initializeAdminAccount() {
  const masterAccounts = [
    {
      username: 'rakshit',
      password: process.env.RAKSHIT_ADMIN_PASSWORD || 'Rakshit@WebCraft2026!',
      role: 'superadmin',
      label: 'Rakshit Patel (Studio Owner)'
    },
    {
      username: 'admin',
      password: process.env.ADMIN_PASSWORD || 'WebCraft@2026#Fortified',
      role: 'superadmin',
      label: 'Default Studio Admin'
    }
  ];

  const now = new Date().toISOString();

  for (const acc of masterAccounts) {
    const existing = db.prepare('SELECT * FROM admin_credentials WHERE username = ? COLLATE NOCASE').get(acc.username);
    if (!existing) {
      const hashed = hashPassword(acc.password);
      db.prepare(`
        INSERT INTO admin_credentials (username, password_hash, role, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
      `).run(acc.username, hashed, acc.role, now, now);
      console.log(`[SECURITY] Initialized protected master account: "${acc.username}" (${acc.label}) with salted scrypt hash.`);
    }
  }
}

/**
 * Session Lifecycle Management
 */
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 Hours

export function createAdminSession(username, ip = '', userAgent = '') {
  // Generate cryptographically random high-entropy token
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const expiresAt = now + SESSION_TTL_MS;

  // Clean expired sessions periodically
  db.prepare('DELETE FROM admin_sessions WHERE expires_at < ?').run(now);

  db.prepare(`
    INSERT INTO admin_sessions (token, username, ip_address, user_agent, created_at, expires_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(token, username, ip, userAgent ? userAgent.substring(0, 150) : '', now, expiresAt);

  return {
    token,
    username,
    expiresAt: new Date(expiresAt).toISOString()
  };
}

export function validateAdminSession(token) {
  if (!token || typeof token !== 'string') return null;

  const now = Date.now();
  const session = db.prepare(`
    SELECT * FROM admin_sessions 
    WHERE token = ? AND expires_at > ?
  `).get(token, now);

  if (!session) return null;
  return session;
}

export function revokeAdminSession(token) {
  if (!token) return false;
  db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
  return true;
}

// In-Memory Login Rate Limiter (Anti-Brute Force Protection)
const loginAttempts = new Map(); // ip -> { count, lockedUntil }

export function checkLoginRateLimit(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (record) {
    if (record.lockedUntil && now < record.lockedUntil) {
      const waitSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return { allowed: false, message: `Account locked due to multiple failed attempts. Please retry in ${waitSeconds} seconds.` };
    }

    if (now - record.firstAttempt > 15 * 60 * 1000) {
      // Reset window after 15 mins
      loginAttempts.set(ip, { count: 1, firstAttempt: now, lockedUntil: 0 });
      return { allowed: true };
    }

    if (record.count >= 5) {
      record.lockedUntil = now + 15 * 60 * 1000; // Lock for 15 minutes
      return { allowed: false, message: 'Too many failed login attempts. IP temporarily locked for 15 minutes.' };
    }
  }

  return { allowed: true };
}

export function recordFailedLogin(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, firstAttempt: now, lockedUntil: 0 };
  record.count += 1;
  loginAttempts.set(ip, record);
}

export function recordSuccessfulLogin(ip) {
  loginAttempts.delete(ip);
}
