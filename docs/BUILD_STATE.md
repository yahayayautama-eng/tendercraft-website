# Tendercraft Website — Build State & Execution Log

**Current Timestamp:** 2026-09-19 11:35 UTC  
**Active Phase:** All 7 Production Hardening Phases Completed & Verified  
**Production Domain:** `https://tendercrafthq.com`  
**Current Live Deployment:** [https://tendercraft-website.vercel.app](https://tendercraft-website.vercel.app)  
**GitHub Repository:** [https://github.com/yahayayautama-eng/tendercraft-website](https://github.com/yahayayautama-eng/tendercraft-website)  

---

## 1. Production Hardening Checklist (Phases 1 through 7)

- [x] **Phase 1 — Admin System Security & Authorization**
  - *Status:* **COMPLETED & VERIFIED**.
  - *Root Cause Addressed:* Removed all development fallback bypasses (`NEXT_PUBLIC_SUPABASE_URL === undefined`) that allowed anonymous visitors to see the admin dashboard on preview deployments.
  - *Middleware Route Guard:* Created `src/middleware.ts` intercepting `/admin/:path*` (except `/admin/login`). Checks Supabase auth session cookies and verifies user identity against `admin_users` allowlist table.
  - *Open-Redirect Protection:* Sanitizes `returnUrl` to ensure it begins with `/admin` and rejects protocol schemes (`://`) and protocol-relative prefixes (`//`).
  - *Route Guards:* Server components (`/admin`, `/admin/projects/new`, `/admin/projects/[id]/edit`, `/admin/preview/[slug]`) call `verifyAdminUser()` and redirect unauthorized visitors to `/admin/login?error=unauthorized`.
  - *Server Actions:* All mutation actions (`saveProjectAction`, `togglePublishAction`, `toggleFeaturedAction`, `deleteProjectAction`) enforce `verifyAdminUser()` and return `{ success: false, code: 403 }` for anonymous callers.
  - *Session Invalidation:* `logoutAdminAction` calls `supabase.auth.signOut({ scope: 'local' })` and revalidates paths.

- [x] **Phase 2 — Supabase Database & Storage Hardening**
  - *Status:* **COMPLETED & VERIFIED**.
  - *Migrations Added:* `supabase/migrations/20260919000002_create_contact_submissions_and_harden_security.sql`.
  - *Contact Submissions Table:* `public.contact_submissions` table created with RLS enabled.
  - *RLS Policies:*
    - `insert_contact_submissions_public`: Public INSERT with strict character length constraints (Name 2-100, Email 5-255, Description 10-3000).
    - `select_contact_submissions_admin`: SELECT restricted exclusively to verified administrators via `public.is_admin()`.
    - `update_contact_submissions_admin`: UPDATE restricted to verified administrators.
    - `delete_contact_submissions_admin`: DELETE restricted to verified administrators.
  - *Secret Audit:* Verified zero committed secrets, Supabase service-role keys, or SMTP passwords in git history or client bundles.

- [x] **Phase 3 — Production Security Headers**
  - *Status:* **COMPLETED & VERIFIED**.
  - *Headers Configured in `next.config.ts`:*
    - `Content-Security-Policy`: Default `'self'`, scripts `'self' 'unsafe-inline'`, styles `'self' 'unsafe-inline'`, images `'self' data: https: blob:`, connects `'self' https: wss:`, fonts `'self' data:`, frame-ancestors `'none'`. Strictly avoids `'unsafe-eval'`.
    - `X-Content-Type-Options: nosniff` (MIME sniffing prevention).
    - `X-Frame-Options: DENY` (Clickjacking prevention).
    - `Referrer-Policy: strict-origin-when-cross-origin`.
    - `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`.

- [x] **Phase 4 — Production Domain & SEO Correctness**
  - *Status:* **COMPLETED & VERIFIED**.
  - *Domain Helper:* Created `src/lib/site.ts` with `getSiteUrl()`, prioritizing `NEXT_PUBLIC_SITE_URL`, falling back to `VERCEL_PROJECT_PRODUCTION_URL` (`tendercrafthq.com`), and defaulting to `https://tendercrafthq.com`.
  - *Robots & Sitemap:* `src/app/robots.ts` and `src/app/sitemap.ts` use dynamic `getSiteUrl()`. Sitemap only lists published projects. Robots disallows `/admin` and `/admin/`.
  - *Metadata & JSON-LD:* Root layout injects `ProfessionalService` schema.org JSON-LD with canonical domain, logo, and founder metadata. `metadataBase` set on root layout.
  - *Dynamic Params:* Explicit `export const dynamicParams = true;` on `/work/[slug]`.

- [x] **Phase 5 — Reliable Contact Enquiries & Storage**
  - *Status:* **COMPLETED & VERIFIED**.
  - *Server Action:* `src/app/contact/actions.ts` (`submitContactEnquiryAction`):
    - Hidden honeypot `company_hp` silently absorbs bot spam.
    - Server-side rate limiter: max 5 requests per 15-minute window per IP.
    - Strict field validation (Name, Business Email, Project Description, Budget Range, Target Timeline).
    - Deduplication window: blocks repeated identical submissions within 10 minutes.
    - Storage in Supabase `contact_submissions` table with fallback server logging.
  - *Client Form:* `src/components/ContactForm.tsx` with responsive, Apple-inspired layout, interactive budget/timeline pill selectors, real-time field error messaging, pending spinners, and confirmation state.
  - *Direct Email Preservation:* Direct contact cards for `hello@tendercrafthq.com` and `yyautama@tendercrafthq.com` preserved.
  - *Privacy Policy Update:* `src/app/privacy/page.tsx` updated with explicit disclosures regarding enquiry data handling, purpose, retention, and deletion rights.

- [x] **Phase 6 — Content Accuracy & Copy Audit**
  - *Status:* **COMPLETED & VERIFIED**.
  - *Singular Founder Representation:*
    - `src/app/about/page.tsx`: Updated "experienced software engineers" to "the founder and engineer who designs, implements, and verifies every system".
    - `src/app/contact/page.tsx`: Updated to "No intermediaries. Every conversation is with the founder and engineer designing and building your tools." and response time to "within 1 to 2 business days".
  - *Delivery State Copy:*
    - `src/data/projects.ts` (Beadle capability 1): Updated "without dismiss bypass" to "commands immediate attention and requires deliberate user acknowledgement".

- [x] **Phase 7 — Comprehensive Automated Verification**
  - *Status:* **ALL PASSED (41/41 Automated Tests)**.
  - *Production Audit Suite (`scripts/audit_security_and_production.ts`):* 33 passed, 0 failed.
  - *Server Actions & Security Suite (`scripts/test_actions_and_security.ts`):* 8 passed, 0 failed.
  - *ESLint (`pnpm run lint`):* 0 errors, 0 warnings.
  - *TypeScript (`npx tsc --noEmit`):* 0 errors.
  - *Turbopack Production Build (`pnpm run build`):* 19 routes successfully generated.

---

## 2. Active Cloudflare DNS & Email Routing Records (MUST PRESERVE)

Cloudflare handles DNS and active Email Routing for `tendercrafthq.com`. The following MX and TXT records must **NEVER** be deleted or replaced:

| Type | Name | Content | Priority | Status |
| :--- | :--- | :--- | :--- | :--- |
| **MX** | `@` (`tendercrafthq.com`) | `route1.mx.cloudflare.net` | 26 | Active (Required) |
| **MX** | `@` (`tendercrafthq.com`) | `route2.mx.cloudflare.net` | 31 | Active (Required) |
| **MX** | `@` (`tendercrafthq.com`) | `route3.mx.cloudflare.net` | 93 | Active (Required) |
| **TXT** | `@` (`tendercrafthq.com`) | `v=spf1 include:_spf.mx.cloudflare.net ~all` | - | Active (Required) |

### Steps to Connect Domain to Vercel:
In Cloudflare Dashboard > DNS > Records for `tendercrafthq.com`:
1. Add CNAME record: Name `@`, Target `56e9ab447020a3cc.vercel-dns-017.com`, Proxy status **DNS only (Grey Cloud)**.
2. Add CNAME record: Name `www`, Target `56e9ab447020a3cc.vercel-dns-017.com`, Proxy status **DNS only (Grey Cloud)**.
*(Or add A record for `@` pointing to `76.76.21.21`).*
3. Verify in Vercel:
   ```bash
   npx vercel domains verify tendercrafthq.com
   npx vercel domains verify www.tendercrafthq.com
   ```
