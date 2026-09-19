import { submitContactEnquiryAction } from '../src/app/contact/actions';
import {
  saveProjectAction,
  togglePublishAction,
  toggleFeaturedAction,
  deleteProjectAction,
} from '../src/app/admin/actions';

const green = (s: string) => `\x1b[32m✔ ${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m✖ ${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;

let failures = 0;
let passes = 0;

function assert(condition: boolean, passMsg: string, failMsg: string) {
  if (condition) {
    console.log(green(passMsg));
    passes++;
  } else {
    console.error(red(failMsg));
    failures++;
  }
}

async function runTests() {
  console.log(bold('\n=== Testing Server Actions & Route Authorization ===\n'));

  // 1. Test Contact Action: Honeypot Protection
  console.log('Testing Contact Enquiry Honeypot Protection...');
  const hpFormData = new FormData();
  hpFormData.set('name', 'Bot Name');
  hpFormData.set('email', 'bot@spammer.org');
  hpFormData.set('description', 'Buy cheap crypto now');
  hpFormData.set('company_hp', 'Automated Bot Field Content');

  const hpResult = await submitContactEnquiryAction(hpFormData);
  assert(
    hpResult.success === true && hpResult.message === 'Your enquiry has been received.',
    'Honeypot submission silently accepted without errors',
    'Honeypot did not return silent success'
  );

  // 2. Test Contact Action: Validation Errors
  console.log('\nTesting Contact Enquiry Field Validations...');
  const invalidFormData = new FormData();
  invalidFormData.set('name', 'A'); // too short (< 2)
  invalidFormData.set('email', 'not-an-email');
  invalidFormData.set('description', 'short'); // too short (< 10)

  const invalidResult = await submitContactEnquiryAction(invalidFormData);
  assert(
    invalidResult.success === false &&
      invalidResult.fieldErrors?.name !== undefined &&
      invalidResult.fieldErrors?.email !== undefined &&
      invalidResult.fieldErrors?.description !== undefined,
    'Field validations correctly flag invalid name, email, and description',
    'Field validations failed to flag invalid fields'
  );

  // 3. Test Contact Action: Durable Storage Guard
  console.log('\nTesting Contact Enquiry Storage Guard...');
  const validFormData = new FormData();
  const testEmail = `lead-${Date.now()}@acme-corp.com`;
  validFormData.set('name', 'Ada Lovelace');
  validFormData.set('email', testEmail);
  validFormData.set('description', 'We need a custom internal auditing browser extension for 500 team members.');
  validFormData.set('budgetRange', '$15k – $30k');
  validFormData.set('timeline', '1 – 3 months');

  const validResult = await submitContactEnquiryAction(validFormData);
  assert(
    validResult.success === false &&
      Boolean(validResult.error?.includes('Enquiry storage is not configured yet')),
    'Unconfigured storage never reports a false success',
    'Unconfigured storage incorrectly reported a received enquiry'
  );

  // 4. Test Contact Action: Failed Persistence Is Retryable
  console.log('\nTesting Contact Enquiry Failed-Persistence Recovery...');
  const duplicateResult = await submitContactEnquiryAction(validFormData);
  assert(
    duplicateResult.success === false &&
      Boolean(duplicateResult.error?.includes('Enquiry storage is not configured yet')),
    'Failed persistence remains retryable without recording a duplicate',
    'Failed persistence created an inconsistent duplicate state'
  );

  // 5. Test Admin Mutations: Anonymous Execution Blocked
  console.log('\nTesting Anonymous Admin Server Action Protection...');

  const publishResult = await togglePublishAction('dummy-id', true);
  assert(
    publishResult.success === false && publishResult.code === 403,
    'Anonymous togglePublishAction blocked with 403 Unauthorized',
    `Anonymous togglePublishAction allowed or wrong code: ${publishResult.code}`
  );

  const featuredResult = await toggleFeaturedAction('dummy-id', false);
  assert(
    featuredResult.success === false && featuredResult.code === 403,
    'Anonymous toggleFeaturedAction blocked with 403 Unauthorized',
    `Anonymous toggleFeaturedAction allowed or wrong code: ${featuredResult.code}`
  );

  const deleteResult = await deleteProjectAction('dummy-id', 'Test', 'Test');
  assert(
    deleteResult.success === false && deleteResult.code === 403,
    'Anonymous deleteProjectAction blocked with 403 Unauthorized',
    `Anonymous deleteProjectAction allowed or wrong code: ${deleteResult.code}`
  );

  const saveResult = await saveProjectAction({
    name: 'Malicious Project',
    slug: 'malicious-project',
    tagline: 'Should never be saved by anonymous user',
    summary: 'Testing server action security',
    problem: 'Testing',
    solution: 'Testing',
    capabilities: ['Hacking'],
    technology: ['Next.js'],
    status: 'prototype',
    statusLabel: 'Prototype',
    coverImagePath: '/test.png',
    featured: false,
    published: true,
  });
  assert(
    saveResult.success === false && saveResult.code === 403,
    'Anonymous saveProjectAction blocked with 403 Unauthorized',
    `Anonymous saveProjectAction allowed or wrong code: ${saveResult.code}`
  );

  // Summary
  console.log(bold('\n=== Server Actions Test Summary ==='));
  console.log(`Passed: ${passes}`);
  console.log(`Failed: ${failures}`);

  if (failures > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
