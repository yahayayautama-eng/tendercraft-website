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
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.06] dark:border-white/[0.08] bg-white/85 dark:bg-[#0B0F19]/90 backdrop-blur-xl transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Lockup (Minimum 44x44px touch target) */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0F19] rounded-xl p-1 -ml-1 transition-opacity hover:opacity-90 min-h-[44px] min-w-[44px]"
          aria-label="Tendercraft Home"
        >
          {/* Responsive SVG logo: 460x76 aspect ratio (~6:1) */}
          <div className="relative h-8 w-40 sm:w-48 flex items-center">
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
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0F19] inline-flex items-center min-h-[38px]',
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-500/10 font-semibold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                )}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 shrink-0" />
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-full bg-[#0B101D] text-white hover:bg-blue-600 dark:bg-white dark:text-[#0B101D] dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-200 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0F19] min-h-[40px]"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button (Strictly >= 44x44px) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0F19] inline-flex items-center justify-center transition-colors"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/[0.06] dark:border-white/[0.08] bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-2xl px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'min-h-[44px] px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-500/10 font-semibold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                  )}
                >
                  <span className="flex items-center gap-2">
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                    )}
                    <span>{item.label}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
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
