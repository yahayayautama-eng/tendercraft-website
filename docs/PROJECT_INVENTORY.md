# Tendercraft Project Inventory & Truth Matrix

Last updated: September 19, 2026
Status: Phase 0 Verified

## Purpose

This document serves as the authoritative truth matrix for all products, case studies, claims, and links displayed on the official Tendercraft website (`tendercrafthq.com`).

Operating principle: **Never invent customers, testimonials, revenue, metrics, reviews, marketplace approval, production readiness, or live links.** Uncertain or unverified claims are recorded as `UNVERIFIED` and excluded from public marketing pages.

---

## 1. Verified Priority Case Studies

### 1.1 Beadle
- **Category:** Enterprise Desktop Software / Mass Notification System
- **Repository / Source Path:** `C:\Users\Yayis\Documents\Codex\2026-09-17\as\work\beadle`
- **Core Value Proposition:** Self-hosted desktop alert and broadcast system for Windows environments, delivering non-dismissible urgent notifications with rich content and audit-defensible acknowledgement receipts.
- **Problem Solved:** Critical IT outages, cybersecurity advisories, and emergency broadcasts sent via email are routinely ignored or delayed. Beadle bypasses email by rendering directly on employee screens.
- **Key Capabilities (Verified):**
  - Native Windows desktop agent (.NET 8 + WPF) using `Topmost` force-on-top positioning.
  - Active Directory & LDAP targeting (broadcast to specific departments or all domain workstations).
  - Persistent real-time SignalR connection with offline catch-up delivery on reconnect.
  - Rich document rendering (server-side PPTX-to-PDF conversion via LibreOffice headless; PDF rendering via PdfiumViewer; HTML via WebView2).
  - Explicit read receipts: distinct tracking for `Displayed` (rendered on screen) vs `Acknowledged` (clicked by user).
  - Silent-installable MSI deployment via Group Policy (GPO).
- **Verified Assets:**
  - `brand\beadle-mark.svg` (Official brand symbol)
  - `outputs\Beadle-Interactive-Demo-v1\demo.html` (Interactive simulation console)
  - Raw captures: `beadle-alert-active.png`, `beadle-demo-initial.png`, `beadle-demo-full.png`
- **Current Delivery Status:** Functional prototype and architecture build; interactive demonstration harness available.
- **Public evidence note:** Website screenshots are illustrative captures from the simulation harness. They do not represent live customer delivery data or messages sent to real recipients.
- **Commercial Status:** Lemon Squeezy store is in Test mode / pending provider review. **DO NOT** claim live payment processing or commercial production customers.
- **Public URL / Demo:** Interactive simulation available locally; public showcase as an on-premise enterprise architectural case study.

---

### 1.2 CompoundOS
- **Category:** Real Estate & Facility Operations Platform
- **Repository / Source Path:** `C:\Users\Yayis\Desktop\Design\compoundos  Alternate`
- **Core Value Proposition:** Modern estate, compound, and residential operations software unifying tenant directories, digital gate access, maintenance dispatch, and payment ledgers.
- **Problem Solved:** Residential estates and managed compounds rely on fragmented WhatsApp chats, paper visitor logbooks, and manual bank transfer reconciliations, leading to security lapses and missed revenue.
- **Key Capabilities (Verified):**
  - Resident directory and tenant profile management with lease tracking.
  - Digital visitor gate passes with time-bounded validation and security checkpoint verification.
  - Payment tracking and automated receipting for estate service charges.
  - Maintenance and resident complaint ticketing lifecycle with status workflows.
  - Dedicated tenant web portal and mobile-responsive self-service experience.
- **Verified Assets:**
  - `shots\01-dashboard.png` (Operations overview)
  - `shots\02-tenants.png` (Resident directory)
  - `shots\03-tenant-profile.png` (Individual lease & resident record)
  - `shots\05-payments.png` (Service charge & dues ledger)
  - `shots\06-gatepasses.png` (Visitor entry approval log)
  - `shots\07-complaints.png` (Maintenance ticketing queue)
  - `shots\10-tenant-portal.png` (Resident web portal)
  - `shots\11-tenant-portal-mobile.png` (Resident mobile view)
- **Current Delivery Status:** Functional application build (Express / Vite / React / TypeScript / Prisma).
- **Commercial Status:** Product design and working system; staged for private pilot rollout.

---

### 1.3 Automated Risk Register (ARR)
- **Category:** Continuous Risk Governance & Compliance Platform
- **Repository / Source Path:** `C:\Users\Yayis\Desktop\business\THE OFFICE\automated-risk-register`
- **Verified Public URL:** `https://automated-risk-register-web.vercel.app/`
- **Core Value Proposition:** Single operational platform to capture, score, assign, and report enterprise risks—giving leadership continuous visibility before risks materialize.
- **Problem Solved:** Spreadsheets and periodic PowerPoint reviews leave risk registers stale, ownership ambiguous, and audit evidence scattered.
- **Key Capabilities (Verified):**
  - Structured risk registry capturing operational, compliance, and strategic exposures.
  - Likelihood and impact matrix comparing inherent versus residual risk scores.
  - Action item assignment with accountable owners, target due dates, and escalation statuses.
  - Continuous signal tracking for appetite thresholds, incidents, and overdue remediation.
  - Audit-ready executive reporting and data exports.
- **Verified Assets:**
  - High-resolution live captures from deployed production web application (`raw-captures\arr-landing.png`, `raw-captures\arr-full.png`).
  - Card previews displaying live metrics: "12 open risks", "03 Critical", "89% Actions on track".
- **Current Delivery Status:** Deployed web application and public landing experience.
- **Commercial Status:** Public landing page deployed; subscription tier billing integration is in progress. **DO NOT** claim live paid enterprise subscriptions until verified.

---

## 2. Completed & Live Chrome Extensions

### 2.1 FreightHUD
- **Category:** Logistics / Browser Workflow Extension
- **Repository / Source Path:** `C:\Users\Yayis\Desktop\Antigravity projects\Freight`
- **Verified Chrome Web Store URL:** `https://chromewebstore.google.com/detail/obcpknlcbnkceaommkckjdnoclmgemic`
- **Verified Live Product Site:** `https://freighthud.vercel.app`
- **Core Value Proposition:** Real-time spot rate calculation, deadhead analysis, and FMCSA broker credibility HUD injected directly into freight broker load boards (DAT One, Truckstop).
- **Problem Solved:** Freight dispatchers lose crucial seconds switching between load boards, rate estimators, and mileage calculators while negotiating spot loads.
- **Key Capabilities (Verified):**
  - Contextual rate-per-mile calculation and deadhead analysis directly within load board DOM.
  - Live FMCSA broker verification states embedded alongside load listings.
  - Rapid margin calculation and carrier negotiation benchmarks.
- **Verified Assets:**
  - `assets\campaign\freighthud_hero_banner.jpg`
  - `store\assets\screenshot_1_1280x800.png`
  - `store\assets\screenshot_2_1280x800.png`
  - `store\assets\marquee_promo_1400x560.png`
  - `store\assets\icon128.png`
- **Current Delivery Status:** Completed & Live on the Google Chrome Web Store.
- **Commercial Status:** Active in production on Google Chrome Web Store (`obcpknlcbnkceaommkckjdnoclmgemic`).

---

### 2.2 CartItemizer
- **Category:** E-Commerce Accounting / Chrome Extension
- **Repository / Source Path:** `C:\Users\Yayis\Desktop\Antigravity projects\Amazon`
- **Verified Chrome Web Store URL:** `https://chromewebstore.google.com/detail/cartitemizer-receipt-item/lemeifejbhckhopkcgljjoonhckdoclk`
- **Verified Live Product Site:** `https://cartitemizer.vercel.app`
- **Core Value Proposition:** Automates cart itemization, expense categorization, and multi-store split exports for Amazon Business, Home Depot, AliExpress, and Temu receipts into QuickBooks batch CSV / IIF.
- **Problem Solved:** Bookkeepers and project managers spend hours manually splitting lump-sum procurement orders across client jobs, cost codes, and tax categories from printed receipts and complex invoices.
- **Key Capabilities (Verified):**
  - Automated receipt line-item extraction and tax/shipping splits across Amazon, Home Depot, AliExpress, and Temu.
  - GL code and job expense allocation across individual cart items.
  - Direct export formats tailored for QuickBooks batch CSV and IIF bookkeeping ingestion.
- **Verified Assets:**
  - `assets\cartitemizer_cover.jpg`
  - `assets\store\screenshot-1-amazon-split.jpg`
  - `assets\store\screenshot-2-homedepot.jpg`
  - `assets\store\screenshot-3-formats.jpg`
  - `assets\store\promo-marquee-1400x560.jpg`
- **Current Delivery Status:** Completed & Live on the Google Chrome Web Store (v1.3.1).
- **Commercial Status:** Active in production on Google Chrome Web Store (`lemeifejbhckhopkcgljjoonhckdoclk`).

---

## 3. Excluded & Unverified Projects

- **Texas Commercial Permit Radar:** Repository `C:\Users\Yayis\Documents\antigravity\lively-brahmagupta`. Status: `UNVERIFIED` for portfolio inclusion. Internal lead generation pipeline without public-ready UI or visual assets. Excluded from public portfolio.
- **Games & Game Screenshots:** Explicitly excluded per specification. No game projects or game assets will be published on `tendercrafthq.com`.

---

## 4. Truth Gate Summary

| Project | Source Verified | Assets Verified | Status Verified | Public Inclusion |
|---|---|---|---|---|
| **Beadle** | YES | YES | YES (Prototype / On-prem preview) | **Priority Case Study** |
| **CompoundOS** | YES | YES | YES (Working software build) | **Priority Case Study** |
| **Automated Risk Register** | YES | YES | YES (Deployed web application) | **Priority Case Study** |
| **FreightHUD** | YES | YES | YES (Completed Chrome Extension) | **Featured Portfolio Case Study** |
| **CartItemizer** | YES | YES | YES (Completed Chrome Extension v1.3.1) | **Featured Portfolio Case Study** |
| **Texas Permit Radar** | YES | NO | `UNVERIFIED` for portfolio | EXCLUDED from v1 |
| **Games** | N/A | N/A | N/A | STRICTLY EXCLUDED |
