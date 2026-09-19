# Tendercraft Brand Identity Guide

**Version:** 2.0  
**Effective Date:** September 19, 2026  
**Canonical Domain:** `tendercrafthq.com`

---

## 1. Brand Essence & Positioning

**Tendercraft** is an independent product studio that builds focused business software, operational systems, browser tools, and continuous automation.

> *"Tendercraft builds focused software that turns difficult workflows into useful products."*

The brand identity conveys:
- **Craftsmanship & Precision:** Engineered with structural care, clear hierarchy, and restraint.
- **Architectural Utility:** Solid, durable, and practical software tools for real-world operations.
- **Restrained Motion & Polish:** Subtle depth, calm white-space, and tactile responsiveness.
- **Independence:** Wholly original visual identity; never copying Apple, Microsoft, or any other vendor's assets, logos, fonts, or symbols.

---

## 2. Logo System

The Tendercraft logo consists of the **Interlocking TC Monogram** paired with the uppercase grotesque wordmark **TENDERCRAFT**.

### 2.1 Approved Assets

| Asset File | Intended Usage |
|---|---|
| `public/brand/tendercraft-mark.svg` | Standalone symbol for app icons, avatars, small footprint badges. |
| `public/brand/tendercraft-logo-light.svg` | Primary horizontal lockup on light backgrounds (`#FFFFFF` to `#F1F5F9`). |
| `public/brand/tendercraft-logo-dark.svg` | Primary horizontal lockup on dark backgrounds (`#0B0F19` to `#1E293B`). |
| `public/brand/tendercraft-logo-mono-black.svg` | Single-color black reproduction for print, monochrome faxes, stamps. |
| `public/brand/tendercraft-logo-mono-white.svg` | Single-color white reproduction for high-contrast overlays and dark photography. |
| `src/app/icon.svg` / `public/favicon.ico` | Browser tab favicon (32 × 32, 48 × 48). |
| `public/brand/tendercraft-og.png` | Standard 1200 × 630 px Open Graph / social preview card. |

### 2.2 Geometry & Construction

The mark is constructed from two interlocking geometric ribbons:
1. **Top Ribbon:** Projects horizontally with an assertive 45° angled terminal at the top-left, arches around the top-right in electric cobalt, and folds inward in dark graphite to form the top bar of the `T` and the upper curve of the `C`.
2. **Lower Ribbon:** Forms the vertical stem of the `T` in dark graphite, curves around the bottom-left corner, and sweeps rightward in electric cobalt to form the foundation of the `C`.
3. **Negative Space Aperture:** A clean architectural aperture balances the inner letterform, creating an open right-facing portal.

---

## 3. Official Color Palette

### 3.1 Primary Brand Colors

| Swatch | Color Name | Hex Code | RGB | HSL | Role |
|---|---|---|---|---|---|
| 🟦 | **Electric Cobalt** | `#0052FF` | `0, 82, 255` | `221°, 100%, 50%` | Primary brand accent, interactive highlights, ribbon loops. |
| 🟦 | **Cobalt Deep** | `#0042D9` | `0, 66, 217` | `222°, 100%, 43%` | Gradient shading, button hover/active states. |
| ⬛ | **Charcoal Graphite** | `#0B101D` | `11, 16, 29` | `223°, 45%, 8%` | Foundation dark, primary text on light backgrounds, dark ribbon stem. |
| ⬜ | **Pure Studio White**| `#FFFFFF` | `255, 255, 255` | `0°, 0%, 100%` | Canvas background, light cards, white wordmark on dark. |

### 3.2 Semantic UI & Surface Colors

- **Background Canvas (Light):** `#FFFFFF`
- **Surface Secondary (Light):** `#F8FAFC`
- **Surface Tertiary (Light):** `#F1F5F9`
- **Background Canvas (Dark):** `#0B0F19`
- **Surface Secondary (Dark):** `#141A29`
- **Surface Tertiary (Dark):** `#1E2638`
- **Text Primary (Light):** `#0B101D`
- **Text Secondary (Light):** `#475569`
- **Text Muted (Light):** `#94A3B8`
- **Text Primary (Dark):** `#F8FAFC`
- **Text Secondary (Dark):** `#94A3B8`
- **Border Subtle (Light):** `rgba(11, 16, 29, 0.08)`
- **Border Subtle (Dark):** `rgba(248, 250, 252, 0.1)`

---

## 4. Typography

The brand uses a modern, high-clarity grotesque sans-serif stack:
- **Headings & Wordmark:** `Geist Sans`, system `-apple-system`, `BlinkMacSystemFont`, `Inter`, `sans-serif`.
- **Wordmark Weight:** ExtraBold (800) with `+2.8px` letter-spacing in uppercase: `TENDERCRAFT`.
- **Body Text:** Regular (400) and Medium (500) with generous line-height (`1.5` to `1.65`).
- **Data & Code:** `Geist Mono`, `ui-monospace`, `SFMono-Regular`, `monospace`.

---

## 5. Clear Space & Minimum Sizes

### 5.1 Clear Space
Always maintain minimum clear space around the lockup equal to the height of the letter **`T`** in the wordmark (represented as `1X`). No other graphical elements, borders, or text should infringe upon this boundary.

```
       ┌───────────────────────────────────────┐
       │                  [1X]                 │
       │  [1X]   [ TC MARK ]   TENDERCRAFT   [1X] │
       │                  [1X]                 │
       ┌───────────────────────────────────────┘
```

### 5.2 Minimum Display Sizes
- **Horizontal Lockup (Digital):** Minimum width `160px` (or `28px` height).
- **Standalone TC Mark (Digital):** Minimum size `24 × 20px` (standard favicon `16 × 16px` or `32 × 32px` rendered via `icon.svg`).
- **Print:** Minimum width `32mm` for lockup, `6mm` for standalone mark.

---

## 6. Rules of Misuse

To maintain identity integrity, never:
- ❌ Do NOT alter the spelling of the wordmark (must always be exact uppercase `TENDERCRAFT`).
- ❌ Do NOT stretch, condense, skew, or distort the mark's proportions.
- ❌ Do NOT substitute the electric cobalt `#0052FF` with other hues (cyan, purple, green).
- ❌ Do NOT add heavy drop shadows, glow halos, or bevel filters to the vectors.
- ❌ Do NOT enclose the logo in an unapproved shape (e.g. circle badge or shield) that crops the ribbon edges.
- ❌ Do NOT use the concept PNG bitmap in production web code; always render the vector SVG assets.
- ❌ Do NOT incorporate Apple logos, SF Symbols, or trademarked external brand iconography.

---

## 7. Official Contact Details

- **General Enquiries:** `hello@tendercrafthq.com`
- **Founder / Direct Business:** `yyautama@tendercrafthq.com`
- **Studio Location:** Remote Worldwide
