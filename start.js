import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('====================================================');
console.log('🚀 [THE WEBCRAFT] All-in-One Master Studio Server');
console.log('====================================================');

// 1. Backend Express Server (Port 5000)
console.log('📦 [1/3] Starting Backend API & SQLite DB...');
const backend = spawn('node', ['server/index.js'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

// 2. Frontend Vite Dev Server (Port 5173)
console.log('⚡ [2/3] Starting Frontend Dev Server (--host)...');
const frontend = spawn('npx', ['vite', '--host'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

// 3. Public Web Tunnel
console.log('🌐 [3/3] Starting Public Live Tunnel...');
const tunnel = spawn('node', ['server/tunnel.js'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

// Graceful cleanup on exit
const cleanup = (code = 0) => {
  console.log('\n🛑 [THE WEBCRAFT] Shutting down all unified services...');
  try { backend.kill(); } catch (e) {}
  try { frontend.kill(); } catch (e) {}
  try { tunnel.kill(); } catch (e) {}
  process.exit(code);
};

process.on('SIGINT', () => cleanup(0));
process.on('SIGTERM', () => cleanup(0));
process.on('exit', () => cleanup(0));
