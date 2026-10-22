import fs from 'node:fs';
import path from 'node:path';

/**
 * Tour Guide: Generates an engaging, interactive walkthrough of the website for the Admin.
 */
export function generateAdminTour(order, buildResult, healResult, thoughtStream = [], mindMetrics = null) {
  const { client_name, website_type, final_budget } = order;

  return {
    orderId: order.id,
    clientName: client_name,
    websiteType: website_type,
    finalBudget: final_budget,
    healthScore: healResult.healthScore,
    selfHealingSummary: healResult.statusMessage,
    previewUrl: `/client-demos/${order.id}/index.html`,
    thoughtStream,
    mindMetrics,
    tourSteps: [
      {
        step: 1,
        title: '🌟 Header & Brand Identity',
        description: `Custom branded navigation bar featuring "${client_name}" monogram, category tag, responsive desktop links, and instant WhatsApp inquiry badge.`,
        icon: 'Sparkles'
      },
      {
        step: 2,
        title: '🎯 High-Impact Hero Section',
        description: 'Conversion-focused bold typography, value proposition tailored to client requirements, and dual primary CTAs (Explore Packages & Call Direct).',
        icon: 'Layout'
      },
      {
        step: 3,
        title: '💼 Signature Services & Offerings',
        description: 'Interactive 3-column feature grid with hover-lift elevation cards highlighting consultation, quality execution, and direct support.',
        icon: 'Briefcase'
      },
      {
        step: 4,
        title: '💳 Transparent Pricing Packages',
        description: `Tailored pricing tiers matching the ₹${(final_budget || 0).toLocaleString('en-IN')} budget, highlighting standard and VIP all-inclusive options with direct booking.`,
        icon: 'DollarSign'
      },
      {
        step: 5,
        title: '📱 Mobile-First Responsive & WhatsApp Action',
        description: `100% mobile responsive layout with direct click-to-WhatsApp link mapped directly to client contact (${order.client_phone}).`,
        icon: 'Smartphone'
      }
    ],
    readyForAdminReview: true,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Applies Admin/Client requested modifications to the generated project
 */
export function applyModifications(indexPath, modificationText) {
  if (!fs.existsSync(indexPath)) return false;

  let content = fs.readFileSync(indexPath, 'utf8');

  // Simple smart text injector/replacer based on user intent
  const lower = modificationText.toLowerCase();

  // If user wants to change phone/contact
  const phoneMatch = modificationText.match(/\b\d{10}\b/);
  if (phoneMatch) {
    const newPhone = phoneMatch[0];
    content = content.replace(/tel:\d+/g, `tel:${newPhone}`);
    content = content.replace(/wa\.me\/\d+/g, `wa.me/91${newPhone}`);
  }

  // If user wants to inject custom note or message
  if (lower.includes('title') || lower.includes('headline')) {
    // Inject custom headline if quoted
    const quoted = modificationText.match(/["']([^"']+)["']/);
    if (quoted && quoted[1]) {
      content = content.replace(/<h1[^>]*>.*?<\/h1>/s, `<h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">${quoted[1]}</h1>`);
    }
  }

  // Append a changelog comment in HTML
  const stamp = `<!-- Admin revision applied: ${new Date().toISOString()} | "${modificationText.replace(/-->/g, '')}" -->\n`;
  content = content.replace('</body>', `${stamp}</body>`);

  fs.writeFileSync(indexPath, content, 'utf8');
  return true;
}
