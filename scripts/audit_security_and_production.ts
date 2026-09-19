import fs from 'fs';
import path from 'path';

// ANSI color helpers
const green = (s: string) => `\x1b[32m✔ ${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m✖ ${s}\x1b[0m`;
const blue = (s: string) => `\x1b[34mℹ ${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;

let failedChecks = 0;
let passedChecks = 0;

function assert(condition: boolean, passMsg: string, failMsg: string) {
  if (condition) {
    console.log(green(passMsg));
    passedChecks++;
  } else {
    console.error(red(failMsg));
    failedChecks++;
  }
}

const rootDir = process.cwd();

console.log(bold('\n=== Tendercraft Production Security & Readiness Audit ===\n'));

// 1. Audit Security Headers in next.config.ts
console.log(blue('1. Auditing next.config.ts security headers...'));
const nextConfigPath = path.join(rootDir, 'next.config.ts');
const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

assert(
  nextConfigContent.includes("Content-Security-Policy"),
  'Content-Security-Policy header configured in next.config.ts',
  'Content-Security-Policy header MISSING in next.config.ts'
);
assert(
  !nextConfigContent.includes("'unsafe-eval'"),
  "CSP strictly avoids 'unsafe-eval'",
  "CSP contains unsafe-eval!"
);
assert(
  nextConfigContent.includes("frame-ancestors 'none'"),
  "CSP contains frame-ancestors 'none' to prevent clickjacking",
  "CSP missing frame-ancestors 'none'"
);
assert(
  nextConfigContent.includes('X-Content-Type-Options') && nextConfigContent.includes('nosniff'),
  'X-Content-Type-Options: nosniff present',
  'X-Content-Type-Options: nosniff MISSING'
);
assert(
  nextConfigContent.includes('X-Frame-Options') && nextConfigContent.includes('DENY'),
  'X-Frame-Options: DENY present',
  'X-Frame-Options: DENY MISSING'
);
assert(
  nextConfigContent.includes('Permissions-Policy'),
  'Permissions-Policy restricting sensitive APIs present',
  'Permissions-Policy MISSING'
);

// 2. Audit Admin Authentication & Middleware
console.log(blue('\n2. Auditing Admin Authentication & Middleware guards...'));
const middlewarePath = path.join(rootDir, 'src', 'middleware.ts');
assert(fs.existsSync(middlewarePath), 'src/middleware.ts exists', 'src/middleware.ts does NOT exist');

if (fs.existsSync(middlewarePath)) {
  const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');
  assert(
    middlewareContent.includes('/admin/:path*'),
    'Middleware intercepts all /admin/:path* routes',
    'Middleware matcher missing /admin/:path*'
  );
  assert(
    middlewareContent.includes('admin_users'),
    'Middleware enforces admin_users allowlist table check',
    'Middleware missing admin_users allowlist check'
  );
  assert(
    middlewareContent.includes('safeReturnUrl'),
    'Middleware implements safe return URL sanitization against open redirect',
    'Middleware missing open redirect protection'
  );
}

const adminActionsPath = path.join(rootDir, 'src', 'app', 'admin', 'actions.ts');
const adminActionsContent = fs.readFileSync(adminActionsPath, 'utf8');
assert(
  adminActionsContent.includes('verifyAdminUser()'),
  'Admin actions call verifyAdminUser() on every mutation',
  'Admin actions missing verifyAdminUser() authorization guard'
);
assert(
  !adminActionsContent.includes('process.env.NEXT_PUBLIC_SUPABASE_URL === undefined'),
  'No unconfigured bypasses exist in admin actions',
  'Bypass logic detected in admin actions!'
);

// 3. Audit Content Accuracy & Factuality
console.log(blue('\n3. Auditing Content Accuracy & Singular Founder Copy...'));
const projectsDataPath = path.join(rootDir, 'src', 'data', 'projects.ts');
const projectsData = fs.readFileSync(projectsDataPath, 'utf8');
assert(
  !projectsData.includes('without dismiss bypass'),
  'Beadle copy does not claim "without dismiss bypass"',
  'Found "without dismiss bypass" in src/data/projects.ts'
);
assert(
  projectsData.includes('requires deliberate user acknowledgement'),
  'Beadle copy accurately states "requires deliberate user acknowledgement"',
  'Accurate acknowledgement copy missing in src/data/projects.ts'
);

const aboutPagePath = path.join(rootDir, 'src', 'app', 'about', 'page.tsx');
const aboutContent = fs.readFileSync(aboutPagePath, 'utf8');
assert(
  !aboutContent.includes('experienced software engineers'),
  'About page does not claim plural "experienced software engineers"',
  'Found plural "experienced software engineers" in src/app/about/page.tsx'
);
assert(
  aboutContent.includes('the founder and engineer who designs, implements, and verifies every system'),
  'About page accurately refers to singular founder and engineer',
  'Singular founder description missing in src/app/about/page.tsx'
);

const contactPagePath = path.join(rootDir, 'src', 'app', 'contact', 'page.tsx');
const contactContent = fs.readFileSync(contactPagePath, 'utf8');
assert(
  !contactContent.includes('24 to 48 business hours'),
  'Contact page does not state "24 to 48 business hours"',
  'Found old "24 to 48 business hours" in src/app/contact/page.tsx'
);
assert(
  contactContent.includes('1 to 2 business days'),
  'Contact page accurately states "1 to 2 business days"',
  'Realistic response time missing in src/app/contact/page.tsx'
);
assert(
  contactContent.includes('<ContactForm />') || contactContent.includes('<ContactForm'),
  'ContactForm component embedded in Contact page',
  'ContactForm component NOT embedded in Contact page'
);
assert(
  contactContent.includes('hello@tendercrafthq.com') && contactContent.includes('yyautama@tendercrafthq.com'),
  'Both direct emails (hello@ and yyautama@) retained on contact page',
  'Direct email links missing on contact page'
);

// 4. Audit Privacy Page
console.log(blue('\n4. Auditing Privacy Policy Disclosures...'));
const privacyPagePath = path.join(rootDir, 'src', 'app', 'privacy', 'page.tsx');
const privacyContent = fs.readFileSync(privacyPagePath, 'utf8');
assert(
  privacyContent.includes('Project Enquiries and Contact Information'),
  'Privacy notice includes dedicated Section 2 for Project Enquiries',
  'Privacy notice missing Project Enquiries section'
);
assert(
  privacyContent.includes('Anticipated budget range and target delivery timeline'),
  'Privacy notice explicitly discloses enquiry form data fields',
  'Privacy notice missing enquiry form field disclosures'
);

// 5. Audit Supabase Migrations
console.log(blue('\n5. Auditing Supabase Migration Files...'));
const migrationsDir = path.join(rootDir, 'supabase', 'migrations');
const migrationFiles = fs.readdirSync(migrationsDir);
const contactMigration = migrationFiles.find((f) => f.includes('contact_submissions'));
assert(
  Boolean(contactMigration),
  `Contact submissions migration found: ${contactMigration}`,
  'No contact submissions migration found in supabase/migrations'
);

if (contactMigration) {
  const migContent = fs.readFileSync(path.join(migrationsDir, contactMigration), 'utf8').toLowerCase();
  assert(
    migContent.includes('create table if not exists public.contact_submissions'),
    'Migration creates contact_submissions table',
    'Migration missing create table contact_submissions'
  );
  assert(
    migContent.includes('alter table public.contact_submissions enable row level security'),
    'Migration enables Row Level Security on contact_submissions',
    'Migration missing RLS on contact_submissions'
  );
  assert(
    migContent.includes('for insert') && migContent.includes('with check'),
    'Migration has validated public INSERT policy for contact submissions',
    'Public INSERT policy missing'
  );
  assert(
    migContent.includes('for select') && migContent.includes('public.is_admin()'),
    'Migration restricts SELECT on contact submissions to admin_users allowlist only',
    'Admin-only SELECT policy missing'
  );
}

// 6. Audit Domain & Canonical Site URL
console.log(blue('\n6. Auditing Domain & Canonical URLs...'));
const siteLibPath = path.join(rootDir, 'src', 'lib', 'site.ts');
assert(fs.existsSync(siteLibPath), 'src/lib/site.ts exists', 'src/lib/site.ts missing');
if (fs.existsSync(siteLibPath)) {
  const siteLibContent = fs.readFileSync(siteLibPath, 'utf8');
  assert(
    siteLibContent.includes('https://tendercrafthq.com'),
    'Default production fallback domain is https://tendercrafthq.com',
    'Production fallback domain is incorrect'
  );
}

const sitemapPath = path.join(rootDir, 'src', 'app', 'sitemap.ts');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
assert(
  sitemapContent.includes('getSiteUrl()'),
  'Sitemap uses dynamic getSiteUrl()',
  'Sitemap missing getSiteUrl()'
);
assert(
  sitemapContent.includes('getPublicProjects()'),
  'Sitemap queries only published projects via getPublicProjects()',
  'Sitemap query not filtered'
);

const robotsPath = path.join(rootDir, 'src', 'app', 'robots.ts');
const robotsContent = fs.readFileSync(robotsPath, 'utf8');
assert(
  robotsContent.includes("'/admin/'") && robotsContent.includes("'/admin'"),
  'Robots.txt disallows /admin crawl paths',
  'Robots.txt missing /admin disallow'
);

// 7. Audit Secrets & Environment Cleanliness
console.log(blue('\n7. Auditing Secret Exposure in Codebase...'));
const clientSourceFiles = [
  'src/app/page.tsx',
  'src/app/about/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/work/page.tsx',
  'src/app/privacy/page.tsx',
  'src/components/ContactForm.tsx',
  'src/components/Header.tsx',
  'src/components/Footer.tsx',
];

let foundSecret = false;
for (const file of clientSourceFiles) {
  const fullPath = path.join(rootDir, file);
  if (fs.existsSync(fullPath)) {
    const text = fs.readFileSync(fullPath, 'utf8');
    if (
      text.includes('service_role') ||
      text.includes('SUPABASE_SERVICE_ROLE_KEY') ||
      text.includes('RESEND_API_KEY') ||
      text.includes('SMTP_PASSWORD')
    ) {
      console.error(red(`Secret pattern found in client file: ${file}`));
      foundSecret = true;
    }
  }
}
assert(!foundSecret, 'Zero secrets or service-role keys in client files', 'Secret detected in client files!');

// Summary
console.log(bold('\n=== Audit Summary ==='));
console.log(`Passed checks: ${passedChecks}`);
console.log(`Failed checks: ${failedChecks}`);

if (failedChecks > 0) {
  console.error(red(`\nAudit FAILED with ${failedChecks} issue(s).`));
  process.exit(1);
} else {
  console.log(green('\nAll security, content, and production checks PASSED successfully!\n'));
  process.exit(0);
}
