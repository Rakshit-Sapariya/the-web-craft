import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// ============================================================================
// 🛡️ ZERO-AD & ANTI-INJECTION DOM INTEGRITY DEFENDER
// ============================================================================
if (typeof window !== 'undefined') {
  // Known ad networks and tracking script signatures
  const AD_NETWORK_SIGNATURES = [
    'googlesyndication',
    'doubleclick',
    'googleadservices',
    'adnxs',
    'adsystem',
    'taboola',
    'outbrain',
    'popads',
    'propellerads',
    'adroll',
    'criteo',
    'mgid',
    'infolinks',
    'pagead2',
  ];

  // Continuous DOM Watcher: Instantly neutralize any adware or injected trackers
  const adBlockObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1) {
          const tag = node.tagName.toLowerCase();
          const src = (node.src || node.getAttribute('src') || '').toLowerCase();
          const href = (node.href || node.getAttribute('href') || '').toLowerCase();
          const className = (node.className || '').toString().toLowerCase();

          const isAd = AD_NETWORK_SIGNATURES.some(
            (sig) => src.includes(sig) || href.includes(sig) || className.includes(sig)
          );

          if (isAd || (tag === 'ins' && className.includes('adsbygoogle'))) {
            try {
              node.remove();
              console.warn('🛡️ [THE WEBCRAFT SHIELD] Unauthorized ad element intercepted and neutralized.');
            } catch (_) {}
          }
        }
      }
    }
  });

  try {
    adBlockObserver.observe(document.documentElement, { childList: true, subtree: true });
  } catch (_) {}
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
