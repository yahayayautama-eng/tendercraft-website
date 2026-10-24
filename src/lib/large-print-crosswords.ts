/** Public claims for the crossword page. Change availability only after verifying the public store URL. */
export const largePrintCrosswords = {
  name: 'Large Print Crosswords',
  path: '/apps/large-print-crosswords',
  availability: 'coming-soon' as 'coming-soon' | 'available',
  amazonUrl: null as string | null,
  supportEmail: 'hello@tendercrafthq.com',
  privacyUrl: '/large-print-crosswords/privacy.html',
  updatedAt: '2026-10-24',
  libraryPuzzles: 120,
  dailyRotationPuzzles: 30,
} as const;

export function crosswordContactUrl(subject = 'Crossword launch') {
  return `mailto:${largePrintCrosswords.supportEmail}?subject=${encodeURIComponent(subject)}`;
}
