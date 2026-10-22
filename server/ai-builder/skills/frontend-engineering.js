/**
 * World-Class Frontend Engineering & Clean Web Architecture Skill
 * Modern React, Tailwind CSS patterns, semantic HTML5, performance optimization, and Core Web Vitals.
 */

export const FRONTEND_ENGINEERING_SKILL = {
  name: 'World-Class Frontend Web Engineering',
  version: '2026.1.0-pro-max',
  description: 'Clean architectural patterns, modern Tailwind CSS mastery, sub-second performance, and Core Web Vitals.',

  // 1. Semantic DOM & Clean Document Architecture
  domArchitecture: {
    semanticLandmarks: [
      '<header> for navigation bar, branding, and global actions',
      '<main> for primary unique page content and section flow',
      '<section> with dedicated aria-labelledby or <h2> headings for independent content blocks',
      '<article> for self-contained cards, reviews, or testimonials',
      '<aside> for floating sidebars, drawer menus, or supplementary tools',
      '<footer> for copyright, trust links, social channels, and sitemaps'
    ],
    htmlBestPractices: [
      'Single <h1> per page describing primary page entity',
      'Logical heading hierarchy: h1 -> h2 -> h3 without skipping levels',
      'All <img> tags must feature explicit width/height or aspect-ratio classes to eliminate CLS (Cumulative Layout Shift)',
      'All interactive icons must feature aria-hidden="true" when accompanied by text, or aria-label when standalone',
      'External links must have target="_blank" rel="noopener noreferrer"'
    ]
  },

  // 2. Modern Tailwind CSS Mastery
  tailwindArchitecture: {
    responsiveBreakpoints: {
      mobile: 'default (<640px) - single column, full width touch targets',
      tablet: 'sm (640px) & md (768px) - 2-column grids, horizontal filters',
      desktop: 'lg (1024px) & xl (1280px) - 3 to 4 column bento grids, sticky navbars',
      wide: '2xl (1536px) - bounded container (max-w-7xl) centered with mx-auto'
    },
    utilityDiscipline: [
      'Avoid arbitrary unstandardized pixel values where standard Tailwind scale exists',
      'Group related utilities logically: Layout (flex/grid) -> Sizing (w/h) -> Spacing (p/m) -> Typography (text/font) -> Visuals (bg/border/shadow) -> Interactions (hover/active/focus)',
      'Use fluid container queries (@container) where components adapt to parent width rather than viewport alone',
      'Zero !important flags unless overriding recalcitrant third-party CSS bundles'
    ]
  },

  // 3. Performance & Core Web Vitals Standards
  performanceStandards: {
    targets: {
      LCP: '< 1.2s (Largest Contentful Paint)',
      CLS: '< 0.05 (Cumulative Layout Shift - near zero)',
      INP: '< 50ms (Interaction to Next Paint)',
      TTFB: '< 150ms (Time to First Byte)'
    },
    optimizations: [
      'Font preloading with rel="preconnect" and font-display: swap to prevent FOIT (Flash of Invisible Text)',
      'Lazy loading for below-the-fold images using loading="lazy" decoding="async"',
      'Modern image formats (AVIF and WebP with modern fallback)',
      'Inline critical CSS, asynchronous non-blocking script execution',
      'Avoid heavy unvetted third-party runtime dependencies; prefer zero-dependency vanilla JS or lean native browser APIs'
    ]
  },

  // 4. Clean Component & State Engineering
  reactArchitecture: {
    patterns: [
      'Single Responsibility: Each component renders one clear domain element',
      'Defensive Programming: Never assume nested JSON props exist without optional chaining (e.g. data?.user?.avatar || fallback)',
      'Controlled Inputs: Explicit value and onChange handlers with clear validation error surfaces',
      'Idempotent Event Handlers: Debounced button clicks to prevent double form submissions',
      'Clean State Encapsulation: Local state for UI toggles, lifted state or context for global settings'
    ]
  }
};
