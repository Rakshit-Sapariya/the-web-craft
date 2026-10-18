// Persistent Auto-Healing Tunnel Manager
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL_FILE = path.join(__dirname, '..', 'public', 'tunnel-url.txt');

function startTunnel() {
  console.log('[TUNNEL] Connecting to serveo.net...');
  const child = spawn('ssh', [
    '-o', 'StrictHostKeyChecking=no',
    '-o', 'ServerAliveInterval=10',
    '-o', 'ServerAliveCountMax=999',
    '-R', '80:localhost:5173',
    'serveo.net'
  ]);

  child.stdout.on('data', (data) => {
    const text = data.toString();
    console.log('[TUNNEL OUT]:', text);
    const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.serveousercontent\.com/);
    if (match) {
      const url = match[0];
      console.log(`[TUNNEL ACTIVE] => ${url}`);
      fs.writeFileSync(URL_FILE, url, 'utf8');
    }
  });

  child.stderr.on('data', (data) => {
    const text = data.toString();
    console.log('[TUNNEL ERR]:', text);
    const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.serveousercontent\.com/);
    if (match) {
      const url = match[0];
      console.log(`[TUNNEL ACTIVE] => ${url}`);
      fs.writeFileSync(URL_FILE, url, 'utf8');
    }
  });

  child.on('close', (code) => {
    console.log(`[TUNNEL] Process exited with code ${code}. Reconnecting in 3s...`);
    setTimeout(startTunnel, 3000);
  });
}

startTunnel();
