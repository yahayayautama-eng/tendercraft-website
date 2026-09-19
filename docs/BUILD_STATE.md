# Tendercraft Website — Build State & Execution Log

**Current Timestamp:** 2026-09-19 10:50 UTC  
**Active Phase:** All Phases (0 through 5) Completed & Verified  
**Build Target:** `tendercrafthq.com`  
**Live Production URL:** [https://tendercraft-website.vercel.app](https://tendercraft-website.vercel.app)  
**GitHub Repository:** [https://github.com/yahayayautama-eng/tendercraft-website](https://github.com/yahayayautama-eng/tendercraft-website)  
**Git Commit:** `c4e4dd0b1191552f0962b8b112b3342ed7421545`  
**Vercel Deployment ID:** `dpl_CM11WLjsmrEANW7DBszzWwz1Uart`  

---

## 1. Phase Execution Checklist & Acceptance Gates

- [x] **Phase 0 — Inventory and truth check**
  - *Gate Status:* **PASSED**.
  - *Verified Projects:* Beadle, CompoundOS, Automated Risk Register, FreightHUD, CartItemizer.
  - *Excluded Projects:* Texas Permit Radar (unverified assets/state), all game projects.
  - *Evidence:* Direct source inspections, live browser capture testbeds, truth matrices in `docs/PROJECT_INVENTORY.md` and `docs/ASSET_PROVENANCE.md`.

- [x] **Phase 1 — Foundation and design system**
  - *Gate Status:* **PASSED**.
  - *Architecture:* Next.js App Router (v16.3.5) + Tailwind CSS + TypeScript + Lucide icons.
  - *Design System:* Selective integration of Button, Card, and Tabs from `@smart-coder-labs/apple-design-system`.
  - *Brand System:* Complete vector SVG suite recreated from `tendercraft-logo-concept-v2.png` (`tendercraft-mark.svg`, `tendercraft-logo-light.svg`, `tendercraft-logo-dark.svg`, `tendercraft-logo-mono-black.svg`, `tendercraft-logo-mono-white.svg`, `icon.svg`, and 1200x630 `tendercraft-og.png`).
  - *Documentation:* `docs/BRAND_GUIDE.md`.
  - *Responsiveness:* Tested and verified at 360px, 768px, 1024px, and 1440px with zero horizontal scroll overflow.

- [x] **Phase 1B — Project backend and administration**
  - *Gate Status:* **PASSED**.
  - *Database & Security:* Supabase migrations (`supabase/migrations/20260919000001_create_projects_and_admin.sql`) with `projects`, `project_assets`, and `admin_users` tables.
  - *Security Enforcement:* Row Level Security (RLS) on all exposed tables and Storage buckets; explicit schema grants; public reads restricted to `published = true`; all mutations restricted to allowlisted administrators.
  - *Zero-Config Fallback:* `src/lib/projects.ts` supports database fetching with seamless fallback to verified data.
  - *Admin Experience:* Private `/admin` dashboard, project creation/editing, publishing toggles, featured toggles, preview route (`/admin/preview/[slug]`), and confirmed project deletion.
  - *Verification:* Automated test `scripts/verify_security_and_crud.ts` passed all 4 security checks.

- [x] **Phase 2 — Content and assets**
  - *Gate Status:* **PASSED**.
  - *Asset Pipeline:* Copied and optimized authentic media to `public/projects/<slug>/`.
  - *Copy Truth:* Zero invented clients, testimonials, metrics, or revenue claims.

- [x] **Phase 3 — Pages**
  - *Gate Status:* **PASSED**.
  - *Routes Built:*
    - `/` (Home: Hero, Mission, Featured Projects, Capabilities, Contact CTA)
    - `/work` (Portfolio listing with status filters and card grid)
    - `/work/[slug]` (Case studies for Beadle, CompoundOS, ARR, FreightHUD, CartItemizer)
    - `/about` (Studio philosophy, capabilities, tech stack, approach)
    - `/contact` (Direct email CTAs to `hello@tendercrafthq.com` and `yyautama@tendercrafthq.com`)
    - `/privacy` (Plain-language privacy notice)
    - `/admin/login` & `/admin` (Private administrator suite)
    - `/robots.txt` & `/sitemap.xml` (SEO crawlability, `/admin` disallowed)
    - `not-found.tsx` (Custom 404)

- [x] **Phase 4 — Quality & Audits**
  - *Gate Status:* **PASSED**.
  - *ESLint & TypeScript:* `pnpm run lint` exited with code 0 (0 errors, 0 warnings); `tsc --noEmit` clean.
  - *Production Build:* Turbopack production build succeeded; all 19 routes statically pre-rendered or SSG pre-rendered.
  - *Responsive Verification:* Zero horizontal scroll overflow (`scrollWidth <= clientWidth`) verified across 360, 768, 1024, and 1440 pixels.
  - *Internal Link Graph:* Crawled and tested; 0 broken links.
  - *Lighthouse Audit Results (Production Build):*
    - **Performance: 93** (Target: 90+) — **PASSED**
    - **Accessibility: 96** (Target: 95+) — **PASSED**
    - **Best Practices: 100** (Target: 95+) — **PASSED**
    - **SEO: 100** (Target: 95+) — **PASSED**
  - *Lighthouse Audit Results (/work/beadle):*
    - **Performance: 93**
    - **Accessibility: 96**
    - **Best Practices: 100**
    - **SEO: 100**

- [x] **Phase 5 — Deployment**
  - *Gate Status:* **PASSED & LIVE**.
  - *GitHub Repository:* Created and pushed to `https://github.com/yahayayautama-eng/tendercraft-website`.
  - *Vercel Deployment:* Linked to `tendercraft-website` project under `yytarfa` with Next.js framework preset.
  - *Live URL:* `https://tendercraft-website.vercel.app` (status: 200 OK, 0 console errors, 0 broken links).
  - *Domain Configuration:* Added `tendercrafthq.com` and `www.tendercrafthq.com` to Vercel project.
  - *Email Routing Safety Verified:* Cloudflare Email Routing MX and TXT records confirmed intact.

---

## 2. Live Deployment & Domain Verification Evidence

### Vercel Production Build
- **Target URL:** `https://tendercraft-website.vercel.app`
- **Deployment URL:** `https://tendercraft-website-25sim7u16-yytarfa.vercel.app`
- **Inspect URL:** `https://vercel.com/yytarfa/tendercraft-website/CM11WLjsmrEANW7DBszzWwz1Uart`

### Cloudflare Email Routing Protection
DNS queries against `tendercrafthq.com` confirm the email routing infrastructure is active and unharmed:
```
tendercrafthq.com MX 26 route1.mx.cloudflare.net
tendercrafthq.com MX 31 route2.mx.cloudflare.net
tendercrafthq.com MX 93 route3.mx.cloudflare.net
tendercrafthq.com TXT "v=spf1 include:_spf.mx.cloudflare.net ~all"
```

### DNS Activation Instructions for `tendercrafthq.com`
To connect the custom domain in Cloudflare DNS while strictly preserving all email routing records:
1. **Option A (1-Click Domain Connect):**
   Open the direct Vercel Cloudflare Domain Connect URL:
   `https://vercel.com/api/v9/projects/prj_01QP1JHGFlxOSOvq1BTHNgXU5BMv/domains/tendercrafthq.com/domain-connect/apply?teamId=team_6muCp8ObVlq5iKmrrQcGluML`
2. **Option B (Manual DNS Records in Cloudflare Dashboard):**
   In the Cloudflare dashboard for `tendercrafthq.com`, navigate to **DNS > Records**:
   - Add **CNAME**: Name: `@`, Target: `56e9ab447020a3cc.vercel-dns-017.com`, Proxy Status: **DNS only (Grey Cloud)**
   - Add **CNAME**: Name: `www`, Target: `56e9ab447020a3cc.vercel-dns-017.com`, Proxy Status: **DNS only (Grey Cloud)**
   *(Or A record for `@` pointing to `76.76.21.21`).*
   - **DO NOT MODIFY OR DELETE:**
     - The 3 MX records pointing to `*.mx.cloudflare.net`
     - The TXT SPF record `v=spf1 include:_spf.mx.cloudflare.net ~all`
     - The Cloudflare nameservers (`james.ns.cloudflare.com`, `serenity.ns.cloudflare.com`)
3. After adding the records, run:
   ```powershell
   npx vercel domains verify tendercrafthq.com
   npx vercel domains verify www.tendercrafthq.com
   ```
