import type React from 'react';

/** The three signature colours, cycled across projects so each case study has its own identity. */
export const ACCENTS = [
  { name: 'violet', hex: 'var(--tc-violet)', light: 'var(--tc-violet-text)', soft: 'rgba(124,92,255,0.35)', tint: 'rgba(124,92,255,0.12)' },
  { name: 'mint', hex: 'var(--tc-mint)', light: 'var(--tc-mint-text)', soft: 'rgba(61,242,192,0.28)', tint: 'rgba(61,242,192,0.12)' },
  { name: 'coral', hex: 'var(--tc-coral)', light: 'var(--tc-coral-text)', soft: 'rgba(255,107,87,0.3)', tint: 'rgba(255,107,87,0.12)' },
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
