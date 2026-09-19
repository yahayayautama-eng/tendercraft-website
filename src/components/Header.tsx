"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-[#0B0F19]/85 backdrop-blur-xl transition-colors">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1 -ml-1 transition-opacity hover:opacity-90"
          aria-label="Tendercraft Home"
        >
          {/* Responsive SVG logo: show light version in light mode, dark in dark mode */}
          <div className="relative h-7 w-36 sm:w-44 flex items-center">
            <Image
              src="/brand/tendercraft-logo-light.svg"
              alt="Tendercraft"
              fill
              priority
              className="object-contain object-left dark:hidden"
            />
            <Image
              src="/brand/tendercraft-logo-dark.svg"
              alt="Tendercraft"
              fill
              priority
              className="object-contain object-left hidden dark:block"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors',
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-500/10'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05]'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full bg-[#0B101D] text-white hover:bg-blue-600 dark:bg-white dark:text-[#0B101D] dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-xs"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/[0.06] dark:border-white/[0.08] bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-2xl px-5 py-6 space-y-4">
          <nav className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-xl text-base font-medium transition-colors',
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-500/10 font-semibold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.05]'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <span>Start a project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
