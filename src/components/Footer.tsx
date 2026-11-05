import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, ArrowUpRight } from 'lucide-react';
import { MotionEmailBadge } from '@/components/MotionEmailBadge';

const COLUMNS = [
  {
    title: 'Windows Apps',
    links: [
      { href: '/apps/windows', label: 'Windows Suite Hub' },
      { href: '/apps/vox-reader', label: 'Vox Reader (Neural TTS)' },
      { href: '/apps/cropmark', label: 'Cropmark (Redaction)' },
      { href: '/apps/still-lane', label: 'Still-Lane (Screen Time)' },
    ],
  },
  {
    title: 'Studio & Fire Apps',
    links: [
      { href: '/apps/recipe-box', label: 'Recipe Box' },
      { href: '/apps/visual-schedule-board', label: 'Visual Schedule Board' },
      { href: '/apps/large-print-crosswords', label: 'Crosswords' },
      { href: '/work', label: 'Featured Work' },
      { href: '/about', label: 'About' },
      { href: '/privacy', label: 'Privacy' },
    ],
  },
];

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="tc-auto relative w-full overflow-hidden border-t border-white/[0.08] bg-ink">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[90%] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet/30 via-mint/15 to-coral/25 blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-20 sm:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-3 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center relative h-8 w-44 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet rounded-lg"
              aria-label="Tendercraft Home"
            >
              <Image src="/brand/tendercraft-logo-light.svg" alt="Tendercraft" fill className="object-contain object-left dark:hidden" />
              <Image src="/brand/tendercraft-logo-dark.svg" alt="Tendercraft" fill className="object-contain object-left hidden dark:block" />
            </Link>
            <p className="text-sm sm:text-base text-zinc-400 max-w-sm leading-relaxed">
              Focused software that turns difficult workflows into useful products. Native desktop tools, browser
              extensions, and continuous automation.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400">
              <Globe className="w-3.5 h-3.5 text-mint shrink-0" />
              Remote · Worldwide
            </div>
          </div>

          {COLUMNS.map((col, i) => (
            <div key={col.title} className={`${i === 0 ? 'lg:col-span-3' : 'lg:col-span-2'} space-y-4`}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">{col.title}</h3>
              <ul className="space-y-0.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1 min-h-[36px] text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet rounded-md"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-mint" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="md:col-span-2 lg:col-span-4 space-y-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">Direct Contact</h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-[11px] text-zinc-400 uppercase font-mono mb-1.5">General Enquiries</span>
                <MotionEmailBadge email="hello@tendercrafthq.com" size="sm" />
              </div>
              <div>
                <span className="block text-[11px] text-zinc-400 uppercase font-mono mb-1.5">Founder & Business</span>
                <MotionEmailBadge email="yyautama@tendercrafthq.com" size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div aria-hidden="true" className="mt-20 select-none">
          <p className="text-center font-semibold tracking-[-0.06em] leading-[0.8] text-[19vw] lg:text-[13.5rem] bg-gradient-to-b from-white/[0.14] to-white/0 bg-clip-text text-transparent">
            tendercraft
          </p>
        </div>

        <div className="relative border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400">
          <p>© {currentYear} Tendercraft. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>
              Built with <span className="font-display italic text-zinc-300 text-sm">precision</span> &amp; restraint.
            </span>
            <Link href="/privacy" className="hover:text-white min-h-[44px] inline-flex items-center">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
