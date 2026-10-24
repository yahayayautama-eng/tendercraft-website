// Smoke-tests the Recipe Box SEO pages against a running server.
// Usage: node scripts/check-recipe-box-seo.mjs http://localhost:3100
const base = process.argv[2] ?? 'http://localhost:3100';
const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

async function page(path) {
  const res = await fetch(base + path);
  return { status: res.status, html: await res.text() };
}

const product = await page('/apps/recipe-box');
check(product.status === 200, `/apps/recipe-box returned ${product.status}`);
check((product.html.match(/<h1[\s>]/g) ?? []).length === 1, 'product page must have exactly one <h1>');
check(/rel="canonical"[^>]*href="[^"]*\/apps\/recipe-box"/.test(product.html), 'product page canonical missing');
check(product.html.includes('"@type":"SoftwareApplication"'), 'SoftwareApplication JSON-LD missing');
check(product.html.includes('"@type":"FAQPage"'), 'FAQPage JSON-LD missing');
check(product.html.includes('Recipe Box for Fire tablets'), 'canonical product name missing');
check(!product.html.includes('aggregateRating'), 'aggregateRating must not appear');

const guides = ['save-recipes-from-websites', 'keep-screen-on-while-cooking', 'best-recipe-app-for-fire-tablet', 'offline-recipe-app', 'grocery-list-from-recipes', 'recipe-box-vs-paprika-pinterest-notes'];
for (const guide of guides) {
  const g = await page(`/apps/recipe-box/${guide}`);
  check(g.status === 200, `${guide} returned ${g.status}`);
  check((g.html.match(/<h1[\s>]/g) ?? []).length === 1, `${guide} must have exactly one <h1>`);
  check(g.html.includes('href="/apps/recipe-box"'), `${guide} must link back to the product page`);
  check(g.html.includes(`/apps/recipe-box/${guide}"`), `${guide} canonical or link missing`);
  if (guides.indexOf(guide) >= 2) check(g.html.includes('"@type":"Article"'), `${guide} Article JSON-LD missing`);
}

const sitemap = await page('/sitemap.xml');
for (const path of ['/apps/recipe-box<', ...guides.map((g) => `/apps/recipe-box/${g}<`)]) {
  check(sitemap.html.includes(path), `sitemap missing ${path.slice(0, -1)}`);
}

const llms = await page('/llms.txt');
check(llms.status === 200 && llms.html.includes('Recipe Box'), 'llms.txt missing or does not mention Recipe Box');

if (failures.length) {
  console.error(`FAIL (${failures.length})\n- ` + failures.join('\n- '));
  process.exit(1);
}
console.log('PASS: Recipe Box SEO checks');
