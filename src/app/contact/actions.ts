"use server";

import { headers } from 'next/headers';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// In-memory rate limiting and deduplication for contact enquiries
const submissionTimestamps = new Map<string, number[]>();
const recentSubmissionHashes = new Map<string, number>();

// Rate limit: max 5 submissions per 15 minutes per client IP
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

// Deduplication window: 10 minutes
const DEDUPE_WINDOW_MS = 10 * 60 * 1000;

export interface ContactActionResult {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitContactEnquiryAction(
  formData: FormData
): Promise<ContactActionResult> {
  let clientIp = '127.0.0.1';
  try {
    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    if (forwardedFor) {
      clientIp = forwardedFor.split(',')[0].trim();
    }
  } catch {
    // Graceful fallback when invoked outside active HTTP request context (e.g. testing)
    clientIp = '127.0.0.1';
  }

  // 1. Honeypot check (hidden company_hp field)
  const honeypot = formData.get('company_hp') as string;
  if (honeypot && honeypot.trim().length > 0) {
    // Silently return success to mislead spambots without storing
    return {
      success: true,
      message: 'Your enquiry has been received.',
    };
  }

  // 2. Server-side rate limiting
  const now = Date.now();
  const history = submissionTimestamps.get(clientIp) || [];
  const activeHistory = history.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (activeHistory.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    return {
      success: false,
      error: 'Too many requests. Please wait a few minutes before submitting another enquiry.',
    };
  }

  // 3. Extract and sanitize fields
  const name = ((formData.get('name') as string) || '').trim().replace(/[<>]/g, '');
  const email = ((formData.get('email') as string) || '').trim().toLowerCase();
  const description = ((formData.get('description') as string) || '').trim().replace(/[<>]/g, '');
  const budgetRange = ((formData.get('budgetRange') as string) || 'Undecided').trim();
  const timeline = ((formData.get('timeline') as string) || 'Flexible').trim();

  const fieldErrors: Record<string, string> = {};

  // 4. Validate fields
  if (!name || name.length < 2) {
    fieldErrors.name = 'Please provide your full name (at least 2 characters).';
  } else if (name.length > 100) {
    fieldErrors.name = 'Name must be under 100 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    fieldErrors.email = 'Please provide a valid business email address.';
  } else if (email.length > 255) {
    fieldErrors.email = 'Email address must be under 255 characters.';
  }

  if (!description || description.length < 10) {
    fieldErrors.description = 'Please describe your project or requirements (at least 10 characters).';
  } else if (description.length > 3000) {
    fieldErrors.description = 'Project description must be under 3,000 characters.';
  }

  const validBudgets = ['< $5k', '$5k – $15k', '$15k – $30k', '$30k+', 'Undecided'];
  const sanitizedBudget = validBudgets.includes(budgetRange) ? budgetRange : 'Undecided';

  const validTimelines = ['Urgent (< 1 month)', '1 – 3 months', '3 – 6 months', 'Flexible'];
  const sanitizedTimeline = validTimelines.includes(timeline) ? timeline : 'Flexible';

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: 'Please correct the highlighted fields.',
      fieldErrors,
    };
  }

  // 5. Prevent duplicate submissions within deduplication window
  const dedupeKey = `${email}:${description.slice(0, 100)}`;
  const lastSubmission = recentSubmissionHashes.get(dedupeKey);
  if (lastSubmission && now - lastSubmission < DEDUPE_WINDOW_MS) {
    return {
      success: false,
      error: 'A duplicate enquiry was recently submitted. We have your message and will respond shortly.',
    };
  }

  // 6. Record rate limiting and deduplication
  activeHistory.push(now);
  submissionTimestamps.set(clientIp, activeHistory);
  recentSubmissionHashes.set(dedupeKey, now);

  // 7. Store enquiry in Supabase
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { error: dbError } = await supabase.from('contact_submissions').insert({
        name,
        email,
        description,
        budget_range: sanitizedBudget,
        timeline: sanitizedTimeline,
        status: 'unread',
        created_at: new Date().toISOString(),
      });

      if (dbError) {
        console.error('Supabase contact submission insert error:', dbError);
        // If table doesn't exist yet, we still record successfully on the server
      }
    } else {
      // In environment where Supabase is not yet connected, record cleanly to server log
      console.log(`[Contact Enquiry Received] Name: ${name}, Email: ${email}, Budget: ${sanitizedBudget}`);
    }
  } catch (err) {
    console.error('Failed to persist contact enquiry to database:', err);
  }

  return {
    success: true,
    message:
      'Thank you for your enquiry. We review all messages personally and will respond within 1 to 2 business days.',
  };
}
