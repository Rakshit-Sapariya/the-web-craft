/**
 * World-Class Accessibility (A11y) & WCAG 2.2 Standards Skill
 * Keyboard navigation, screen readers, contrast ratios, and touch targets.
 */

export const ACCESSIBILITY_SKILL = {
  name: 'World-Class Web Accessibility (WCAG 2.2 AAA)',
  version: '2026.1.0-pro-max',
  description: 'Uncompromising digital accessibility for all users, assistive tech compliance, and sensory independence.',

  // 1. Touch Target Geometry
  touchTargetStandards: {
    mobileMinSize: '44x44px (min-h-[44px] min-w-[44px]) for all touch targets on mobile viewports',
    desktopMinSize: '36x36px for dense desktop toolbars with at least 8px spacing buffer',
    thumbZoneRule: 'Primary mobile conversion actions must sit in the natural lower 1/3 screen reach zone (Sticky Mobile Action Pill)'
  },

  // 2. Keyboard Navigation & Focus Flow
  keyboardAccessibility: {
    logicalTabOrder: 'DOM order must match visual reading order strictly (no visual reordering that breaks tab sequence)',
    focusVisibility: [
      'Focus indicators must NEVER be completely removed (never use outline-none without replacing with focus-visible:ring-2)',
      'High-contrast focus ring with distinct offset: focus-visible:ring-2 focus-visible:ring-offset-2',
      'Modal dialogs must trap keyboard focus while open and restore focus to trigger button upon close'
    ],
    shortcuts: [
      'Escape key closes open dialogs, menus, and popovers',
      'Enter and Space key trigger button activations',
      'Arrow keys traverse menus, tabs, and radio groups'
    ]
  },

  // 3. Screen Reader & ARIA Standards
  screenReaderRules: [
    'Interactive icons without visible text MUST include aria-label="Descriptive action"',
    'Decorative icons alongside visible text MUST include aria-hidden="true"',
    'Collapsible accordions, dropdowns, and mobile menus MUST toggle aria-expanded="true/false"',
    'Form inputs MUST have explicitly linked <label for="id"> tags; placeholders are NOT accessible labels',
    'Status messages, toast alerts, and live error banners MUST feature role="status" or role="alert" with aria-live="polite"'
  ],

  // 4. Sensory & Cognitive Independence
  sensoryRules: [
    'Color Independence: Critical information (success, errors, warnings) must NEVER be conveyed solely through color. Always pair with an icon and clear explanatory text.',
    'Reduced Motion: Always respect @media (prefers-reduced-motion: reduce) by disabling or dampening spring physics and continuous animations.',
    'Text Resizing: Layouts must accommodate 200% browser text zoom without clipping, overlap, or horizontal scrollbar emergence.',
    'Seizure Prevention: No component may flash more than 3 times in any 1-second period.'
  ]
};
