'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Progressive scroll reveal for content pages that aren't hand-animated.
 * Sections start visible (no-JS safe); JS hides only those below the fold,
 * then blurs/rises them in as they enter the viewport.
 */
export function AutoReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const vh = window.innerHeight;
    const collect = (el: Element, depth: number): HTMLElement[] => {
      if (!(el instanceof HTMLElement) || el.tagName === 'SCRIPT') return [];
      // Split very tall blocks so long pages reveal piece by piece
      if (depth < 3 && el.offsetHeight > vh * 1.2 && el.children.length > 1) {
        return Array.from(el.children).flatMap((c) => collect(c, depth + 1));
      }
      return [el];
    };
    const pageRoot = root.firstElementChild;
    const targets = (pageRoot ? Array.from(pageRoot.children).flatMap((c) => collect(c, 0)) : []).filter(
      (el) => el.getBoundingClientRect().top > vh * 0.9
    );

    targets.forEach((el) => el.classList.add('reveal-init'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      targets.forEach((el) => el.classList.remove('reveal-init', 'reveal-in'));
    };
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
