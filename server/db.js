import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'webcraft.db');
export const db = new DatabaseSync(dbPath);

// Enable WAL mode and foreign keys for durability and performance
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
`);

// Create Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    client_email TEXT,
    website_type TEXT NOT NULL,
    final_budget INTEGER NOT NULL,
    advance_amount INTEGER DEFAULT 5000,
    payment_status TEXT DEFAULT 'pending',
    order_status TEXT DEFAULT 'order_placed',
    custom_instructions TEXT,
    cloud_link TEXT,
    custom_notes TEXT,
    blueprint TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS order_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT,
    uploaded_at TEXT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS system_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS client_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name TEXT NOT NULL,
    company_or_role TEXT,
    website_type TEXT,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    feedback TEXT NOT NULL,
    order_id TEXT,
    verified_status INTEGER DEFAULT 1,
    created_at TEXT NOT NULL
  );
`);

// Safe Migration: Ensure Autonomous AI & Tracking Token columns exist in orders table
const aiColumns = [
  'ai_status TEXT DEFAULT "idle"',
  'ai_prompt TEXT',
  'ai_tour_data TEXT',
  'ai_preview_token TEXT',
  'ai_feedback TEXT',
  'client_feedback TEXT',
  'tracking_token TEXT'
];

for (const col of aiColumns) {
  try {
    db.exec(`ALTER TABLE orders ADD COLUMN ${col};`);
  } catch (e) {
    // Column already exists, safe to ignore
  }
}

// Backfill any existing orders missing a tracking_token
try {
  const missingTokens = db.prepare("SELECT id FROM orders WHERE tracking_token IS NULL OR tracking_token = ''").all();
  const updateTk = db.prepare('UPDATE orders SET tracking_token = ? WHERE id = ?');
  for (const row of missingTokens) {
    const numPart = row.id.replace(/\D/g, '') || Math.floor(100000 + Math.random() * 900000);
    updateTk.run(`TK-${numPart}`, row.id);
  }
} catch (e) {
  console.error('Migration warning (tracking_token backfill):', e.message);
}

// Seed initial system settings if empty
const checkSettings = db.prepare('SELECT value FROM system_settings WHERE key = ?').get('confirmed_orders_count');
if (!checkSettings) {
  db.prepare('INSERT INTO system_settings (key, value) VALUES (?, ?)').run('confirmed_orders_count', '6');
}

// Seed initial client reviews if empty
const checkReviews = db.prepare('SELECT COUNT(*) as count FROM client_reviews').get();
if (checkReviews && checkReviews.count === 0) {
  const seedReviews = [
    {
      client_name: 'Pooja Shah',
      company_or_role: 'Founder, Glamour & Glow Bridal Studio',
      website_type: 'beautyparlour',
      rating: 5,
      feedback: 'The Webcraft built our bridal studio website with zero upfront online fees! The WhatsApp booking system and luxury rose-gold portfolio got us 35+ wedding inquiries in the very first week. Blazing fast speed on mobile!',
      order_id: 'TWC-892401',
      created_at: new Date(Date.now() - 4 * 86400000).toISOString()
    },
    {
      client_name: 'Hardik Patel',
      company_or_role: 'Managing Director, Shikhar Skyline Infra',
      website_type: 'corporate',
      rating: 5,
      feedback: 'Genuine direct developer pricing with zero agency markups. Rakshit delivered our interactive real estate floor plans and RERA compliance portal ahead of schedule. The code is handcrafted React without sluggish plugins.',
      order_id: 'TWC-741952',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      client_name: 'Dr. Sameer Mehta',
      company_or_role: 'Chief Surgeon, Mehta Aesthetics Clinic',
      website_type: 'healthcare',
      rating: 5,
      feedback: 'Exceptional attention to privacy and NABH medical compliance. Zero online payment risk—I inspected the fully functional demo before clearing final payment. Mandatory feedback policy ensures top-notch delivery!',
      order_id: 'TWC-492104',
      created_at: new Date(Date.now() - 5 * 86400000).toISOString()
    },
    {
      client_name: 'Vikram Desai',
      company_or_role: 'Owner, Urban Gentleman Barbershop',
      website_type: 'hairparlour',
      rating: 5,
      feedback: 'Super slick dark luxury theme. Our clients book hair and beard appointments directly from their phones with zero lag. The 50% discount tier made it a complete no-brainer value.',
      order_id: 'TWC-520194',
      created_at: new Date(Date.now() - 6 * 86400000).toISOString()
    },
    {
      client_name: 'Ananya Sharma',
      company_or_role: 'Founder, Zahra Luxury Ethnic Couture',
      website_type: 'ecommerce',
      rating: 5,
      feedback: 'Our e-commerce store loads in under 0.6 seconds! Zero cart abandonment, smooth bag checkout drawer, and direct client support throughout. Truly high craftsmanship.',
      order_id: 'TWC-331089',
      created_at: new Date(Date.now() - 7 * 86400000).toISOString()
    }
  ];

  const insertReview = db.prepare(`
    INSERT INTO client_reviews (
      client_name, company_or_role, website_type, rating, feedback, order_id, verified_status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, 1, ?)
  `);

  for (const r of seedReviews) {
    insertReview.run(r.client_name, r.company_or_role, r.website_type, r.rating, r.feedback, r.order_id, r.created_at);
  }
}

// Seed initial orders if database is fresh
const checkOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get();
if (checkOrders && checkOrders.count === 0) {
  const seedOrders = [
    {
      id: 'TWC-892401',
      client_name: 'Pooja Shah',
      client_phone: '9879123450',
      client_email: 'pooja.bridal@gmail.com',
      website_type: 'beautyparlour',
      final_budget: 14000,
      advance_amount: 5000,
      payment_status: 'pending',
      order_status: 'demo_ready',
      custom_instructions: 'We need luxury bridal makeup showcase, direct consultation inquiry form, and warm rose-gold palette with price list for HD airbrush & haldi packages.',
      cloud_link: 'https://drive.google.com/drive/folders/sample-glamour-glow',
      custom_notes: 'Urgent wedding season launch needed by this weekend.',
      blueprint: 'Phase 1: Brand & Theme Approval\nPhase 2: Bridal Showcase & Price Cards\nPhase 3: Direct Booking Widget\nPhase 4: Client Demo Approval (Current)\nPhase 5: Domain Setup & Launch',
      created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'TWC-741952',
      client_name: 'Hardik Patel',
      client_phone: '9825012345',
      client_email: 'hardik@shikharinfra.in',
      website_type: 'corporate',
      final_budget: 19000,
      advance_amount: 5000,
      payment_status: 'pending',
      order_status: 'development_active',
      custom_instructions: 'Riverfront luxury residential portal for 3 & 4 BHK apartments with interactive floorplans, RERA certificate download, and site visit booking form.',
      cloud_link: 'https://drive.google.com/drive/folders/shikhar-skyline-assets',
      custom_notes: 'Target audience: High net-worth buyers in Ahmedabad.',
      blueprint: 'Phase 1: Architecture Wireframe\nPhase 2: High-Res Floorplans Integration\nPhase 3: RERA Compliance & Contact Forms (Active)\nPhase 4: Client Demo\nPhase 5: Domain Handover',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'TWC-615298',
      client_name: 'Kavit Shah',
      client_phone: '9909988776',
      client_email: 'kavit@logitrack.com',
      website_type: 'custombuild',
      final_budget: 18500,
      advance_amount: 5000,
      payment_status: 'pending',
      order_status: 'wireframe_ready',
      custom_instructions: 'Custom logistics consignment tracking portal with live API dispatch telemetry, driver notification webhook, and client quotation calculator.',
      cloud_link: 'https://drive.google.com/drive/folders/logitrack-docs',
      custom_notes: 'Needs pure React frontend without bulky plugins for sub-second speeds.',
      blueprint: 'Phase 1: Requirement Specification\nPhase 2: Wireframe & Interactive Console (Active)\nPhase 3: Webhook & Backend API\nPhase 4: Live Staging\nPhase 5: Production Deployment',
      created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const insertOrder = db.prepare(`
    INSERT INTO orders (
      id, client_name, client_phone, client_email, website_type,
      final_budget, advance_amount, payment_status, order_status,
      custom_instructions, cloud_link, custom_notes, blueprint,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const o of seedOrders) {
    insertOrder.run(
      o.id, o.client_name, o.client_phone, o.client_email, o.website_type,
      o.final_budget, o.advance_amount, o.payment_status, o.order_status,
      o.custom_instructions, o.cloud_link, o.custom_notes, o.blueprint,
      o.created_at, o.updated_at
    );
  }
}

// Seed isolated Synthetic Sandbox Demo for public test pills (Protects real customer PII)
try {
  const checkDemo = db.prepare('SELECT id FROM orders WHERE id = ?').get('TWC-DEMO-001');
  if (!checkDemo) {
    db.prepare(`
      INSERT INTO orders (
        id, client_name, client_phone, client_email, website_type,
        final_budget, advance_amount, payment_status, order_status,
        custom_instructions, cloud_link, custom_notes, blueprint,
        created_at, updated_at, ai_status, ai_preview_token, tracking_token
      ) VALUES (
        'TWC-DEMO-001', 'Studio Sandbox Demo', '9999999999', 'demo@thewebcraft.in', 'landing',
        15000, 5000, 'token_paid', 'demo_ready',
        'Simulated studio demonstration project with zero customer personal data.', '', '', '',
        '${new Date().toISOString()}', '${new Date().toISOString()}', 'final_ready', 'preview_demo_sandbox', 'TK-DEMO-2026'
      )
    `).run();
  }
} catch (e) {
  // Safe ignore
}

// Database helper functions
export const orderQueries = {
  create: (order) => {
    // Generate unique Tracking Token if not provided
    const numPart = (order.id ? order.id.replace(/\D/g, '') : '') || Math.floor(100000 + Math.random() * 900000);
    const trackingToken = order.tracking_token || order.trackingToken || `TK-${numPart}`;

    const stmt = db.prepare(`
      INSERT INTO orders (
        id, client_name, client_phone, client_email, website_type,
        final_budget, advance_amount, payment_status, order_status,
        custom_instructions, cloud_link, custom_notes, blueprint,
        tracking_token, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    stmt.run(
      order.id,
      order.client_name,
      order.client_phone,
      order.client_email || null,
      order.website_type,
      order.final_budget,
      order.advance_amount || 5000,
      order.payment_status || 'pending',
      order.order_status || 'order_placed',
      order.custom_instructions || '',
      order.cloud_link || '',
      order.custom_notes || '',
      order.blueprint || '',
      trackingToken,
      now,
      now
    );

    // Increment confirmed orders count in system_settings
    const currentCount = orderQueries.getOrderCount();
    orderQueries.setOrderCount(currentCount + 1);

    return orderQueries.getById(order.id);
  },

  getById: (id) => {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    if (!order) return null;
    const files = db.prepare('SELECT * FROM order_files WHERE order_id = ?').all(id);
    return { ...order, files };
  },

  getByPhoneOrId: (query) => {
    if (!query || typeof query !== 'string') return null;
    let clean = query.trim().replace(/^#+/, '').trim();

    // 0. Search by Tracking Token (e.g. "TK-892401", "TWC-TK-892401", "TK892401")
    const normalizedToken = clean.replace(/^(TWC[-_]?)?TK\s*[-_]?\s*(\d+)/i, 'TK-$2');
    const tokenMatch = db.prepare(`
      SELECT * FROM orders 
      WHERE tracking_token = ? OR tracking_token = ? OR tracking_token = ? 
      COLLATE NOCASE
    `).get(clean, normalizedToken, `TK-${clean}`);
    if (tokenMatch) {
      const files = db.prepare('SELECT * FROM order_files WHERE order_id = ?').all(tokenMatch.id);
      return { ...tokenMatch, files };
    }

    // Normalize potential ID format (e.g. "TWC - 892401", "TWC 892401", "TWC892401" -> "TWC-892401")
    const normalizedId = clean.replace(/^TWC\s*[-_]?\s*(\d+)/i, 'TWC-$1');

    // 1. Try normalized Order ID (e.g. TWC-892401)
    if (/^TWC-\d{4,10}$/i.test(normalizedId)) {
      const order = db.prepare('SELECT * FROM orders WHERE id = ? COLLATE NOCASE').get(normalizedId);
      if (order) {
        const files = db.prepare('SELECT * FROM order_files WHERE order_id = ?').all(order.id);
        return { ...order, files };
      }
    }

    // 2. Raw numeric search: user entered just the numbers (e.g. "892401" -> matches "TWC-892401" or tracking_token "TK-892401")
    if (/^\d{5,8}$/.test(clean)) {
      const order = db.prepare(`
        SELECT * FROM orders 
        WHERE id = ? OR id = ? OR tracking_token = ? OR tracking_token = ? 
        COLLATE NOCASE
      `).get(clean, `TWC-${clean}`, clean, `TK-${clean}`);
      if (order) {
        const files = db.prepare('SELECT * FROM order_files WHERE order_id = ?').all(order.id);
        return { ...order, files };
      }
    }

    // 3. Exact direct ID or token match
    const directOrder = db.prepare('SELECT * FROM orders WHERE id = ? OR tracking_token = ? COLLATE NOCASE').get(clean, clean);
    if (directOrder) {
      const files = db.prepare('SELECT * FROM order_files WHERE order_id = ?').all(directOrder.id);
      return { ...directOrder, files };
    }

    // 4. Strict Phone number search: Strip all non-digits, require at least 10 digits
    // Strictly NO wildcards (eliminates % and _ enumeration attacks)
    const digitsOnly = clean.replace(/\D/g, '');
    if (digitsOnly.length >= 10) {
      const last10 = digitsOnly.slice(-10);
      const order = db.prepare(`
        SELECT * FROM orders 
        WHERE client_phone = ? OR client_phone = ? OR client_phone LIKE ?
        ORDER BY created_at DESC LIMIT 1
      `).get(digitsOnly, last10, `%${last10}`);

      if (order) {
        const files = db.prepare('SELECT * FROM order_files WHERE order_id = ?').all(order.id);
        return { ...order, files };
      }
    }

    return null;
  },

  getAll: () => {
    return db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  },

  updateStatus: (id, orderStatus, paymentStatus) => {
    const validStatuses = new Set([
      'order_placed', 'wireframe_ready', 'development_active', 
      'demo_ready', 'revision_review', 'launched'
    ]);
    const validPayments = new Set(['pending', 'token_paid', 'fully_paid', 'cancelled']);

    if (!validStatuses.has(orderStatus)) {
      throw new Error('Security Error: Invalid order status parameter.');
    }
    if (paymentStatus && !validPayments.has(paymentStatus)) {
      throw new Error('Security Error: Invalid payment status parameter.');
    }

    const now = new Date().toISOString();
    if (paymentStatus) {
      db.prepare('UPDATE orders SET order_status = ?, payment_status = ?, updated_at = ? WHERE id = ?')
        .run(orderStatus, paymentStatus, now, id);
    } else {
      db.prepare('UPDATE orders SET order_status = ?, updated_at = ? WHERE id = ?')
        .run(orderStatus, now, id);
    }
    return orderQueries.getById(id);
  },

  addFile: (fileData) => {
    const stmt = db.prepare(`
      INSERT INTO order_files (order_id, original_name, file_path, file_size, mime_type, uploaded_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      fileData.order_id,
      fileData.original_name,
      fileData.file_path,
      fileData.file_size,
      fileData.mime_type || '',
      new Date().toISOString()
    );
  },

  getOrderCount: () => {
    const row = db.prepare('SELECT value FROM system_settings WHERE key = ?').get('confirmed_orders_count');
    return row ? parseInt(row.value, 10) : 6;
  },

  setOrderCount: (count) => {
    db.prepare('INSERT OR REPLACE INTO system_settings (key, value) VALUES (?, ?)').run('confirmed_orders_count', count.toString());
  },

  updateAiData: (id, { ai_status, ai_prompt, ai_tour_data, ai_preview_token, ai_feedback }) => {
    const existing = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    if (!existing) return null;

    const newStatus = ai_status !== undefined ? ai_status : existing.ai_status;
    const newPrompt = ai_prompt !== undefined ? ai_prompt : existing.ai_prompt;
    const newTour = ai_tour_data !== undefined ? (typeof ai_tour_data === 'object' ? JSON.stringify(ai_tour_data) : ai_tour_data) : existing.ai_tour_data;
    const newToken = ai_preview_token !== undefined ? ai_preview_token : existing.ai_preview_token;
    const newFeedback = ai_feedback !== undefined ? ai_feedback : existing.ai_feedback;
    const now = new Date().toISOString();

    db.prepare(`
      UPDATE orders 
      SET ai_status = ?, ai_prompt = ?, ai_tour_data = ?, ai_preview_token = ?, ai_feedback = ?, updated_at = ?
      WHERE id = ?
    `).run(newStatus, newPrompt, newTour, newToken, newFeedback, now, id);

    return orderQueries.getById(id);
  },

  saveClientFeedback: (id, feedbackText, status = 'client_review') => {
    const now = new Date().toISOString();
    db.prepare(`
      UPDATE orders 
      SET client_feedback = ?, ai_status = ?, updated_at = ?
      WHERE id = ?
    `).run(feedbackText, status, now, id);
    return orderQueries.getById(id);
  },

  getByPreviewToken: (tokenOrId) => {
    if (!tokenOrId) return null;
    // Strict Customer Privacy: Only allow access via secret ai_preview_token or owner tracking_token
    const order = db.prepare('SELECT * FROM orders WHERE ai_preview_token = ? OR tracking_token = ?').get(tokenOrId, tokenOrId);
    if (!order) return null;
    return order;
  }
};

export const contactQueries = {
  create: (contact) => {
    const stmt = db.prepare(`
      INSERT INTO contact_messages (name, phone, email, subject, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, 'new', ?)
    `);
    stmt.run(
      contact.name,
      contact.phone,
      contact.email || null,
      contact.subject || 'General Inquiry',
      contact.message,
      new Date().toISOString()
    );
  },

  getAll: () => {
    return db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
  }
};

export const reviewQueries = {
  create: (review) => {
    const stmt = db.prepare(`
      INSERT INTO client_reviews (client_name, company_or_role, website_type, rating, feedback, order_id, verified_status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const now = new Date().toISOString();
    const result = stmt.run(
      review.client_name,
      review.company_or_role || 'Verified Client',
      review.website_type || 'Custom Website',
      parseInt(review.rating, 10) || 5,
      review.feedback,
      review.order_id || null,
      review.verified_status !== undefined ? review.verified_status : 1,
      now
    );
    return db.prepare('SELECT * FROM client_reviews WHERE id = ?').get(result.lastInsertRowid);
  },

  getAll: () => {
    return db.prepare('SELECT * FROM client_reviews ORDER BY created_at DESC').all();
  }
};

