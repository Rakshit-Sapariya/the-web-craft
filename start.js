import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In Production (GoDaddy, Cloud Hosting, Docker), run the Fortified Unified Server
if (process.env.NODE_ENV === 'production' && !process.env.FORCE_LOCAL_DEV) {
  console.log('====================================================');
  console.log('🚀 [THE WEBCRAFT] Production Mode Activated');
  console.log('🌐 Serving Fortified API + Built Frontend on Port:', process.env.PORT || 5000);
  console.log('====================================================');
  import('./server/index.js');
} else {
  // Local Development Multi-Process Runner (Backend + Vite Dev Server + Public Tunnel)
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
}
