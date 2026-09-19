/**
 * Centralized site URL helper for Tendercraft.
 * Ensures absolute canonical URLs, Open Graph images, robots.txt,
 * sitemap.xml, and schema.org JSON-LD use the production domain in production,
 * and localhost in development.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://tendercrafthq.com';
  }
  return 'http://localhost:3000';
}
