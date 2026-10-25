/** US product identity and ASIN verified in the public Amazon listing October 25, 2026.
 * UK package link follows Amazon's documented format; regional availability may differ.
 */
export const largePrintCrosswords = {
  name: 'Large Print Crosswords',
  path: '/apps/large-print-crosswords',
  availability: 'published' as 'coming-soon' | 'published',
  amazonUrl: 'https://www.amazon.com/dp/B0HMRD2PNV' as string | null,
  asin: 'B0HMRD2PNV',
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
