import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

const aiCrawlers = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Bingbot'];

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/admin'] },
      { userAgent: aiCrawlers, allow: '/', disallow: ['/admin/', '/admin'] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
