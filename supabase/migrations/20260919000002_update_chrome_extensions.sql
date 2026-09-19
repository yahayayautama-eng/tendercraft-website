-- Migration: 20260919000002_update_chrome_extensions.sql
-- Description: Updates FreightHUD and CartItemizer to completed production status with live Chrome Web Store and deployment URLs

UPDATE public.projects
SET
  status = 'production',
  status_label = 'Completed / Live on Chrome Web Store',
  live_url = 'https://freighthud.vercel.app',
  store_url = 'https://chromewebstore.google.com/detail/obcpknlcbnkceaommkckjdnoclmgemic',
  featured = true,
  updated_at = NOW()
WHERE slug = 'freighthud';

UPDATE public.projects
SET
  status = 'production',
  status_label = 'Completed / Live on Chrome Web Store (v1.3.1)',
  live_url = 'https://cartitemizer.vercel.app',
  store_url = 'https://chromewebstore.google.com/detail/cartitemizer-receipt-item/lemeifejbhckhopkcgljjoonhckdoclk',
  featured = true,
  updated_at = NOW()
WHERE slug = 'cartitemizer';
