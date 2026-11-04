import type React from 'react';

/** The three signature colours, cycled across projects so each case study has its own identity. */
export const ACCENTS = [
  { name: 'violet', hex: '#7C5CFF', light: '#A08AFF', soft: 'rgba(124,92,255,0.35)' },
  { name: 'mint', hex: '#3DF2C0', light: '#7DF7D6', soft: 'rgba(61,242,192,0.28)' },
  { name: 'coral', hex: '#FF6B57', light: '#FF9A8B', soft: 'rgba(255,107,87,0.3)' },
] as const;

export type Accent = (typeof ACCENTS)[number];

const SLUG_ORDER = ['beadle', 'compoundos', 'automated-risk-register', 'freighthud', 'cartitemizer'];

export function accentForSlug(slug: string): Accent {
  let i = SLUG_ORDER.indexOf(slug);
  if (i < 0) i = [...slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  return ACCENTS[i % ACCENTS.length];
}

/** CSS custom properties consumed by `--project-accent*` utilities. */
export function accentStyle(accent: Accent): React.CSSProperties {
  return {
    '--project-accent': accent.hex,
    '--project-accent-hover': accent.light,
    '--project-accent-fg-dark': accent.light,
    '--project-accent-tint': accent.soft,
    '--project-accent-tint-dark': accent.soft,
    '--project-accent-border': accent.hex,
    '--project-accent-border-dark': accent.hex,
    '--accent-soft': accent.soft,
  } as React.CSSProperties;
}
