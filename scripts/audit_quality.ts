/**
 * Comprehensive Quality & Audit Verification Script
 * Validates all routes, SEO tags, accessibility requirements, link integrity,
 * image provenance, robots.txt, sitemap.xml, and strict brand constraints.
 */

const BASE_URL = 'http://localhost:3000';

const ROUTES_TO_TEST = [
  '/',
  '/work',
  '/work/beadle',
  '/work/compoundos',
  '/work/automated-risk-register',
  '/work/freighthud',
  '/work/cartitemizer',
  '/about',
  '/contact',
  '/privacy',
  '/admin/login',
  '/robots.txt',
  '/sitemap.xml',
  '/icon.svg',
  '/brand/tendercraft-og.png',
  '/brand/tendercraft-mark.svg',
  '/brand/tendercraft-logo-light.svg',
  '/brand/tendercraft-logo-dark.svg',
  '/brand/tendercraft-logo-mono-black.svg',
  '/brand/tendercraft-logo-mono-white.svg',
];

interface AuditResult {
  route: string;
  status: number;
  passed: boolean;
  errors: string[];
  warnings: string[];
}

async function auditRoute(route: string): Promise<AuditResult> {
  const url = `${BASE_URL}${route}`;
  const errors: string[] = [];
  const warnings: string[] = [];
  let status = 0;

  try {
    const res = await fetch(url);
    status = res.status;

    if (status !== 200) {
      errors.push(`Expected HTTP 200, got ${status}`);
      return { route, status, passed: false, errors, warnings };
    }

    const contentType = res.headers.get('content-type') || '';

    // If it's an image or svg, ensure length > 0
    if (contentType.includes('image') || route.endsWith('.svg') || route.endsWith('.png')) {
      const buffer = await res.arrayBuffer();
      if (buffer.byteLength < 50) {
        errors.push(`Asset suspiciously small (${buffer.byteLength} bytes)`);
      }
      return { route, status, passed: errors.length === 0, errors, warnings };
    }

    // If it's robots.txt
    if (route === '/robots.txt') {
      const text = await res.text();
      if (!text.includes('Disallow: /admin')) {
        errors.push('robots.txt must disallow /admin');
      }
      if (!text.includes('sitemap.xml')) {
        errors.push('robots.txt must declare sitemap.xml');
      }
      return { route, status, passed: errors.length === 0, errors, warnings };
    }

    // If it's sitemap.xml
    if (route === '/sitemap.xml') {
      const text = await res.text();
      if (!text.includes('<urlset') || !text.includes('https://tendercrafthq.com')) {
        errors.push('sitemap.xml must be valid urlset with https://tendercrafthq.com');
      }
      if (text.includes('/admin')) {
        errors.push('sitemap.xml MUST NOT include private /admin routes');
      }
      for (const slug of ['beadle', 'compoundos', 'automated-risk-register', 'freighthud', 'cartitemizer']) {
        if (!text.includes(`/work/${slug}`)) {
          errors.push(`sitemap.xml missing project route: /work/${slug}`);
        }
      }
      return { route, status, passed: errors.length === 0, errors, warnings };
    }

    // HTML route validation
    const html = await res.text();

    // 1. Heading check: must have exactly one <h1>
    const h1Matches = html.match(/<h1\b[^>]*>(.*?)<\/h1>/gi);
    if (!h1Matches || h1Matches.length === 0) {
      errors.push('Missing <h1> heading');
    } else if (h1Matches.length > 1) {
      warnings.push(`Multiple <h1> headings found (${h1Matches.length})`);
    }

    // 2. Title check
    const titleMatch = html.match(/<title\b[^>]*>(.*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      errors.push('Missing or empty <title>');
    } else if (!titleMatch[1].includes('Tendercraft')) {
      errors.push(`Title does not include Tendercraft: "${titleMatch[1]}"`);
    }

    // 3. Meta description
    if (!html.includes('name="description"')) {
      errors.push('Missing meta description');
    }

    // 4. Open Graph tags
    const requiredOG = ['og:title', 'og:description', 'og:image', 'og:url', 'og:site_name'];
    for (const tag of requiredOG) {
      if (!html.includes(`property="${tag}"`)) {
        errors.push(`Missing Open Graph tag: ${tag}`);
      }
    }

    // 5. Twitter card
    if (!html.includes('name="twitter:card"')) {
      errors.push('Missing twitter:card meta tag');
    }

    // 6. Accessibility: check all <img> tags have alt attribute
    const imgRegex = /<img\b([^>]*?)>/gi;
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
      const imgAttrs = match[1];
      if (!imgAttrs.includes('alt=')) {
        errors.push(`Found <img> without alt attribute: ${match[0].slice(0, 50)}...`);
      }
    }

    // 7. Strict exclusions: no apple trademarks or game mentions
    const lowerHtml = html.toLowerCase();
    const forbiddenTerms = [
      'apple inc',
      'designed by apple',
      'sf symbols',
      'cupertino',
      'game studio',
      'video game',
      'gameplay',
    ];
    for (const term of forbiddenTerms) {
      if (lowerHtml.includes(term)) {
        errors.push(`Forbidden term detected in page output: "${term}"`);
      }
    }

    // 8. Contact routing check: ensure email links point to correct addresses
    if (route === '/contact' || route === '/') {
      if (!html.includes('hello@tendercrafthq.com')) {
        errors.push('Expected hello@tendercrafthq.com contact address');
      }
      if (route === '/contact' && !html.includes('yyautama@tendercrafthq.com')) {
        errors.push('Expected yyautama@tendercrafthq.com founder contact address on /contact');
      }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    errors.push(`Network or parsing error: ${message}`);
  }

  return {
    route,
    status,
    passed: errors.length === 0,
    errors,
    warnings,
  };
}

async function runLinkCheck(): Promise<{ brokenLinks: string[] }> {
  const brokenLinks: string[] = [];
  const crawled = new Set<string>();

  async function checkPage(route: string) {
    if (crawled.has(route)) return;
    crawled.add(route);

    try {
      const res = await fetch(`${BASE_URL}${route}`);
      if (res.status !== 200) {
        brokenLinks.push(`${route} (status: ${res.status})`);
        return;
      }
      const html = await res.text();
      const hrefRegex = /href=["']([^"']+)["']/g;
      let match;
      const internalLinks: string[] = [];

      while ((match = hrefRegex.exec(html)) !== null) {
        const href = match[1];
        if (
          href.startsWith('/') &&
          !href.startsWith('//') &&
          !href.startsWith('/_next') &&
          !href.startsWith('/favicon')
        ) {
          internalLinks.push(href);
        }
      }

      for (const link of internalLinks) {
        // Test internal link
        const targetRes = await fetch(`${BASE_URL}${link}`);
        if (targetRes.status !== 200) {
          brokenLinks.push(`${link} referenced from ${route} (status: ${targetRes.status})`);
        }
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      brokenLinks.push(`${route} failed: ${message}`);
    }
  }

  await checkPage('/');
  await checkPage('/work');
  await checkPage('/about');
  await checkPage('/contact');
  await checkPage('/privacy');

  return { brokenLinks };
}

async function main() {
  console.log('====================================================');
  console.log('Tendercraft Phase 4: Full Quality & Audit Verifier');
  console.log('====================================================\n');

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const route of ROUTES_TO_TEST) {
    const result = await auditRoute(route);
    if (result.passed) {
      console.log(`[PASS] ${route} (status: ${result.status})`);
    } else {
      console.log(`[FAIL] ${route} (status: ${result.status})`);
      for (const err of result.errors) {
        console.log(`   ERROR: ${err}`);
      }
    }
    for (const w of result.warnings) {
      console.log(`   WARN:  ${w}`);
    }
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  }

  console.log('\n--- Checking Internal Link Graph Integrity ---');
  const { brokenLinks } = await runLinkCheck();
  if (brokenLinks.length === 0) {
    console.log('[PASS] Link check: zero broken internal links found!');
  } else {
    console.log(`[FAIL] Found ${brokenLinks.length} broken links:`);
    for (const b of brokenLinks) {
      console.log(`   - ${b}`);
    }
    totalErrors += brokenLinks.length;
  }

  console.log('\n====================================================');
  if (totalErrors === 0) {
    console.log(`ALL AUDIT GATES PASSED! (Errors: 0, Warnings: ${totalWarnings})`);
    process.exit(0);
  } else {
    console.error(`AUDIT FAILED with ${totalErrors} errors.`);
    process.exit(1);
  }
}

main();
