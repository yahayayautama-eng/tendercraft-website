"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/work', label: 'Work' },
  { href: '/apps/windows', label: 'Windows Apps' },
  { href: '/apps/recipe-box', label: 'Recipe Box' },
  { href: '/apps/large-print-crosswords', label: 'Crosswords' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-3 sm:pt-4">
      <motion.div
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'mx-auto max-w-6xl h-14 sm:h-16 rounded-2xl pl-3 pr-2 sm:pl-4 flex items-center justify-between transition-all duration-500',
          scrolled || mobileMenuOpen
            ? 'glass bg-ink/75 shadow-[0_8px_40px_-12px_rgba(124,92,255,0.35)]'
            : 'border border-transparent'
        )}
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center rounded-xl p-1 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet transition-opacity hover:opacity-85"
          aria-label="Tendercraft Home"
        >
          <div className="relative h-7 w-36 sm:w-44 flex items-center">
            <Image
              src="/brand/tendercraft-logo-dark.svg"
              alt="Tendercraft"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation with sliding hover pill */}
        <nav
          className="hidden lg:flex items-center gap-0.5"
          aria-label="Main Navigation"
          onPointerLeave={() => setHovered(null)}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const showPill = hovered ? hovered === item.href : active;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                onPointerEnter={() => setHovered(item.href)}
                className={cn(
                  'relative px-3.5 py-2 rounded-full text-[13px] font-medium transition-colors duration-200 min-h-[38px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet',
                  active ? 'text-white' : 'text-zinc-400 hover:text-white'
                )}
              >
                {showPill && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.08]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {active && (
                  <span className="relative mr-2 h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_10px_#3DF2C0]" />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/contact"
            className="conic-border group rounded-xl p-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
          >
            <span className="flex items-center gap-1.5 rounded-[11px] bg-ink px-4 py-2.5 text-[13px] font-semibold text-white transition-colors group-hover:bg-ink-2 min-h-[40px]">
              Start a project
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="lg:hidden min-w-[44px] min-h-[44px] rounded-xl text-zinc-200 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet inline-flex items-center justify-center transition-colors"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mx-auto max-w-6xl mt-2 glass rounded-2xl p-3 bg-ink/80"
          >
            <nav className="flex flex-col" aria-label="Mobile Navigation">
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'min-h-[48px] px-4 rounded-xl text-lg font-medium flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet',
                        active ? 'text-white bg-white/[0.06]' : 'text-zinc-300 hover:bg-white/[0.04]'
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-zinc-500">0{i + 1}</span>
                        {item.label}
                      </span>
                      {active ? (
                        <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_10px_#3DF2C0]" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 opacity-40" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 min-h-[48px] flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-violet via-[#6a7cff] to-mint text-ink font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Start a project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
