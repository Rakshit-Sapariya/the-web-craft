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
`);

// Seed initial system settings if empty
const checkSettings = db.prepare('SELECT value FROM system_settings WHERE key = ?').get('confirmed_orders_count');
if (!checkSettings) {
  db.prepare('INSERT INTO system_settings (key, value) VALUES (?, ?)').run('confirmed_orders_count', '6');
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
      custom_instructions: 'We need luxury bridal makeup showcase, WhatsApp consultation button, and warm rose-gold palette with price list for HD airbrush & haldi packages.',
      cloud_link: 'https://drive.google.com/drive/folders/sample-glamour-glow',
      custom_notes: 'Urgent wedding season launch needed by this weekend.',
      blueprint: 'Phase 1: Brand & Theme Approval\nPhase 2: Bridal Showcase & Price Cards\nPhase 3: WhatsApp Booking Widget\nPhase 4: Client Demo Approval (Current)\nPhase 5: Domain Setup & Launch',
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

// Database helper functions
export const orderQueries = {
  create: (order) => {
    const stmt = db.prepare(`
      INSERT INTO orders (
        id, client_name, client_phone, client_email, website_type,
        final_budget, advance_amount, payment_status, order_status,
        custom_instructions, cloud_link, custom_notes, blueprint,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    const clean = query.trim();

    // 1. Try exact Order ID match (e.g. TWC-892401)
    if (/^TWC-\d{5,8}$/i.test(clean)) {
      const order = db.prepare('SELECT * FROM orders WHERE id = ? COLLATE NOCASE').get(clean);
      if (order) {
        const files = db.prepare('SELECT * FROM order_files WHERE order_id = ?').all(order.id);
        return { ...order, files };
      }
    }

    // 2. Strict Phone number search: Strip all non-digits, require at least 10 digits
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
