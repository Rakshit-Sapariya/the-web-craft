import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENT_BUILDS_DIR = path.join(__dirname, '..', '..', 'client-builds');

/**
 * Autonomous Code Generator:
 * Creates the production-ready website inside `client-builds/<order-id>/index.html`.
 */
export function generateClientWebsite(order, promptData, rawAiOutput = null) {
  const orderId = order.id;
  const projectDir = path.join(CLIENT_BUILDS_DIR, orderId);

  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  let finalHtml = '';

  // 1. If LLM provided valid HTML code, extract and sanitize it
  if (rawAiOutput && rawAiOutput.includes('<html') && rawAiOutput.includes('</html>')) {
    finalHtml = rawAiOutput
      .replace(/^```html\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();
  } else {
    // 2. Synthesize High-End Bespoke Studio Architecture
    finalHtml = synthesizeStudioWebsite(order, promptData);
  }

  const indexPath = path.join(projectDir, 'index.html');
  fs.writeFileSync(indexPath, finalHtml, 'utf8');

  return {
    orderId,
    projectDir,
    indexPath,
    fileSize: Buffer.byteLength(finalHtml, 'utf8'),
    sections: promptData.metadata.sections,
    palette: promptData.metadata.palette,
  };
}

/**
 * High-Converting Studio Template Synthesizer
 */
function synthesizeStudioWebsite(order, promptData) {
  const { clientName, websiteType, budget, palette, sections } = promptData.metadata;
  const clientPhone = order.client_phone || '9879123450';
  const categoryInfo = promptData.categoryInfo;
  const instructions = order.custom_instructions || 'Custom business website with direct WhatsApp inquiries.';

  return `<!DOCTYPE html>
<html lang="gu-IN" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(clientName)} &bull; ${escapeHtml(categoryInfo.category)}</title>
  <!-- Tailwind CSS CDN for instant styling -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts: Inter & Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brandPrimary: '${palette.primary}',
            brandAccent: '${palette.accent}',
            brandLight: '${palette.bgLight}',
            brandDark: '${palette.bgDark}',
          },
          fontFamily: {
            heading: ['"Plus Jakarta Sans"', 'sans-serif'],
            body: ['"Inter"', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Inter', sans-serif; background-color: ${palette.bgLight}; color: #1E293B; }
    h1, h2, h3, h4 { font-family: 'Plus Jakarta Sans', sans-serif; }
    .glass-card {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    .hover-lift {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .hover-lift:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.15);
    }
  </style>
</head>
<body class="antialiased min-h-screen flex flex-col justify-between selection:bg-brandPrimary selection:text-white">

  <!-- TOP HEADER / NAVBAR -->
  <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-brandPrimary text-white flex items-center justify-center font-bold text-lg shadow-md">
          ${escapeHtml(clientName.charAt(0))}
        </div>
        <div>
          <span class="text-lg font-extrabold tracking-tight text-gray-900 block">${escapeHtml(clientName)}</span>
          <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">${escapeHtml(categoryInfo.category)}</span>
        </div>
      </div>

      <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
        <a href="#services" class="hover:text-brandPrimary transition-colors">Services</a>
        <a href="#packages" class="hover:text-brandPrimary transition-colors">Pricing &amp; Packages</a>
        <a href="#about" class="hover:text-brandPrimary transition-colors">About</a>
        <a href="#contact" class="hover:text-brandPrimary transition-colors">Contact</a>
      </nav>

      <div class="flex items-center gap-3">
        <a 
          href="https://wa.me/91${clientPhone.replace(/\\D/g, '')}?text=Hello%20${encodeURIComponent(clientName)},%20I%20would%20like%20to%20inquire%20about%20your%20services." 
          target="_blank"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
        >
          <span>WhatsApp Inquiry</span>
          <svg width="16" height="16" style="width:16px;height:16px;min-width:16px;display:inline-block;" class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.761.812 2.796.812 3.179 0 5.766-2.587 5.766-5.766 0-3.18-2.587-5.767-5.766-5.767zm0-2c4.28 0 7.766 3.486 7.766 7.767 0 4.28-3.486 7.766-7.766 7.766-1.332 0-2.583-.34-3.676-.94l-4.355 1.14 1.161-4.243c-.672-1.127-1.063-2.433-1.063-3.723 0-4.281 3.486-7.767 7.767-7.767z"/></svg>
        </a>
      </div>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50/50">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brandPrimary/10 text-brandPrimary text-xs font-bold uppercase tracking-wider">
        ✨ Official Business Portal &bull; Verified Build
      </div>
      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
        ${escapeHtml(categoryInfo.defaultTagline)}
      </h1>
      <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        ${escapeHtml(instructions)}
      </p>

      <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a 
          href="#packages" 
          class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brandPrimary hover:opacity-95 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
        >
          Explore Packages &amp; Rates
        </a>
        <a 
          href="tel:${clientPhone}" 
          class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-sm shadow-sm transition-all"
        >
          Call: ${escapeHtml(clientPhone)}
        </a>
      </div>
    </div>
  </section>

  <!-- HIGHLIGHT SERVICES & FEATURES -->
  <section id="services" class="py-16 sm:py-20 bg-white border-y border-gray-100">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
      <div class="text-center space-y-3">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900">Our Signature Offerings</h2>
        <p class="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
          Tailored solutions designed with premium standards, unmatched attention to detail, and client satisfaction.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover-lift space-y-4">
          <div class="w-12 h-12 rounded-xl bg-brandPrimary/10 text-brandPrimary flex items-center justify-center font-bold text-xl">
            01
          </div>
          <h3 class="text-xl font-bold text-gray-900">Premium Consultation</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            One-on-one personalized consultation to map out requirements, custom scheduling, and seamless coordination.
          </p>
        </div>

        <div class="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover-lift space-y-4">
          <div class="w-12 h-12 rounded-xl bg-brandPrimary/10 text-brandPrimary flex items-center justify-center font-bold text-xl">
            02
          </div>
          <h3 class="text-xl font-bold text-gray-900">Full Execution &amp; Quality</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            End-to-end service delivery using top-tier materials, trusted methodologies, and 100% satisfaction assurance.
          </p>
        </div>

        <div class="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover-lift space-y-4">
          <div class="w-12 h-12 rounded-xl bg-brandPrimary/10 text-brandPrimary flex items-center justify-center font-bold text-xl">
            03
          </div>
          <h3 class="text-xl font-bold text-gray-900">Direct WhatsApp Assistance</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Instant updates, digital receipts, and real-time support on your WhatsApp number without any delays.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- PACKAGES / PRICING SECTION -->
  <section id="packages" class="py-16 sm:py-24 bg-brandLight/60">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
      <div class="text-center space-y-3">
        <span class="text-xs font-bold text-brandPrimary tracking-wider uppercase">Transparent Pricing</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900">Select Your Ideal Package</h2>
        <p class="text-sm text-gray-600 max-w-lg mx-auto">
          Clear, straightforward plans without hidden fees.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- Standard Package -->
        <div class="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div class="space-y-4">
            <span class="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">Standard Edition</span>
            <h3 class="text-2xl font-bold text-gray-900">Starter Package</h3>
            <div class="text-3xl font-black text-gray-900">₹${Math.round(budget * 0.6).toLocaleString('en-IN')}</div>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">✓ Essential Service Suite</li>
              <li class="flex items-center gap-2">✓ Standard Turnaround</li>
              <li class="flex items-center gap-2">✓ WhatsApp Support</li>
            </ul>
          </div>
          <a 
            href="https://wa.me/91${clientPhone.replace(/\\D/g, '')}?text=I%20am%20interested%20in%20Starter%20Package" 
            target="_blank"
            class="block text-center py-3 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all"
          >
            Choose Starter
          </a>
        </div>

        <!-- Premium VIP Package -->
        <div class="p-8 rounded-3xl bg-white border-2 border-brandPrimary shadow-xl relative space-y-6 flex flex-col justify-between">
          <div class="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-brandPrimary text-white text-[11px] font-extrabold uppercase tracking-wider">
            Most Popular
          </div>
          <div class="space-y-4">
            <span class="inline-block px-3 py-1 rounded-full bg-brandPrimary/10 text-brandPrimary text-xs font-bold">Full Suite</span>
            <h3 class="text-2xl font-bold text-gray-900">All-Inclusive Master</h3>
            <div class="text-3xl font-black text-brandPrimary">₹${budget.toLocaleString('en-IN')}</div>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">✓ VIP Priority Booking</li>
              <li class="flex items-center gap-2">✓ Full Feature Deliverables</li>
              <li class="flex items-center gap-2">✓ Dedicated Manager Support</li>
              <li class="flex items-center gap-2">✓ Free Lifetime Consultation</li>
            </ul>
          </div>
          <a 
            href="https://wa.me/91${clientPhone.replace(/\\D/g, '')}?text=I%20am%20interested%20in%20All-Inclusive%20Package" 
            target="_blank"
            class="block text-center py-3 rounded-xl bg-brandPrimary hover:opacity-90 text-white text-xs font-bold shadow-md transition-all"
          >
            Book Master Plan
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- STICKY MOBILE ACTION BAR (CRO & A11Y) -->
  <aside class="fixed bottom-4 left-4 right-4 z-50 md:hidden" aria-label="Mobile quick contact">
    <a 
      href="https://wa.me/91${clientPhone.replace(/\\D/g, '')}?text=Hello%20${encodeURIComponent(clientName)},%20I%20would%20like%20to%20inquire%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      class="w-full min-h-[48px] px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl transition-all"
    >
      <svg width="18" height="18" style="width:18px;height:18px;min-width:18px;display:inline-block;" class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.771.714 2.796.715 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.767-5.768-5.767zm0 10.368c-.886 0-1.748-.238-2.496-.688l-.179-.106-1.854.486.495-1.808-.117-.187c-.496-.789-.757-1.704-.756-2.646.002-2.539 2.067-4.604 4.607-4.604 2.54 0 4.606 2.065 4.607 4.604-.001 2.54-2.067 4.605-4.607 4.605z"/></svg>
      <span>Instant WhatsApp Inquiry</span>
    </a>
  </aside>

  <!-- CONTACT & FOOTER -->
  <footer id="contact" class="bg-gray-900 text-white py-12 border-t border-gray-800 pb-24 md:pb-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
      <div class="space-y-1">
        <div class="text-lg font-extrabold text-white">${escapeHtml(clientName)}</div>
        <p class="text-xs text-gray-400">&copy; ${new Date().getFullYear()} ${escapeHtml(clientName)}. Engineered via The WebCraft Studio.</p>
      </div>

      <div class="flex items-center gap-4 text-xs text-gray-300">
        <a href="tel:${clientPhone}" class="hover:text-white transition-colors">Direct Phone: ${escapeHtml(clientPhone)}</a>
        <span>&bull;</span>
        <a href="https://wa.me/91${clientPhone.replace(/\\D/g, '')}" class="text-emerald-400 hover:text-emerald-300 font-bold">WhatsApp Live</a>
      </div>
    </div>
  </footer>

</body>
</html>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
