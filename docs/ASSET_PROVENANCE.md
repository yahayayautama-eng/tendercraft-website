# Tendercraft Asset Provenance Matrix

Last updated: September 19, 2026
Status: Phase 0 Verified

## Purpose

Every visual asset published on `tendercrafthq.com` must trace back to an authentic, verified repository source or official concept file. This document details the exact origin, licensing, target destination, and optimization status of all brand and project assets.

---

## 1. Brand Identity Assets

### Official Concept Reference
- **Source File:** `C:\Users\Yayis\Documents\Codex\2026-09-18\d\assets\brand\tendercraft-logo-concept-v2.png`
- **Dimensions:** 2880 × 960 px
- **Visual Motif:** Interlocking ribbon monogram forming `TC` in electric cobalt blue and dark graphite black, paired with modern geometric grotesque uppercase wordmark `TENDERCRAFT`.
- **Target Implementation:**
  - `public/brand/tendercraft-mark.svg` (Standalone TC vector icon)
  - `public/brand/tendercraft-logo-light.svg` (Horizontal lockup for light backgrounds)
  - `public/brand/tendercraft-logo-dark.svg` (Horizontal lockup for dark backgrounds)
  - `public/brand/tendercraft-logo-mono-black.svg` (Monochrome black lockup)
  - `public/brand/tendercraft-logo-mono-white.svg` (Monochrome white lockup)
  - `src/app/icon.svg` & `src/app/favicon.ico` (Browser tab icons)
  - `src/app/apple-icon.png` (Mobile touch icon)
  - `public/brand/tendercraft-og.png` (Open Graph 1200 × 630 preview image)

---

## 2. Project Asset Provenance

### 2.1 Beadle
- **Origin Directory:** `C:\Users\Yayis\Documents\Codex\2026-09-17\as\work\beadle`
- **Brand Mark:**
  - Source: `brand\beadle-mark.svg` (1,724 bytes)
  - Target: `public/projects/beadle/beadle-mark.svg`
- **Screenshots & Visuals:**
  - Source: Rendered from `outputs\Beadle-Interactive-Demo-v1\demo.html`
  - High-res Capture 1: `raw-captures\beadle-alert-active.png` (Standard popup alert with priority badge and active acknowledge action)
  - High-res Capture 2: `raw-captures\beadle-demo-full.png` (Complete workflow view with live delivery and receipt rate table)
  - Target:
    - `public/projects/beadle/beadle-hero.webp`
    - `public/projects/beadle/beadle-alert-active.webp`
    - `public/projects/beadle/beadle-delivery-report.webp`

### 2.2 CompoundOS
- **Origin Directory:** `C:\Users\Yayis\Desktop\Design\compoundos  Alternate\shots`
- **Screenshots & Visuals:**
  - Source 1: `shots\01-dashboard.png` (242,190 bytes) -> Operations overview & KPIs
  - Source 2: `shots\02-tenants.png` (236,787 bytes) -> Resident & tenant directory
  - Source 3: `shots\03-tenant-profile.png` (215,375 bytes) -> Resident detail & lease ledger
  - Source 4: `shots\05-payments.png` (166,448 bytes) -> Estate payment tracking
  - Source 5: `shots\06-gatepasses.png` (226,247 bytes) -> Visitor access authorization
  - Source 6: `shots\07-complaints.png` (190,402 bytes) -> Facility maintenance ticketing
  - Source 7: `shots\10-tenant-portal.png` (66,853 bytes) -> Tenant self-service portal
  - Source 8: `shots\11-tenant-portal-mobile.png` (42,480 bytes) -> Mobile gate pass & requests
  - Target:
    - `public/projects/compoundos/compoundos-hero.webp`
    - `public/projects/compoundos/dashboard.webp`
    - `public/projects/compoundos/tenants.webp`
    - `public/projects/compoundos/payments.webp`
    - `public/projects/compoundos/gatepasses.webp`
    - `public/projects/compoundos/complaints.webp`
    - `public/projects/compoundos/tenant-portal.webp`

### 2.3 Automated Risk Register (ARR)
- **Origin Directory & Deployed URL:** `https://automated-risk-register-web.vercel.app/` (Repo: `C:\Users\Yayis\Desktop\business\THE OFFICE\automated-risk-register`)
- **Screenshots & Visuals:**
  - Source 1: `raw-captures\arr-landing.png` (Captured live via browser engine at 1440 × 900 resolution) -> Hero with interactive risk card ("12 open risks", "03 Critical", "Actions on track")
  - Source 2: `raw-captures\arr-full.png` (Full page live capture) -> Features, workflow ("Capture, Score, Act, Report"), and governance blocks
  - Target:
    - `public/projects/automated-risk-register/arr-hero.webp`
    - `public/projects/automated-risk-register/arr-card.webp`
    - `public/projects/automated-risk-register/arr-workflow.webp`

### 2.4 FreightHUD
- **Origin Directory:** `C:\Users\Yayis\Desktop\Antigravity projects\Freight`
- **Screenshots & Visuals:**
  - Source 1: `assets\campaign\freighthud_hero_banner.jpg` (Banner)
  - Source 2: `store\assets\screenshot_1_1280x800.png` (Load board rate calculator)
  - Source 3: `store\assets\screenshot_2_1280x800.png` (Rate breakdown & deadhead tool)
  - Source 4: `store\assets\marquee_promo_1400x560.png` (Marquee promotion)
  - Target:
    - `public/projects/freighthud/freighthud-hero.webp`
    - `public/projects/freighthud/rate-calculator.webp`
    - `public/projects/freighthud/rate-breakdown.webp`

### 2.5 CartItemizer
- **Origin Directory:** `C:\Users\Yayis\Desktop\Antigravity projects\Amazon`
- **Screenshots & Visuals:**
  - Source 1: `assets\cartitemizer_cover.jpg` (Cover)
  - Source 2: `assets\store\screenshot-1-amazon-split.jpg` (Amazon order splitting)
  - Source 3: `assets\store\screenshot-2-homedepot.jpg` (Home Depot receipt parser)
  - Source 4: `assets\store\screenshot-3-formats.jpg` (Accounting export formats)
  - Target:
    - `public/projects/cartitemizer/cartitemizer-hero.webp`
    - `public/projects/cartitemizer/amazon-split.webp`
    - `public/projects/cartitemizer/homedepot.webp`
    - `public/projects/cartitemizer/export-formats.webp`

---

## 3. Exclusion Auditing

- **Apple-Owned Assets:** Strictly 0 Apple logos, 0 SF Symbols, 0 San Francisco font binaries, 0 Apple device mockups. All design tokens and components use original Tendercraft styling.
- **Game Assets:** Strictly 0 game titles, 0 game screenshots, 0 game references.
- **Synthetic / Stock Fakes:** No stock photography or invented software mockups. Every image maps 1:1 to real code in the specified repositories.
