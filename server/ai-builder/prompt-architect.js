/**
 * Prompt Architect: Transforms Client Order Specifications into High-Performing
 * AI Web Design System Prompts & Section Blueprints.
 */
import { getMasterSkillPrompt } from './skills/index.js';

export function buildWebsitePrompt(order) {
  const typeMap = {
    beautyparlour: {
      category: 'Luxury Beauty Parlour & Bridal Studio',
      theme: 'Warm Rose-Gold, Champagne & Charcoal Slate',
      primaryColor: '#B76E79',
      accentColor: '#D4AF37',
      bgLight: '#FFFBF9',
      bgDark: '#1A1416',
      defaultTagline: 'Exquisite Bridal Artistry & Bespoke Skin Care',
      sections: [
        'Hero with High-Impact Headline & WhatsApp Appointment CTA',
        'Signature Bridal & Makeover Packages with Detailed Pricing',
        'Interactive Before & After Gallery Showcase',
        'Customer Testimonials & Bridal Stories',
        'Direct WhatsApp Consultation & Studio Location Map'
      ]
    },
    corporate: {
      category: 'Corporate Enterprise & Real Estate',
      theme: 'Executive Navy Blue, Platinum & Emerald Green',
      primaryColor: '#0F2027',
      accentColor: '#203A43',
      bgLight: '#F8FAFC',
      bgDark: '#0B132B',
      defaultTagline: 'Architecting Premium Commercial & Residential Milestones',
      sections: [
        'Hero with Metric Counters (Projects Built, Satisfied Investors)',
        'Featured Developments & Floorplan Downloads',
        'Executive Leadership & RERA Trust Accreditation',
        'Investor Inquiry & Site Visit Appointment Widget',
        'Corporate Office Coordinates & Direct Email Gateway'
      ]
    },
    ecommerce: {
      category: 'E-Commerce & D2C Brand Store',
      theme: 'Vibrant Coral, Modern Indigo & Pure Snow White',
      primaryColor: '#4F46E5',
      accentColor: '#F43F5E',
      bgLight: '#FFFFFF',
      bgDark: '#0F172A',
      defaultTagline: 'Handcrafted Perfection Delivered To Your Doorstep',
      sections: [
        'Hero Banner with Flash Sale & Shop Now Action',
        'Bestsellers Grid with Instant Quick View & Add to Cart',
        'Razorpay Payment & Cash on Delivery Security Badges',
        'Verified Buyer Reviews with Photo Ratings',
        'Shipping Guarantee, Order Tracker & WhatsApp Support'
      ]
    },
    custombuild: {
      category: 'Modern SaaS / Tech Startup',
      theme: 'Cyber Dark Mode, Electric Indigo & Neon Teal',
      primaryColor: '#6366F1',
      accentColor: '#10B981',
      bgLight: '#F3F4F6',
      bgDark: '#0B0F19',
      defaultTagline: 'Next-Generation Automated Infrastructure for High-Growth Teams',
      sections: [
        'Hero with Animated Terminal / Code Preview & Free Trial CTA',
        'Interactive Feature Matrix & API Integration Tiles',
        'Speed & Throughput Benchmark Counters',
        'Developer Friendly Documentation Teaser',
        'Enterprise Demo Request & Direct Founder WhatsApp Channel'
      ]
    },
    landing: {
      category: 'High-Converting Direct Response Landing Page',
      theme: 'Earthy Warm Cream, Rich Walnut & Crimson Accent',
      primaryColor: '#7D4047',
      accentColor: '#D97706',
      bgLight: '#F1ECE6',
      bgDark: '#2E2E2E',
      defaultTagline: 'Handcrafted Digital Experiences That Turn Visitors Into Clients',
      sections: [
        'Hero with Compelling Value Proposition & Lead Magnet',
        'Problem vs Solution Comparison Grid',
        'Social Proof & Case Study Breakdown',
        'Transparent Pricing Tier with Special Offer Badge',
        'Instant WhatsApp Consultation CTA'
      ]
    }
  };

  const matched = typeMap[order.website_type] || typeMap.landing;

  const systemInstruction = `You are an elite Lead UI/UX Web Architect and Principal Frontend Engineer. Generate a complete, stunning, responsive, and mobile-optimized single-page website for ${order.client_name || 'Client'}.
Business Type: ${matched.category}
Budget Tier: ₹${(order.final_budget || 0).toLocaleString('en-IN')}
Theme & Palette: ${matched.theme}
Client Custom Requirements: "${order.custom_instructions || 'Modern high-converting clean website'}"
Client Notes: "${order.custom_notes || 'Ensure mobile responsive and direct WhatsApp connectivity'}"

${getMasterSkillPrompt()}

Strict Generation Directives:
1. Use modern Tailwind CSS utility classes and clean HTML5 semantics (<header>, <main>, <section>, <article>, <footer>).
2. Ensure full responsiveness across Mobile, Tablet, and Desktop screens with Bento Grid layouts.
3. Every interactive element MUST feature all 5 states (default, hover, active, focus-visible, disabled).
4. Include clear Call-To-Action buttons with direct WhatsApp links (to phone: ${order.client_phone || '919876543210'}) and pre-filled inquiry text.
5. Include a Sticky Mobile Action Bar for 1-tap WhatsApp consultation.
6. Output cleanly structured code with zero console errors or broken tags.`;

  return {
    categoryInfo: matched,
    systemInstruction,
    prompt: `Generate the complete production HTML+Tailwind code for: ${order.client_name} - ${matched.category}`,
    metadata: {
      clientName: order.client_name,
      websiteType: order.website_type,
      budget: order.final_budget,
      palette: {
        primary: matched.primaryColor,
        accent: matched.accentColor,
        bgLight: matched.bgLight,
        bgDark: matched.bgDark
      },
      sections: matched.sections
    }
  };
}
