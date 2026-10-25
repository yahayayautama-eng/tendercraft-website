/** Console publication verified October 24; package links follow Amazon's documented deep-link format.
 * Retail pages returned HTTP 503 during verification. Replace with a verified ASIN URL when available.
 */
export const largePrintCrosswords = {
  name: 'Large Print Crosswords',
  path: '/apps/large-print-crosswords',
  availability: 'published' as 'coming-soon' | 'published',
  amazonUrl: 'https://www.amazon.com/gp/mas/dl/android?p=com.largeprintcrosswords' as string | null,
  amazonUkUrl: 'https://www.amazon.co.uk/gp/mas/dl/android?p=com.largeprintcrosswords',
  publishedAt: '2026-10-15',
  supportEmail: 'hello@tendercrafthq.com',
  privacyUrl: '/large-print-crosswords/privacy.html',
  updatedAt: '2026-10-25',
  libraryPuzzles: 120,
  dailyRotationPuzzles: 30,
} as const;

export function crosswordContactUrl(subject = 'Large Print Crosswords device availability') {
  return `mailto:${largePrintCrosswords.supportEmail}?subject=${encodeURIComponent(subject)}`;
}
