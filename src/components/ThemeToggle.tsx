'use client';

import React, { useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => obs.disconnect();
}
const getIsDark = () => document.documentElement.classList.contains('dark');

/** Animated sun/moon switch. Dark is the default; the choice persists. */
export function ThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getIsDark, () => true);

  const toggle = () => {
    const next = !isDark;
    const root = document.documentElement;
    const apply = () => {
      root.classList.toggle('dark', next);
      try {
        localStorage.setItem('tc-theme', next ? 'dark' : 'light');
      } catch {}
    };
    // Smooth cross-fade where the View Transitions API is available
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doc.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
      className={cn(
        'relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
