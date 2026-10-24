/** Public claims for the Visual Schedule Board page. Set amazonUrl and availability only after verifying the public store URL. */
export const visualScheduleBoard = {
  name: 'Visual Schedule Board',
  path: '/apps/visual-schedule-board',
  availability: 'coming-soon' as 'coming-soon' | 'available',
  amazonUrl: null as string | null,
  supportEmail: 'info@tendercrafthq.com',
  privacyUrl: '/visual-schedule-board/privacy.html',
  updatedAt: '2026-10-24',
  pictureCount: 74,
  freeChildren: 1,
  freeRoutines: 2,
} as const;

export function visualScheduleContactUrl(subject = 'Visual Schedule Board question') {
  return `mailto:${visualScheduleBoard.supportEmail}?subject=${encodeURIComponent(subject)}`;
}
