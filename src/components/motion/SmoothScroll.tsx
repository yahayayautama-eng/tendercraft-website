'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

/**
 * Inertia smooth scrolling for mouse wheels and trackpads (touch keeps
 * native scrolling). Disabled for reduced-motion visitors. Uses the
 * real window scroll, so framer-motion's useScroll keeps working.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: { offset: -96 },
      autoRaf: true,
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Start each new page at the top (Next scrolls natively; keep Lenis in sync).
  useEffect(() => {
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true });
    lenisRef.current?.resize();
  }, [pathname]);

  return null;
}
