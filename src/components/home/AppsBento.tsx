import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Monitor, Tablet } from 'lucide-react';
import { Reveal, SplitWords } from '@/components/motion/primitives';
import { cn } from '@/lib/utils';

interface AppTile {
  href: string;
  name: string;
  blurb: string;
  platform: 'Windows' | 'Fire tablet';
  icon: string;
  shot: string;
  accent: string;
  span: string;
}

const APPS: AppTile[] = [
  {
    href: '/apps/vox-reader',
    name: 'Vox Reader',
    blurb: 'Neural text-to-speech for EPUB, PDF and Word — fully offline.',
    platform: 'Windows',
    icon: '/vox-reader/icon.png',
    shot: '/vox-reader/screenshot.png',
    accent: '#7C5CFF',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    href: '/apps/cropmark',
    name: 'Cropmark',
    blurb: 'Screen capture with true pixel-erasing redaction.',
    platform: 'Windows',
    icon: '/cropmark/icon.png',
    shot: '/cropmark/screenshot.png',
    accent: '#FF6B57',
    span: '',
  },
  {
    href: '/apps/still-lane',
    name: 'Still-Lane',
    blurb: 'Private screen-time tracking with gentle limits.',
    platform: 'Windows',
    icon: '/still-lane/icon.png',
    shot: '/still-lane/screenshot.png',
    accent: '#3DF2C0',
    span: '',
  },
  {
    href: '/apps/recipe-box',
    name: 'Recipe Box',
    blurb: 'Save, cook and shop from your recipes on Fire tablets.',
    platform: 'Fire tablet',
    icon: '/apps/recipe-box/icon-512.png',
    shot: '/apps/recipe-box/library.png',
    accent: '#FF6B57',
    span: '',
  },
  {
    href: '/apps/visual-schedule-board',
    name: 'Visual Schedule Board',
    blurb: 'Picture routines and first-then boards for kids.',
    platform: 'Fire tablet',
    icon: '/apps/visual-schedule-board/icon-512.png',
    shot: '/apps/visual-schedule-board/home.webp',
    accent: '#3DF2C0',
    span: '',
  },
  {
    href: '/apps/large-print-crosswords',
    name: 'Large Print Crosswords',
    blurb: 'Big, readable puzzles that play offline.',
    platform: 'Fire tablet',
    icon: '/apps/large-print-crosswords/icon-512.png',
    shot: '/apps/large-print-crosswords/play-landscape.png',
    accent: '#7C5CFF',
    span: '',
  },
];

export function AppsBento() {
  return (
    <section className="relative">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-coral">( Our own apps )</p>
          </Reveal>
          <h2 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-[-0.035em] text-white leading-[1.02]">
            <SplitWords text="Small apps," />{' '}
            <span className="font-display italic font-normal">
              <SplitWords wordClassName="gradient-text pr-[0.06em]" text="big care." delay={0.12} />
            </span>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-xl">
              Products we design, build and publish ourselves — native Windows tools and calm, offline-first tablet apps.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {APPS.map((app, i) => {
            const hero = i === 0;
            return (
              <Reveal key={app.href} delay={0.05 * i} className={cn(app.span)}>
                <Link
                  href={app.href}
                  className="spotlight group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-20 -top-20 h-60 w-60 rounded-full blur-3xl opacity-30 transition-opacity duration-700 group-hover:opacity-70"
                    style={{ background: app.accent }}
                  />
                  <div className="relative z-[3] flex items-start justify-between gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                        <Image src={app.icon} alt="" fill sizes="44px" className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white tracking-tight">{app.name}</h3>
                        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                          {app.platform === 'Windows' ? <Monitor className="h-3 w-3" /> : <Tablet className="h-3 w-3" />}
                          {app.platform}
                        </p>
                      </div>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-white group-hover:text-ink">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className={cn('relative z-[3] px-6 text-sm text-zinc-400 leading-relaxed', hero ? 'sm:text-base max-w-md' : '')}>
                    {app.blurb}
                  </p>
                  <div className={cn('relative z-[3] mt-6 flex-1 px-6', hero ? 'min-h-[240px] md:min-h-[400px]' : 'min-h-[170px]')}>
                    <div className="absolute inset-x-6 top-0 bottom-0 overflow-hidden rounded-t-2xl border border-b-0 border-white/10 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                      <Image
                        src={app.shot}
                        alt={`${app.name} screenshot`}
                        fill
                        sizes={hero ? '(max-width: 768px) 100vw, 640px' : '(max-width: 768px) 100vw, 320px'}
                        className="object-cover object-top-left"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
