import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Globe, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-black/[0.08] dark:border-white/[0.08] bg-zinc-50 dark:bg-[#070A11] transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center relative h-8 w-44 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
              aria-label="Tendercraft Home"
            >
              <Image
                src="/brand/tendercraft-logo-light.svg"
                alt="Tendercraft"
                fill
                className="object-contain object-left dark:hidden"
              />
              <Image
                src="/brand/tendercraft-logo-dark.svg"
                alt="Tendercraft"
                fill
                className="object-contain object-left hidden dark:block"
              />
            </Link>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-sm leading-relaxed">
              Tendercraft builds focused software that turns difficult workflows into useful products. Business tools, browser extensions, and continuous automation.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Remote Worldwide</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Studio
            </h3>
            <ul className="space-y-1 text-sm font-medium">
              <li>
                <Link
                  href="/work"
                  className="inline-flex items-center min-h-[44px] text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
                >
                  Featured Work
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="inline-flex items-center min-h-[44px] text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
                >
                  About & Approach
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center min-h-[44px] text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
                >
                  Start a Project
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex items-center min-h-[44px] text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
                >
                  Privacy Notice
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-2 lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Direct Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-xs text-zinc-400 uppercase font-mono mb-1">
                  General Enquiries
                </span>
                <a
                  href="mailto:hello@tendercrafthq.com"
                  className="inline-flex items-center gap-1.5 min-h-[44px] font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>hello@tendercrafthq.com</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              </div>
              <div className="pt-1">
                <span className="block text-xs text-zinc-400 uppercase font-mono mb-1">
                  Founder & Business
                </span>
                <a
                  href="mailto:yyautama@tendercrafthq.com"
                  className="inline-flex items-center gap-1.5 min-h-[44px] font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>yyautama@tendercrafthq.com</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>© {currentYear} Tendercraft. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Built with precision & restraint.</span>
            <Link
              href="/privacy"
              className="hover:underline min-h-[44px] inline-flex items-center"
            >
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
