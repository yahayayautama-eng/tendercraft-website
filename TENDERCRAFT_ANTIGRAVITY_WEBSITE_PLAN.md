# Tendercraft Website — Antigravity Build Plan

## Build state

PLAN ONLY. The Tendercraft website has not been implemented by this document.

## Goal

Build a fast, polished company and portfolio website for Tendercraft at `tendercrafthq.com`. The site must explain what Tendercraft builds, showcase real completed work with real assets, and turn visitors into enquiries through `hello@tendercrafthq.com` and `yyautama@tendercrafthq.com`.

## Design source

Use these repositories in different roles:

- Implementation components: `https://github.com/smart-coder-labs/design-system`
- Design reference only: `https://github.com/mjmirza/apple-design-system`

Use the first repository's MIT licensed web components selectively. Use the second repository to study layout, typography, motion, accessibility, and hierarchy. Do not publish Apple logos, product artwork, SF Symbols, Apple fonts, device assets, or other Apple owned material. The result must look like Tendercraft, not an Apple clone.

## Recommended product direction

Tendercraft should feel like a small, capable product studio:

- Calm editorial layout with generous space.
- Strong typography and short copy.
- Large product visuals that demonstrate real work.
- Subtle glass, blur, depth, and scroll reveals.
- Fast interactions with reduced-motion support.
- Light theme first, dark theme optional.
- Tendercraft wordmark in text until a final logo is approved.

Portfolio scope: business software, workflow products, browser tools, and automation. Do not include games or game screenshots anywhere on the Tendercraft website.

Suggested message:

> Tendercraft builds focused software that turns difficult workflows into useful products.

Primary CTA: **View our work**  
Secondary CTA: **Start a project**

## Site map

1. `/` — Home
2. `/work` — All verified projects
3. `/work/[slug]` — Individual case studies
4. `/about` — Tendercraft, capabilities, and working approach
5. `/contact` — Direct enquiry options
6. `/privacy` — Small privacy notice if analytics or a form is added
7. `/admin` — Private project-management interface; never shown in public navigation

Do not add public customer accounts, a blog, or a general-purpose CMS. The only account flow in version one is the private Tendercraft administrator login.

## Tendercraft logo system

Recommended concept asset:

- `assets\brand\tendercraft-logo-concept-v2.png`

Earlier exploration retained for comparison:

- `assets\brand\tendercraft-logo-concept-v1.png`

The concept uses an interlocking `T` and `C` ribbon to express precision, craftsmanship, connected systems, and forward movement. It pairs the mark with the exact uppercase wordmark `TENDERCRAFT` in graphite and electric cobalt.

Antigravity must treat this PNG as the approved visual direction, then recreate the final mark as clean original SVG geometry instead of embedding or tracing a low-resolution bitmap. Produce:

- Horizontal primary lockup.
- Standalone `TC` symbol.
- Dark-background and light-background versions.
- Single-colour black and white versions.
- Favicon and app-icon sizes.
- Open Graph lockup.
- `docs/BRAND_GUIDE.md` with colour values, clear space, minimum size, and misuse examples.

The final wordmark must spell `TENDERCRAFT` exactly. Keep the identity original and avoid resemblance to Apple, Microsoft, or other technology brands.

## Home page structure

1. Minimal sticky navigation: Tendercraft, Work, About, Contact.
2. Hero with one sentence, two CTAs, and a restrained animated product mosaic.
3. Featured work: three large case-study cards using real screenshots.
4. Capabilities: web apps, browser extensions, mobile products, automation, and product design.
5. Working approach: Discover, Build, Verify, Launch.
6. Selected proof: only facts verified from repositories, live URLs, packages, or marketplace pages.
7. Contact banner using `hello@tendercrafthq.com`.
8. Footer with `yyautama@tendercrafthq.com`, location `Nigeria / Remote`, and verified social links only.

## Initial project asset inventory

Antigravity must inspect these files, choose the strongest images, copy selected files into the website's `public/projects/<slug>/` folders, optimize them, and record their original source in `docs/ASSET_PROVENANCE.md`.

### FreightHUD

Repository: `C:\Users\Yayis\Desktop\Antigravity projects\Freight`

Strong candidates:

- `assets\campaign\freighthud_hero_banner.jpg`
- `website\assets\store_demo_rate_1280x800.png`
- `store\assets\screenshot_1_1280x800.png`
- `store\assets\screenshot_2_1280x800.png`
- `store\assets\marquee_promo_1400x560.png`

### CartItemizer

Repository: `C:\Users\Yayis\Desktop\Antigravity projects\Amazon`

Strong candidates:

- `assets\cartitemizer_cover.jpg`
- `assets\store\screenshot-1-amazon-split.jpg`
- `assets\store\screenshot-2-homedepot.jpg`
- `assets\store\screenshot-3-formats.jpg`
- `website\assets\multistore-quickbooks-sync.jpg`

### Beadle

Repository: `C:\Users\Yayis\Documents\Codex\2026-09-17\as\work\beadle`

Positioning: urgent Windows desktop alerts with delivery and acknowledgement tracking for organisations managing Windows PCs and Active Directory.

Available brand asset:

- `brand\beadle-mark.svg`

Antigravity must run or inspect the current Beadle console and capture clean screenshots of the real alert creation, delivery tracking, acknowledgement, and administration flows. Do not show the Lemon Squeezy store as live payments while it remains in Test mode or pending provider review.

### CompoundOS

Repository: `C:\Users\Yayis\Desktop\Design\compoundos  Alternate`

Strong candidates:

- `shots\01-dashboard.png`
- `shots\02-tenants.png`
- `shots\03-tenant-profile.png`
- `shots\05-payments.png`
- `shots\06-gatepasses.png`
- `shots\07-complaints.png`
- `shots\10-tenant-portal.png`
- `shots\11-tenant-portal-mobile.png`

Position it as estate and compound operations software only after the current product state and public claims have been verified from the repository.

### Automated Risk Register

Repository: `C:\Users\Yayis\Desktop\business\THE OFFICE\automated-risk-register`

Verified public landing page candidate: `https://automated-risk-register-web.vercel.app/`

No suitable portfolio screenshots were found in the repository during this plan update. Antigravity must capture fresh desktop and mobile screenshots from the verified live landing page and, when safely accessible, the real authenticated dashboard. Do not expose customer, account, risk, or other private data in captured assets. Label the product accurately: the public landing page is deployed, while paid subscription entitlements must not be described as complete until verified.

### Additional projects

Inspect these before inclusion:

- Texas Commercial Permit Radar: `C:\Users\Yayis\Documents\antigravity\lively-brahmagupta`
- Add other business products only after their repositories, assets, and delivery states are verified.

Never call a product launched, available, paid, approved, or production ready unless current evidence supports that exact claim. A project can still be shown as a case study with an accurate status such as prototype, beta, deployed demo, pending marketplace review, or production release.

## Case-study format

Each project page should contain:

- Product name and one-line outcome.
- Real hero visual.
- The user problem.
- What Tendercraft built.
- Three to five verified capabilities.
- A short gallery of real screenshots.
- Platform and technology summary.
- Accurate current status.
- Verified live, store, or repository link when public.
- CTA to discuss a similar project.

Keep project data in one typed file such as `src/data/projects.ts`. Pages must render from that data so claims, images, alt text, status, and links stay consistent.

## Technical direction

For a new repository, use:

- Next.js App Router with TypeScript.
- Tailwind CSS.
- `next/image` for responsive images.
- Static project data; no CMS in version one.
- Vercel deployment.
- Minimal analytics only after consent and a deliberate provider choice.
- Supabase Auth, Postgres, and Storage for the private project-management backend.

Use only the components needed from the Apple Creative Design System. Likely candidates are Button, Card, Tabs, and a simple navigation treatment. Avoid installing all 214 components.

If the component CLI is compatible with the generated Next.js version, initialize it and copy only selected components. If compatibility fails, reproduce the required visual behavior with local Tailwind and accessible HTML instead of changing the whole stack.

## Project-management backend

Build a private `/admin` interface that lets the Tendercraft owner create, edit, preview, publish, unpublish, reorder, feature, and remove portfolio projects without editing source code.

### Authentication

- Use Supabase Auth with cookie-based server sessions.
- Disable public sign-up.
- Create the first administrator manually and authorise it through an `admin_users` allowlist table keyed to `auth.users.id`.
- Send the administrator login or magic link to `yyautama@tendercrafthq.com` or the verified owner account.
- Protect `/admin`, all mutations, and all asset uploads on the server.
- Never expose the Supabase service-role key to client code. Prefer authenticated requests protected by Row Level Security so the service-role key is unnecessary for routine administration.

### Data model

Create migrations for:

`projects`

- `id` UUID primary key
- `slug` unique text
- `name` text
- `tagline` text
- `summary` text
- `problem` text
- `solution` text
- `capabilities` text array or JSON
- `technology` text array or JSON
- `status` constrained text
- `status_label` text
- `cover_image_path` text
- `live_url` nullable text
- `store_url` nullable text
- `repository_url` nullable text
- `featured` boolean
- `published` boolean
- `sort_order` integer
- `created_at` and `updated_at` timestamps

`project_assets`

- `id` UUID primary key
- `project_id` UUID foreign key with cascade on project deletion
- `storage_path` text
- `alt_text` text
- `caption` nullable text
- `sort_order` integer
- `created_at` timestamp

`admin_users`

- `user_id` UUID primary key referencing `auth.users`
- `created_at` timestamp

### Permissions

- Anonymous visitors can select only rows where `published = true`.
- Only allowlisted administrators can insert, update, publish, unpublish, reorder, or delete projects and assets.
- Enable RLS on every exposed table and use both explicit grants and policies.
- Create a `project-assets` Storage bucket with public read access only for published portfolio media and administrator-only upload, update, and delete access.
- Validate URLs, slugs, lengths, status values, file type, and upload size at the server boundary.

### Admin experience

- Dashboard table with thumbnail, title, status, published state, featured state, and modified date.
- Create/edit form with real-time slug preview and clear validation errors.
- Image upload, alt text, captions, ordering, and preview.
- Publish and unpublish controls.
- Drag or accessible move-up/move-down ordering.
- Preview an unpublished project through an authenticated preview route.
- Default removal action is reversible unpublish. Permanent deletion requires a separate confirmation showing the project name and must clean up associated Storage objects.
- Display success or failure clearly and prevent duplicate submissions.

### Public rendering

- Replace the static project data only after database seeding and parity checks succeed.
- Fetch published projects on the server.
- Revalidate the relevant public routes after an administrator mutation.
- Provide a safe empty state when no projects are published.
- Seed Beadle, CompoundOS, Automated Risk Register, FreightHUD, and CartItemizer from verified content only.

## Domain and email safety

Tendercraft already owns `tendercrafthq.com`. The deployment target is Vercel. Deploy and verify the Vercel production URL first, then connect the existing domain through Cloudflare DNS.

When connecting `tendercrafthq.com` to Vercel:

- Keep Cloudflare as DNS provider.
- Preserve all Email Routing MX and TXT records.
- Add `tendercrafthq.com` and `www.tendercrafthq.com` to the correct Vercel project.
- Add or change only the website A, AAAA, or CNAME records Vercel currently requests.
- Do not replace the Cloudflare nameservers and do not remove any email-routing record.
- Redirect `www.tendercrafthq.com` to the canonical HTTPS domain.
- Use `https://tendercrafthq.com` as the canonical production URL after Vercel validates the domain and provisions HTTPS.
- Verify that mail still reaches both `hello@tendercrafthq.com` and `yyautama@tendercrafthq.com` after DNS changes.

## Phases and acceptance gates

### Phase 0 — Inventory and truth check

1. Locate or create the Tendercraft website repository.
2. Read repository guidance and inspect existing code before changing anything.
3. Inventory all candidate business projects, screenshots, live links, store links, logos, and delivery states. Exclude every game project.
4. Create:
   - `docs/PROJECT_INVENTORY.md`
   - `docs/ASSET_PROVENANCE.md`
   - `docs/BUILD_STATE.md`
5. Record uncertain claims as `UNVERIFIED`; do not publish them.

Gate: at least three projects have verified source paths, usable images, accurate descriptions, and explicit statuses.

### Phase 1 — Foundation and design system

1. Scaffold the smallest viable Next.js site if no app exists.
2. Define Tendercraft tokens for colour, type, spacing, radius, shadow, and motion.
3. Add only the required components from the selected design-system repository.
4. Build the header, footer, buttons, project card, section wrapper, and typography primitives.
5. Support keyboard navigation, visible focus, semantic headings, and reduced motion.
6. Recreate the approved Tendercraft logo concept as responsive SVG variants and document the brand system.

Gate: the shell works at mobile, tablet, and desktop widths without horizontal overflow or inaccessible controls.

### Phase 1B — Project backend and administration

1. Create the Supabase project configuration and checked-in SQL migrations.
2. Configure server-side authentication and the single-owner administrator allowlist.
3. Create the project tables, Storage bucket, grants, and RLS policies.
4. Build `/admin` project listing, editor, media management, preview, publishing, ordering, unpublishing, and confirmed deletion.
5. Seed verified projects and compare database-rendered pages with the original static content.
6. Add focused checks proving anonymous writes fail, non-admin writes fail, admin CRUD succeeds, unpublished projects stay private, and deletion removes associated database rows and Storage objects.

Gate: a verified administrator can complete the full project lifecycle; signed-out visitors can read only published projects; all unauthorised mutations fail.

### Phase 2 — Content and assets

1. Select and copy real project images.
2. Convert oversized screenshots to WebP or AVIF while preserving useful detail.
3. Write accurate alt text.
4. Create validated project seed data and generated database types.
5. Draft clear Tendercraft copy without invented clients, revenue, testimonials, metrics, or launch claims.

Gate: every published statement traces to repository or live evidence; every image has a provenance entry.

### Phase 3 — Pages

1. Build Home, Work, project details, About, Contact, and Privacy.
2. Use `hello@tendercrafthq.com` for general enquiries.
3. Use `yyautama@tendercrafthq.com` as the personal contact option.
4. Start with direct email CTAs. Add a hosted contact form only when spam handling and a provider are deliberately chosen.
5. Add useful empty, error, and not-found states.
6. Render all Work and case-study content from the secured project backend.

Gate: all navigation, project cards, case-study routes, external links, and email CTAs work.

### Phase 4 — Quality

1. Run lint, type checking, and production build.
2. Test responsive layouts at 360, 768, 1024, and 1440 pixels.
3. Test keyboard-only navigation and reduced motion.
4. Check contrast, image aspect ratios, broken links, metadata, favicon, Open Graph image, sitemap, and robots file.
5. Run Lighthouse against the production build and fix material accessibility, performance, SEO, and best-practice failures.

Gate: production build passes; no broken links; no console errors; Lighthouse targets are 90+ for performance and 95+ for accessibility, best practices, and SEO on the tested production route.

### Phase 5 — Deployment

1. Push the verified website repository to GitHub and connect that repository to the intended Vercel project.
2. Deploy a Vercel preview and review copy, images, statuses, admin security, and mobile layout.
3. Promote the verified build to Vercel production and record the working `*.vercel.app` URL.
4. Add `tendercrafthq.com` and `www.tendercrafthq.com` in Vercel.
5. In Cloudflare, add only the web DNS records requested by Vercel while preserving Email Routing MX and TXT records.
6. Make `https://tendercrafthq.com` canonical and redirect `www` to it.
7. Verify HTTPS, public routes, `/admin` protection, contact links, and both forwarding addresses.
8. Update `docs/BUILD_STATE.md` with the exact Git commit, Vercel deployment, DNS records changed, domain status, and verification evidence.

Gate: the public domain loads over HTTPS, all core routes work, and both business email addresses still receive mail.

## Commands Antigravity should use

Adapt package-manager commands to the repository lockfile.

```powershell
# New project only
npx create-next-app@latest tendercraft-site --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd tendercraft-site

# Add the design-system tooling, then select only needed components
npm install -D @smart-coder-labs/apple-design-system
npx @smart-coder-labs/apple-design-system init
npx @smart-coder-labs/apple-design-system add Button Card Tabs

# Project backend
npm install @supabase/supabase-js @supabase/ssr
npm install -D supabase
npx supabase init

# Quality gates
npm run lint
npx tsc --noEmit
npm run build
```

Do not run the design-system initializer blindly inside an existing app. Inspect its framework, Tailwind version, aliases, CSS entry point, and component conventions first.

## Master prompt for Antigravity

```text
You are building the official Tendercraft company and portfolio website for tendercrafthq.com.

Read TENDERCRAFT_ANTIGRAVITY_WEBSITE_PLAN.md completely before changing files. Treat it as the product specification and execution checklist. Begin at Phase 0 and do not advance when a phase gate fails.

Primary goals:
1. Explain Tendercraft clearly as a product studio.
2. Showcase real completed or accurately labelled projects using real repository assets.
3. Convert visitors into enquiries through hello@tendercrafthq.com and yyautama@tendercrafthq.com.
4. Deliver an accessible, responsive, fast website with restrained Apple-inspired polish and Tendercraft's own identity.
5. Deliver a secure private backend where the owner can create, modify, reorder, publish, unpublish, and remove projects and their media.
6. Turn assets/brand/tendercraft-logo-concept-v2.png into a complete original SVG logo system and brand guide.

Priority portfolio products:
- Beadle
- CompoundOS
- Automated Risk Register
- FreightHUD and CartItemizer may also be included after the same verification process.
- Exclude all games and game assets.

Design sources:
- Use https://github.com/smart-coder-labs/design-system selectively for compatible web components.
- Use https://github.com/mjmirza/apple-design-system only as a design reference.
- Do not copy Apple's branding or publish Apple-owned assets, fonts, logos, product images, or symbols.

Operating rules:
- Inspect before editing.
- Reuse the existing stack and patterns if a website repository already exists.
- Add the fewest dependencies and components needed.
- Never invent product status, customers, testimonials, revenue, metrics, reviews, marketplace approval, or live links.
- Keep uncertain content out of the public UI and record it as UNVERIFIED in docs/PROJECT_INVENTORY.md.
- Use Supabase migrations, Auth, Postgres, Storage, explicit grants, and RLS for the private project backend.
- Disable public sign-up and allow only the verified Tendercraft owner into /admin.
- Never expose a service-role key in client code or commit any secret.
- Preserve Cloudflare Email Routing MX and TXT records when the domain is connected.
- Keep docs/BUILD_STATE.md current after each phase with commands, results, screenshots, open risks, and the exact next step.

Start now with Phase 0. Verify Beadle, CompoundOS, and Automated Risk Register first, then inspect the other listed business products. Report the asset inventory and proposed public claims before continuing to Phase 1.
```

## Per-phase continuation prompt

```text
Continue the Tendercraft website from TENDERCRAFT_ANTIGRAVITY_WEBSITE_PLAN.md. Read docs/BUILD_STATE.md and inspect the current working tree first. Resume at the first incomplete phase. Do not redo completed work. Complete that phase, run its acceptance gate, record evidence and remaining risks in docs/BUILD_STATE.md, then stop with the exact next command or action.
```

## Final audit prompt

```text
Audit the Tendercraft website against every requirement and gate in TENDERCRAFT_ANTIGRAVITY_WEBSITE_PLAN.md. Re-run lint, type checking, production build, responsive checks, keyboard checks, link checks, and production-domain checks. Verify that each public project claim and asset has evidence. Verify every logo variant, exact wordmark spelling, favicon, and brand-guide requirement. Test the complete administrator project lifecycle and prove anonymous and non-admin mutations fail. Verify unpublished projects and private media cannot leak. Verify that Cloudflare email routing still works for hello@tendercrafthq.com and yyautama@tendercrafthq.com. Fix in-scope failures, update docs/BUILD_STATE.md, and clearly separate verified completion from anything still pending or controlled by an external provider.
```
