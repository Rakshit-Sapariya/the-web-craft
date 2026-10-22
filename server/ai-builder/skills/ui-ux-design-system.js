/**
 * World-Class UI/UX Design System Skill
 * Comprehensive visual hierarchy, typography, color harmony, spatial systems, and micro-interactions.
 */

export const UI_UX_DESIGN_SKILL = {
  name: 'World-Class UI/UX Design System',
  version: '2026.1.0-pro-max',
  description: 'Elite visual aesthetics, layout heuristics, typography scales, color theory, and micro-interactions.',

  // 1. Visual Hierarchy & Spatial Heuristics
  visualHierarchy: {
    eyeTrackingPatterns: [
      'F-Pattern for text-heavy editorial & blog layouts',
      'Z-Pattern for high-converting marketing landing pages and hero banners',
      'Inverted Pyramid for headline -> value proposition -> primary action CTA'
    ],
    gridSystem: {
      baseUnit: 8, // 8-point mathematical grid system
      subUnit: 4,  // 4-point micro spacing for badges, tags, and icon offsets
      containerMax: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      cardPaddings: {
        compact: 'p-3 sm:p-4',
        standard: 'p-5 sm:p-6',
        spacious: 'p-6 sm:p-8 lg:p-10'
      },
      gapScales: {
        tight: 'gap-2 sm:gap-3',
        standard: 'gap-4 sm:gap-6',
        generous: 'gap-6 sm:gap-8 lg:gap-12'
      }
    },
    bentoGridPrinciples: [
      'Asymmetric visual weight (one hero feature tile spanning 2 columns or 2 rows)',
      'Subtle alpha borders (border-black/5 on light, border-white/10 on dark)',
      'Layered ambient depth with dual shadows (shadow-xs + shadow-sm)',
      'Corner radius hierarchy: outer container rounded-3xl (24px), inner cards rounded-2xl (16px), badges rounded-full'
    ]
  },

  // 2. Typography Masterclass
  typography: {
    fontPairings: [
      {
        vibe: 'Modern Clean & High-Conversion (Default)',
        heading: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
        body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        weights: { heading: 'font-extrabold tracking-tight', body: 'font-normal leading-relaxed' }
      },
      {
        vibe: 'Luxury & Haute Couture (Beauty, Bridal, Fashion)',
        heading: '"Playfair Display", Georgia, serif',
        body: '"Plus Jakarta Sans", sans-serif',
        weights: { heading: 'font-bold tracking-normal', body: 'font-light leading-relaxed' }
      },
      {
        vibe: 'Executive Corporate & Architectural (Finance, Real Estate)',
        heading: '"Outfit", "Plus Jakarta Sans", sans-serif',
        body: '"Inter", sans-serif',
        weights: { heading: 'font-black tracking-tight', body: 'font-normal leading-relaxed' }
      },
      {
        vibe: 'Tech SaaS & Cyberpunk (Developer tools, AI)',
        heading: '"Syne", "Plus Jakarta Sans", sans-serif',
        body: '"Inter", monospace fallback',
        weights: { heading: 'font-extrabold tracking-tighter', body: 'font-normal leading-normal' }
      }
    ],
    scale: {
      heroHeading: 'text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]',
      sectionHeading: 'text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight',
      subheading: 'text-sm sm:text-base lg:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed',
      cardTitle: 'text-lg sm:text-xl font-bold tracking-tight',
      bodyText: 'text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed',
      caption: 'text-xs sm:text-sm text-zinc-500 font-medium',
      badge: 'text-[10px] sm:text-xs font-bold uppercase tracking-wider font-mono'
    },
    readabilityRules: [
      'Maximum line-length for paragraph readability: 65 to 75 characters (max-w-prose or max-w-2xl)',
      'Heading line-height tight (leading-tight or leading-[1.15]) to prevent awkward multi-line gaping',
      'Body line-height relaxed (leading-relaxed or leading-7) to eliminate visual fatigue'
    ]
  },

  // 3. Color Harmony & Lighting
  colorTheory: {
    rule60_30_10: {
      dominant60: 'Canvas/Background (60%): Crisp clean white (#FFFFFF) / warm sand (#FDFBF7) / dark luxury (#0B0F17)',
      secondary30: 'Structure & Typography (30%): Deep charcoal (#1E1E24) cards, borders (#E4E4E7), and slate text (#4B5563)',
      accent10: 'High-Impact Action & Delight (10%): Primary Brand Accent (Emerald, Wine Rose, Electric Indigo) reserved for CTAs and highlights'
    },
    contrastStandards: {
      bodyTextMinimum: '4.5:1 contrast against background (WCAG AA)',
      largeHeadingMinimum: '3.0:1 contrast against background',
      uiElementsMinimum: '3.0:1 contrast against adjacent background'
    },
    lightingAndShadows: {
      ambientLight: 'Layered soft multi-stop shadow (box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05))',
      elevatedCard: 'box-shadow: 0 20px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.04)',
      glassmorphism: 'backdrop-blur-md bg-white/70 dark:bg-black/60 border border-white/20 dark:border-white/10'
    }
  },

  // 4. Five Mandatory Interactive States
  interactiveStates: {
    rule: 'Every clickable component MUST feature all 5 distinct states',
    states: {
      default: 'Crisp baseline state with clean border and readable typography',
      hover: 'Subtle brightness lift (+5-10%), gentle shadow elevation (hover:shadow-md), micro lift (hover:-translate-y-0.5)',
      active: 'Tactile press feedback with micro scale-down (active:scale-[0.98] or active:scale-95)',
      focusVisible: 'Unambiguous keyboard accessibility ring (focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none)',
      disabled: 'Clear disabled indicator with preserved layout (opacity-50 cursor-not-allowed pointer-events-none)'
    }
  },

  // 5. Micro-Interactions & Fluid Motion
  motion: {
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Snappy yet smooth spring deceleration
    durations: {
      micro: '150ms', // For buttons, pills, toggles
      medium: '300ms', // For card hovers, modal fades, drawer slides
      ambient: '700ms' // For accordion expands, skeleton shimmers
    },
    rules: [
      'Always use transform and opacity for animations (GPU-accelerated, zero CPU repaints)',
      'Respect prefers-reduced-motion media query (motion-reduce:transition-none)',
      'Never animate layout dimensions (width, height) directly without container clipping'
    ]
  }
};
