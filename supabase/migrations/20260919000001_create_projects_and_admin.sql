-- ==============================================================================
-- Tendercraft Website Schema & RLS Security Migration
-- Migration: 20260919000001_create_projects_and_admin.sql
-- Description: Creates projects, project_assets, admin_users, RLS policies,
--              storage bucket definitions, and verified initial seed data.
-- ==============================================================================

-- 1. Admin Users Allowlist Table
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  summary TEXT NOT NULL,
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  capabilities JSONB NOT NULL DEFAULT '[]'::jsonb,
  technology JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL,
  status_label TEXT NOT NULL,
  cover_image_path TEXT NOT NULL,
  live_url TEXT,
  store_url TEXT,
  repository_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Project Assets (Media Gallery) Table
CREATE TABLE IF NOT EXISTS public.project_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Automatic Updated At Trigger Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 5. Helper Function: Is Current User Allowlisted Admin?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public, auth
LANGUAGE plpgsql STABLE AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
END;
$$;

-- 6. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_assets ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies: admin_users
-- Only allowlisted admins can see who is in the admin allowlist
CREATE POLICY "Admins can view admin_users"
  ON public.admin_users
  FOR SELECT
  USING (public.is_admin());

-- 8. RLS Policies: projects
-- Public / Anonymous: Read published projects only
CREATE POLICY "Public read published projects"
  ON public.projects
  FOR SELECT
  USING (published = true);

-- Admins: Full read (including unpublished / draft projects)
CREATE POLICY "Admins read all projects"
  ON public.projects
  FOR SELECT
  USING (public.is_admin());

-- Admins: Insert projects
CREATE POLICY "Admins insert projects"
  ON public.projects
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Admins: Update projects
CREATE POLICY "Admins update projects"
  ON public.projects
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Admins: Delete projects
CREATE POLICY "Admins delete projects"
  ON public.projects
  FOR DELETE
  USING (public.is_admin());

-- 9. RLS Policies: project_assets
-- Public: Read assets for published projects
CREATE POLICY "Public read assets of published projects"
  ON public.project_assets
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p
      WHERE p.id = project_assets.project_id AND p.published = true
    )
  );

-- Admins: Full read assets
CREATE POLICY "Admins read all project assets"
  ON public.project_assets
  FOR SELECT
  USING (public.is_admin());

-- Admins: Insert project assets
CREATE POLICY "Admins insert project assets"
  ON public.project_assets
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Admins: Update project assets
CREATE POLICY "Admins update project assets"
  ON public.project_assets
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Admins: Delete project assets
CREATE POLICY "Admins delete project assets"
  ON public.project_assets
  FOR DELETE
  USING (public.is_admin());

-- 10. Storage Bucket Setup
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-assets',
  'project-assets',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];

-- Storage RLS Policies for project-assets bucket
CREATE POLICY "Public read project-assets storage"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'project-assets');

CREATE POLICY "Admins upload project-assets storage"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'project-assets' AND public.is_admin());

CREATE POLICY "Admins update project-assets storage"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'project-assets' AND public.is_admin())
  WITH CHECK (bucket_id = 'project-assets' AND public.is_admin());

CREATE POLICY "Admins delete project-assets storage"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'project-assets' AND public.is_admin());

-- 11. Explicit Grants (Least Privilege Principle)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT SELECT ON public.project_assets TO anon, authenticated;
GRANT ALL ON public.projects TO authenticated;
GRANT ALL ON public.project_assets TO authenticated;
GRANT ALL ON public.admin_users TO authenticated;

-- 12. Verified Initial Seed Data
INSERT INTO public.projects (
  id, slug, name, tagline, summary, problem, solution, capabilities, technology, status, status_label, cover_image_path, live_url, store_url, repository_url, featured, published, sort_order, created_at, updated_at
) VALUES
(
  'b1e4d1e0-0001-4000-8000-000000000001',
  'beadle',
  'Beadle',
  'Self-hosted desktop broadcast alerts and urgent notification engine for Windows environments.',
  'Beadle pushes critical IT outages, security advisories, and emergency broadcasts directly to employee screens with force-on-top positioning, rich document rendering, and audit-defensible acknowledgement receipts.',
  'Organizations struggle with critical notifications—like sudden infrastructure downtime or critical cybersecurity alerts—getting lost in crowded email inboxes. Staff ignore mass emails, leaving IT teams blind to who actually saw the message.',
  'Tendercraft designed and engineered Beadle as an on-premise Windows mass-alert system. Alerts bypass email, rendering directly over running applications with verifiable delivery and acknowledgement logging tied to Active Directory identities.',
  '["Topmost Windows desktop agent (.NET 8 + WPF) that commands immediate attention without dismiss bypass.", "Active Directory & LDAP targeting across security groups, departments, or entire domain networks.", "Persistent real-time SignalR push with offline queuing and catch-up delivery on reconnect.", "Server-side PPTX-to-PDF conversion and local PDF rendering via PdfiumViewer and WebView2.", "Explicit delivery receipts: distinctly logging display confirmation versus deliberate user acknowledgement.", "Silent enterprise deployment via WiX-authored MSI installers pushable through Group Policy (GPO)."]'::jsonb,
  '[".NET 8", "WPF", "ASP.NET Core", "SignalR", "PostgreSQL 16", "Next.js 14", "WiX Toolset"]'::jsonb,
  'prototype',
  'On-Premise Build',
  '/projects/beadle/beadle-hero.png',
  NULL,
  NULL,
  NULL,
  true,
  true,
  1,
  '2026-09-17 10:00:00+00',
  '2026-09-19 04:00:00+00'
),
(
  'c0a7e000-0002-4000-8000-000000000002',
  'compoundos',
  'CompoundOS',
  'Residential compound and estate operations software for access, ledgers, and resident service.',
  'CompoundOS provides residential estates, gated communities, and multi-tenant facilities with a unified operating system—combining digital gate passes, maintenance dispatch, and service charge ledgers.',
  'Estate managers and resident associations rely on disconnected WhatsApp chats, paper visitor gate ledgers, and manual bank transfer reconciliation. The result is security lapses at access gates, lost service fees, and unresolved resident complaints.',
  'A structured operations platform tailored for gated communities. CompoundOS integrates front-gate security verification with a resident self-service portal, automated payment ledgers, and maintenance dispatch.',
  '["Digital visitor gate pass generation with time-bounded validation and security checkpoint verification.", "Resident ledger tracking service charges, dues, automated receipting, and transaction history.", "Maintenance and facility complaint management lifecycle with SLA tracking and status notifications.", "Dedicated tenant self-service portal for gate passes, dues payment, and ticket submission.", "Staff and security guard interface optimized for high-throughput gate operations."]'::jsonb,
  '["TypeScript", "React", "Vite", "Express.js", "Prisma ORM", "Tailwind CSS"]'::jsonb,
  'build',
  'Working Application',
  '/projects/compoundos/compoundos-hero.png',
  NULL,
  NULL,
  NULL,
  true,
  true,
  2,
  '2026-09-10 12:00:00+00',
  '2026-09-19 04:00:00+00'
),
(
  'a88157e0-0003-4000-8000-000000000003',
  'automated-risk-register',
  'Automated Risk Register',
  'Continuous enterprise risk governance, scoring matrix, and executive reporting platform.',
  'Automated Risk Register gives risk, compliance, and leadership teams a single operational workspace to capture risks, calculate inherent versus residual exposure, assign remediation owners, and generate audit-ready reports.',
  'Traditional risk registers live in static spreadsheets and periodic board decks that become obsolete immediately. Teams lack real-time visibility into who owns remediation actions, leading to unaddressed compliance exposures.',
  'Tendercraft built Automated Risk Register as an active operational system that turns compliance into continuous action—providing real-time scoring, accountability workflows, and instant audit trails.',
  '["Comprehensive risk capture across operational, cybersecurity, compliance, and financial categories.", "Dynamic likelihood versus impact matrix comparing inherent exposure against residual risk post-treatment.", "Action item assignment with clear accountability, escalation due dates, and review cadences.", "Appetite monitoring and early warning threshold alerts for emerging operational vulnerabilities.", "Executive dashboard exports formatted for board governance and assurance reviews."]'::jsonb,
  '["React 19", "TypeScript", "Vite", "Tailwind CSS", "Vercel Edge"]'::jsonb,
  'deployed',
  'Deployed Web App',
  '/projects/automated-risk-register/arr-hero.png',
  'https://automated-risk-register-web.vercel.app/',
  NULL,
  NULL,
  true,
  true,
  3,
  '2026-09-12 08:00:00+00',
  '2026-09-19 04:00:00+00'
),
(
  'f7e194a0-0004-4000-8000-000000000004',
  'freighthud',
  'FreightHUD',
  'Contextual rate-per-mile calculator and load evaluation HUD for freight dispatchers.',
  'A specialized browser tool that injects instant spot-market rate calculations, deadhead analysis, and lane margin estimators directly into active DAT One and Truckstop load boards.',
  'Freight dispatchers and brokers make time-critical spot rate decisions in seconds. Constantly tab-switching between load boards, mileage tools, and rate calculators introduces calculation errors and loses bids.',
  'FreightHUD overlays directly on load boards, automatically parsing load origin, destination, and rate to compute real-time margins, deadhead costs, and negotiation thresholds right beside the load listing.',
  '["Instant rate-per-mile and net profit calculation overlaid directly in DAT One load board DOM.", "Deadhead mileage estimator calculating total trip cost including repositioning distance.", "Quick-adjust margin targets for rapid negotiation while on call with carriers.", "Lightweight browser extension design with zero latency impact on load board refreshing."]'::jsonb,
  '["Chrome Extension Manifest V3", "TypeScript", "Tailwind CSS", "Vite"]'::jsonb,
  'packaged',
  'Packaged Extension',
  '/projects/freighthud/freighthud-hero.jpg',
  NULL,
  NULL,
  NULL,
  false,
  true,
  4,
  '2026-09-01 14:00:00+00',
  '2026-09-19 04:00:00+00'
),
(
  'c4a7e110-0005-4000-8000-000000000005',
  'cartitemizer',
  'CartItemizer',
  'Multi-store cart itemization, expense categorization, and QuickBooks export tool.',
  'A procurement workflow tool for contractors and purchasing teams, parsing complex Amazon Business and Home Depot receipts into job-costed itemized splits ready for accounting software.',
  'Bookkeepers and project managers spend hours manually splitting lump-sum procurement orders across client jobs, cost codes, and tax categories from printed receipts and complex invoices.',
  'CartItemizer extracts itemized line items directly from checkout carts and past orders, enabling one-click classification by cost center and direct export to CSV and accounting-ready formats.',
  '["Line-item extraction from Amazon Business and Home Depot order histories.", "Flexible GL code and job expense allocation across individual cart items.", "Accounting-ready export presets formatted for QuickBooks and spreadsheet ingestion.", "Local-first privacy architecture ensuring purchasing data never leaves the operator machine."]'::jsonb,
  '["Chrome Extension Manifest V3", "TypeScript", "Tailwind CSS"]'::jsonb,
  'packaged',
  'Packaged Extension v1.3.1',
  '/projects/cartitemizer/cartitemizer-hero.jpg',
  NULL,
  NULL,
  NULL,
  false,
  true,
  5,
  '2026-08-20 10:00:00+00',
  '2026-09-19 04:00:00+00'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  summary = EXCLUDED.summary,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  capabilities = EXCLUDED.capabilities,
  technology = EXCLUDED.technology,
  status = EXCLUDED.status,
  status_label = EXCLUDED.status_label,
  cover_image_path = EXCLUDED.cover_image_path,
  live_url = EXCLUDED.live_url,
  featured = EXCLUDED.featured,
  published = EXCLUDED.published,
  sort_order = EXCLUDED.sort_order;

-- Insert Assets Seed
INSERT INTO public.project_assets (id, project_id, storage_path, alt_text, caption, sort_order)
VALUES
(
  'e1a00001-0001-4000-8000-000000000001',
  'b1e4d1e0-0001-4000-8000-000000000001',
  '/projects/beadle/beadle-alert-active.png',
  'Beadle high-priority alert popup with acknowledgement action button',
  'High-priority desktop popup alert rendered directly on a workstation with force-on-top positioning.',
  1
),
(
  'e1a00001-0001-4000-8000-000000000002',
  'b1e4d1e0-0001-4000-8000-000000000001',
  '/projects/beadle/beadle-delivery-report.png',
  'Delivery evidence report table showing displayed and acknowledged rates',
  'Real-time delivery verification console displaying recipient delivery rates and explicit acknowledgement counts.',
  2
),
(
  'e1a00002-0002-4000-8000-000000000001',
  'c0a7e000-0002-4000-8000-000000000002',
  '/projects/compoundos/dashboard.png',
  'CompoundOS operations dashboard with metrics and active resident count',
  'Estate operations overview detailing active residents, outstanding dues, and daily gate traffic.',
  1
),
(
  'e1a00002-0002-4000-8000-000000000002',
  'c0a7e000-0002-4000-8000-000000000002',
  '/projects/compoundos/tenants.png',
  'Resident directory view with occupancy and unit breakdown',
  'Central resident directory linking lease profiles, assigned units, and contact details.',
  2
),
(
  'e1a00002-0002-4000-8000-000000000003',
  'c0a7e000-0002-4000-8000-000000000003',
  '/projects/compoundos/gatepasses.png',
  'Visitor access authorization ledger with pass codes and check-in times',
  'Real-time visitor access ledger showing authorized arrival windows and entry timestamps.',
  3
),
(
  'e1a00002-0002-4000-8000-000000000004',
  'c0a7e000-0002-4000-8000-000000000004',
  '/projects/compoundos/payments.png',
  'Service charge payment tracking and receipt log',
  'Estate dues ledger tracking payment verification, recurring service charges, and receipts.',
  4
),
(
  'e1a00003-0003-4000-8000-000000000001',
  'a88157e0-0003-4000-8000-000000000003',
  '/projects/automated-risk-register/arr-hero.png',
  'Automated Risk Register live landing page and interactive risk portfolio card',
  'Deployed public application displaying active portfolio overview, severity breakdown, and action progress.',
  1
),
(
  'e1a00003-0003-4000-8000-000000000002',
  'a88157e0-0003-4000-8000-000000000003',
  '/projects/automated-risk-register/arr-full.png',
  'Full page overview of risk management workflow and governance controls',
  'Operational architecture overview detailing the Capture, Score, Act, and Report governance cycle.',
  2
),
(
  'e1a00004-0004-4000-8000-000000000001',
  'f7e194a0-0004-4000-8000-000000000004',
  '/projects/freighthud/screenshot-1.png',
  'FreightHUD rate calculator injected into load board table',
  'Contextual HUD overlay computing spot rate benchmarks directly on active load board rows.',
  1
),
(
  'e1a00004-0004-4000-8000-000000000002',
  'f7e194a0-0004-4000-8000-000000000004',
  '/projects/freighthud/screenshot-2.png',
  'Detailed rate and deadhead mileage calculation breakdown',
  'Breakdown modal calculating fuel surcharge, deadhead miles, and target margin.',
  2
),
(
  'e1a00005-0005-4000-8000-000000000001',
  'c4a7e110-0005-4000-8000-000000000005',
  '/projects/cartitemizer/screenshot-1.jpg',
  'Amazon order itemization split across cost codes',
  'Itemized receipt breakdown allocating line items to project job codes.',
  1
),
(
  'e1a00005-0005-4000-8000-000000000002',
  'c4a7e110-0005-4000-8000-000000000005',
  '/projects/cartitemizer/screenshot-2.jpg',
  'Home Depot receipt line item parser and classification',
  'Home Depot order parser extracting SKU numbers, unit prices, and quantities.',
  2
),
(
  'e1a00005-0005-4000-8000-000000000003',
  'c4a7e110-0005-4000-8000-000000000003',
  '/projects/cartitemizer/screenshot-3.jpg',
  'Export formatting options for accounting and bookkeeping',
  'Export interface generating formatted splits for QuickBooks and CSV ledgers.',
  3
)
ON CONFLICT (id) DO NOTHING;
