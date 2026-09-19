-- ==============================================================================
-- Tendercraft Contact Submissions & Security Hardening Migration
-- Migration: 20260919000002_create_contact_submissions_and_harden_security.sql
-- Description: Creates contact_submissions table, enables RLS with strict
--              admin-only read policies, validates insert constraints,
--              and updates Beadle copy to verified acknowledgement wording.
-- ==============================================================================

-- 1. Contact Submissions Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  description TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  status TEXT NOT NULL DEFAULT 'unread',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policy: Only verified administrators can view submitted enquiries
CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions
  FOR SELECT
  USING (public.is_admin());

-- 4. RLS Policy: Only verified administrators can update submission status (e.g. mark read/archived)
CREATE POLICY "Admins can update contact submissions"
  ON public.contact_submissions
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 5. RLS Policy: Only verified administrators can delete contact submissions
CREATE POLICY "Admins can delete contact submissions"
  ON public.contact_submissions
  FOR DELETE
  USING (public.is_admin());

-- 6. RLS Policy: Allow insertion of contact submissions with strict input length checks
CREATE POLICY "Public can insert valid contact submissions"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (
    char_length(name) >= 2 AND char_length(name) <= 100 AND
    char_length(email) >= 5 AND char_length(email) <= 255 AND
    char_length(description) >= 10 AND char_length(description) <= 3000
  );

-- 7. Update Beadle capabilities copy in projects table to replace legacy phrasing
UPDATE public.projects
SET capabilities = jsonb_set(
  capabilities,
  '{0}',
  '"Topmost Windows desktop agent (.NET 8 + WPF) that commands immediate attention; requires deliberate user acknowledgement."'
)
WHERE slug = 'beadle';
