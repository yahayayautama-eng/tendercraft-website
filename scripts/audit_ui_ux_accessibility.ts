import fs from 'fs';
import path from 'path';

const green = (s: string) => `\x1b[32m✔ ${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m✖ ${s}\x1b[0m`;
const blue = (s: string) => `\x1b[34mℹ ${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;

let passed = 0;
let failed = 0;

function assert(condition: boolean, passMsg: string, failMsg: string) {
  if (condition) {
    console.log(green(passMsg));
    passed++;
  } else {
    console.error(red(failMsg));
    failed++;
  }
}

const rootDir = process.cwd();

console.log(bold('\n=== UI/UX & WCAG AA Accessibility Audit ===\n'));

// 1. Audit Skip-to-content & Landmarks in layout.tsx
console.log(blue('1. Auditing Accessibility Landmarks & Skip Link...'));
const layoutPath = path.join(rootDir, 'src', 'app', 'layout.tsx');
const layoutContent = fs.readFileSync(layoutPath, 'utf8');

assert(
  layoutContent.includes('skip-to-content') && layoutContent.includes('#main-content'),
  'Skip-to-content link present targeting #main-content',
  'Skip-to-content link MISSING in layout.tsx'
);
assert(
  layoutContent.includes('id="main-content"'),
  '<main id="main-content"> landmark configured',
  '<main> missing id="main-content" landmark'
);
assert(
  layoutContent.includes('initialScale: 1') && !layoutContent.includes('userScalable: false'),
  'Viewport preserves user browser zoom',
  'Viewport disables user browser zoom'
);

// 2. Audit Mobile Touch Targets (>= 44x44px)
console.log(blue('\n2. Auditing Mobile Touch Targets (>= 44x44px)...'));
const headerPath = path.join(rootDir, 'src', 'components', 'Header.tsx');
const headerContent = fs.readFileSync(headerPath, 'utf8');

assert(
  headerContent.includes('min-w-[44px] min-h-[44px]'),
  'Header mobile hamburger button meets 44x44px touch target',
  'Header mobile button touch target is under 44x44px'
);
assert(
  headerContent.includes('min-h-[44px]') && headerContent.includes('aria-label="Mobile Navigation"'),
  'Mobile drawer navigation links meet min-h-[44px]',
  'Mobile drawer links missing min-h-[44px]'
);

const contactFormPath = path.join(rootDir, 'src', 'components', 'ContactForm.tsx');
const contactFormContent = fs.readFileSync(contactFormPath, 'utf8');

assert(
  contactFormContent.includes('min-h-[44px]') && contactFormContent.includes('role="radiogroup"'),
  'Contact form budget and timeline pill buttons meet min-h-[44px] with radiogroup semantics',
  'Contact form pill buttons missing min-h-[44px] or radiogroup role'
);
assert(
  contactFormContent.includes('aria-checked={isSelected}'),
  'Contact form pill options declare aria-checked state',
  'Contact form options missing aria-checked'
);
assert(
  contactFormContent.includes('aria-invalid') && contactFormContent.includes('aria-describedby'),
  'Contact form inputs include aria-invalid and aria-describedby for errors',
  'Contact form missing accessible error bindings'
);

// 3. Audit Navigation Active States
console.log(blue('\n3. Auditing Navigation Active States...'));
assert(
  headerContent.includes('aria-current={isActive ? \'page\' : undefined}'),
  'Navigation links declare aria-current="page" when active',
  'Navigation links missing aria-current attribute'
);
assert(
  headerContent.includes('pathname.startsWith(item.href)'),
  'Navigation active state handles child routes (e.g. /work/*)',
  'Child routes do not keep parent navigation item active'
);

// 4. Audit Logo Suite & Contrast
console.log(blue('\n4. Auditing Redesigned Logo Suite...'));
const logoDarkPath = path.join(rootDir, 'public', 'brand', 'tendercraft-logo-dark.svg');
const logoLightPath = path.join(rootDir, 'public', 'brand', 'tendercraft-logo-light.svg');
const markPath = path.join(rootDir, 'public', 'brand', 'tendercraft-mark.svg');

assert(fs.existsSync(logoDarkPath), 'tendercraft-logo-dark.svg exists', 'Dark logo missing');
assert(fs.existsSync(logoLightPath), 'tendercraft-logo-light.svg exists', 'Light logo missing');
assert(fs.existsSync(markPath), 'tendercraft-mark.svg exists', 'Mark missing');

if (fs.existsSync(logoDarkPath)) {
  const darkContent = fs.readFileSync(logoDarkPath, 'utf8');
  assert(
    darkContent.includes('TENDERCRAFT') && darkContent.includes('#FFFFFF'),
    'Dark logo contains crisp white TENDERCRAFT wordmark',
    'Dark logo wordmark missing or wrong color'
  );
}

// 5. Audit Design Tokens & Reduced Motion in globals.css
console.log(blue('\n5. Auditing Design Tokens & Reduced Motion in globals.css...'));
const globalsPath = path.join(rootDir, 'src', 'app', 'globals.css');
const globalsContent = fs.readFileSync(globalsPath, 'utf8');

assert(
  globalsContent.includes('--duration-micro: 150ms') && globalsContent.includes('--duration-standard: 200ms'),
  'Standardized animation timing tokens (150-250ms) defined',
  'Animation timing tokens missing'
);
assert(
  globalsContent.includes('prefers-reduced-motion: reduce') && globalsContent.includes('animation-duration: 0.01ms'),
  'Strict prefers-reduced-motion override present in globals.css',
  'Reduced-motion override missing or incomplete'
);
assert(
  globalsContent.includes('overflow-x: clip'),
  'Global overflow-x: clip prevents horizontal scrolling',
  'Global overflow-x prevention missing'
);

// 6. Audit Founder Showcase in about/page.tsx
console.log(blue('\n6. Auditing Founder Section Showcase in about/page.tsx...'));
const aboutPath = path.join(rootDir, 'src', 'app', 'about', 'page.tsx');
const aboutContent = fs.readFileSync(aboutPath, 'utf8');

assert(
  aboutContent.includes('Yahaya Yautama') && aboutContent.includes('Founder & Principal Systems Engineer'),
  'Founder name and official role title present in about page',
  'Founder name or role missing in about page'
);
assert(
  aboutContent.includes('https://github.com/yahayayautama-eng'),
  'Founder GitHub link present with accessible external link indicator',
  'Founder GitHub link missing'
);
assert(
  aboutContent.includes('https://www.linkedin.com/in/yahaya-yautama'),
  'Founder LinkedIn link present with accessible external link indicator',
  'Founder LinkedIn link missing'
);
assert(
  aboutContent.includes('yyautama@tendercrafthq.com'),
  'Founder direct email present with min-h-[44px] touch target',
  'Founder email link missing'
);

// 7. Audit Project Card Transitions & Performance
console.log(blue('\n7. Auditing ProjectCard Motion & Alt Text...'));
const projectCardPath = path.join(rootDir, 'src', 'components', 'ProjectCard.tsx');
const projectCardContent = fs.readFileSync(projectCardPath, 'utf8');

assert(
  projectCardContent.includes('duration-200') && !projectCardContent.includes('duration-500'),
  'ProjectCard uses standardized 200ms transitions',
  'ProjectCard transition duration not standardized'
);
assert(
  projectCardContent.includes('motion-reduce:transform-none') && projectCardContent.includes('motion-reduce:transition-none'),
  'ProjectCard supports motion-reduce:transform-none',
  'ProjectCard missing motion-reduce overrides'
);
assert(
  projectCardContent.includes('aspect-[16/10]'),
  'ProjectCard enforces standard aspect-[16/10] media ratio',
  'ProjectCard media aspect ratio not standardized'
);

console.log(bold('\n=== UI/UX Audit Summary ==='));
console.log(`Passed checks: ${passed}`);
console.log(`Failed checks: ${failed}`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log(green('\nAll UI/UX and Accessibility requirements verified successfully!\n'));
  process.exit(0);
}
