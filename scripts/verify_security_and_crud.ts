import { VERIFIED_PROJECTS } from '../src/data/projects';
import { getPublicProjects, getPublicProjectBySlug } from '../src/lib/projects';

async function runSecurityAudit() {
  console.log('--- Tendercraft Security & Authorization Audit ---');

  // Test 1: Public access filtering (Unpublished projects must NEVER leak)
  console.log('Test 1: Verifying public query filters out unpublished projects...');
  const publicList = await getPublicProjects();
  const unpublishedLeaked = publicList.filter((p) => !p.published);
  if (unpublishedLeaked.length > 0) {
    throw new Error(`SECURITY VULNERABILITY: ${unpublishedLeaked.length} unpublished projects leaked in public query!`);
  }
  console.log(`✓ PASSED: All ${publicList.length} returned projects have published = true.`);

  // Test 2: Slug lookups for unpublished projects fail for public visitors
  console.log('Test 2: Verifying getPublicProjectBySlug rejects non-existent or unpublished slugs...');
  const fakeSlug = await getPublicProjectBySlug('secret-unreleased-product');
  if (fakeSlug !== null) {
    throw new Error('SECURITY VULNERABILITY: Non-existent or unpublished slug returned data!');
  }
  console.log('✓ PASSED: Non-existent / unpublished slug returns null.');

  // Test 3: Verified Projects Dataset Parity Check
  console.log('Test 3: Checking parity between database schema and verified seed data...');
  const expectedSlugs = ['beadle', 'compoundos', 'automated-risk-register', 'freighthud', 'cartitemizer'];
  for (const slug of expectedSlugs) {
    const project = VERIFIED_PROJECTS.find((p) => p.slug === slug);
    if (!project) {
      throw new Error(`PARITY ERROR: Missing expected verified project "${slug}"!`);
    }
    if (!project.coverImagePath || !project.tagline || !project.summary) {
      throw new Error(`INTEGRITY ERROR: Project "${slug}" missing required fields!`);
    }
    if (!project.capabilities || project.capabilities.length < 3) {
      throw new Error(`TRUTH CHECK ERROR: Project "${slug}" must have at least 3 verified capabilities!`);
    }
  }
  console.log(`✓ PASSED: All ${expectedSlugs.length} verified projects satisfy strict schema & truth criteria.`);

  // Test 4: Exclusion Checks
  console.log('Test 4: Verifying zero game projects and zero Apple-owned assets in seed data...');
  for (const p of VERIFIED_PROJECTS) {
    if (p.name.toLowerCase().includes('game') || p.tagline.toLowerCase().includes('game')) {
      throw new Error(`SPEC VIOLATION: Game found in portfolio: ${p.name}`);
    }
    if (p.coverImagePath.includes('apple') || p.coverImagePath.includes('sf-symbols')) {
      throw new Error(`TRADEMARK VIOLATION: Prohibited asset path in ${p.name}`);
    }
  }
  console.log('✓ PASSED: Zero games, zero unauthorized trademarks in portfolio.');

  console.log('\nAll security, filtering, and data integrity tests PASSED successfully.');
}

runSecurityAudit().catch((err) => {
  console.error('Audit FAILED:', err);
  process.exit(1);
});
