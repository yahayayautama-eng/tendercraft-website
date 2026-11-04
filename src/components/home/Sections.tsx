'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Cpu, Layers, ShieldCheck, Terminal, Asterisk } from 'lucide-react';
import { CountUp, Magnetic, Marquee, Reveal, SplitWords } from '@/components/motion/primitives';
import { MotionEmailBadge } from '@/components/MotionEmailBadge';

/* ------------------------------------------------------------------
   Stats + technology ticker
------------------------------------------------------------------- */
const STATS = [
  { value: 0, label: 'Verified case studies', color: 'text-violet' },
  { value: 3, label: 'Windows Store apps', color: 'text-mint' },
  { value: 3, label: 'Fire tablet apps', color: 'text-coral' },
  { value: 2, label: 'Live Chrome extensions', color: 'text-white' },
];

export function StatsTicker({ technologies, caseStudies }: { technologies: string[]; caseStudies: number }) {
  const stats = STATS.map((s, i) => (i === 0 ? { ...s, value: caseStudies } : s));
  return (
    <section aria-label="Studio at a glance" className="relative">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 rounded-[1.75rem] border border-white/10 overflow-hidden bg-white/[0.015]">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="relative p-6 sm:p-8 border-white/10 [&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
            >
              <p className={`text-5xl sm:text-6xl font-semibold tracking-[-0.05em] ${s.color}`}>
                <CountUp to={s.value} />
              </p>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-14 sm:mt-20 space-y-3 -rotate-[1.5deg] scale-[1.03]">
        <div className="bg-gradient-to-r from-violet via-[#5d7dff] to-mint py-3.5">
          <Marquee>
            {technologies.map((t) => (
              <span key={t} className="mx-6 flex items-center gap-6 text-lg sm:text-2xl font-semibold tracking-tight text-ink whitespace-nowrap">
                {t}
                <Asterisk className="h-5 w-5" />
              </span>
            ))}
          </Marquee>
        </div>
        <div className="border-y border-white/10 py-3.5 bg-ink">
          <Marquee reverse>
            {['Desktop agents', 'Browser extensions', 'Business platforms', 'Tablet apps', 'Automation', 'Offline-first', 'Privacy by default'].map((t) => (
              <span key={t} className="mx-6 flex items-center gap-6 font-display italic text-xl sm:text-3xl text-zinc-300 whitespace-nowrap">
                {t}
                <span className="h-2 w-2 rounded-full bg-coral" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Capabilities bento
------------------------------------------------------------------- */
const CAPABILITIES = [
  {
    icon: Layers,
    title: 'Business web apps',
    body: 'Single-purpose platforms for complex operational flows, compliance registers and multi-tenant ledgers.',
    color: '#7C5CFF',
    tags: ['React 19', 'Next.js', 'PostgreSQL'],
  },
  {
    icon: Terminal,
    title: 'Browser extensions',
    body: 'Contextual overlays injected straight into load boards, dashboards and e-commerce checkouts.',
    color: '#3DF2C0',
    tags: ['Manifest V3', 'TypeScript'],
  },
  {
    icon: Cpu,
    title: 'Desktop tools',
    body: 'Native Windows services, tray daemons and GPO-deployable MSI packages built on .NET and WinUI.',
    color: '#FF6B57',
    tags: ['.NET 8', 'WPF', 'WinUI 3'],
  },
  {
    icon: ShieldCheck,
    title: 'Continuous automation',
    body: 'Extraction pipelines, event webhooks and reconciliation jobs that keep running when nobody is watching.',
    color: '#A08AFF',
    tags: ['Webhooks', 'Pipelines'],
  },
];

export function Capabilities() {
  return (
    <section className="relative">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet">( Capabilities )</p>
            </Reveal>
            <h2 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-[-0.035em] text-white leading-[1.02]">
              <SplitWords text="What we" />{' '}
              <span className="font-display italic font-normal">
                <SplitWords wordClassName="gradient-text pr-[0.06em]" text="build." delay={0.1} />
              </span>
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-md">
                Disciplined product engineering across every layer where modern operations actually happen.
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} className={i % 2 === 1 ? 'sm:mt-10' : ''}>
                <div className="spotlight group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-2 p-7">
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-20 transition-all duration-700 group-hover:opacity-50 group-hover:scale-125"
                    style={{ background: c.color }}
                  />
                  <div className="relative z-[3]">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                      style={{ background: `${c.color}1f`, color: c.color }}
                    >
                      <c.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-10 font-mono text-xs text-zinc-500">0{i + 1}</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">{c.title}</h3>
                    <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{c.body}</p>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {c.tags.map((t) => (
                        <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Process — line draws itself as you scroll
------------------------------------------------------------------- */
const STEPS = [
  { k: 'Discover', title: 'Find the bottleneck', body: 'We isolate the high-friction manual step — lost emails, tab-switching lag, paper logbooks.' },
  { k: 'Build', title: 'Single-purpose scope', body: 'No bloated feature lists. Tight, resilient software focused solely on solving the problem.' },
  { k: 'Verify', title: 'Defensible truth', body: 'Every claim, state transition and receipt is checked against real logs and constraints.' },
  { k: 'Launch', title: 'Clean deployment', body: 'Shipped as zero-config web apps, silent MSI installers or store-ready packages.' },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-mint">( Working approach )</p>
          </Reveal>
          <h2 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-[-0.035em] text-white leading-[1.02]">
            <SplitWords text="From friction" />{' '}
            <span className="font-display italic font-normal text-zinc-400">
              <SplitWords text="to delivery." delay={0.1} />
            </span>
          </h2>
        </div>

        <div ref={ref} className="relative mt-14 sm:mt-20">
          {/* track */}
          <div aria-hidden="true" className="absolute left-[19px] md:left-0 md:right-0 top-0 md:top-[19px] bottom-0 md:bottom-auto w-px md:w-auto md:h-px bg-white/10" />
          <motion.div
            aria-hidden="true"
            style={reduce ? undefined : { scaleY: lineScale }}
            className="md:hidden absolute left-[19px] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-violet via-mint to-coral"
          />
          <motion.div
            aria-hidden="true"
            style={reduce ? undefined : { scaleX: lineScale }}
            className="hidden md:block absolute left-0 right-0 top-[19px] h-px origin-left bg-gradient-to-r from-violet via-mint to-coral"
          />

          <div role="list" className="grid md:grid-cols-4 gap-10 md:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.12} className="relative pl-14 md:pl-0" role="listitem">
                <div>
                  <span className="absolute left-0 md:static flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-ink font-mono text-xs text-white shadow-[0_0_0_6px_#07070B]">
                    0{i + 1}
                  </span>
                  <p className="md:mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">{s.k}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Closing CTA
------------------------------------------------------------------- */
export function ClosingCta() {
  return (
    <section className="relative">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-ink-2 px-6 py-16 sm:px-14 sm:py-24 text-center">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-full h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,#7C5CFF,#3DF2C0,#FF6B57,#7C5CFF)] opacity-40 blur-[90px] animate-spin-slow" />
              <div className="absolute inset-0 bg-grid opacity-60" />
            </div>

            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">( Start a collaboration )</p>
              <h2 className="mt-6 text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.045em] text-white leading-[0.98]">
                <SplitWords text="Got a difficult" />
                <br />
                <span className="font-display italic font-normal">
                  <SplitWords wordClassName="gradient-text gradient-shimmer pr-[0.06em]" text="workflow?" delay={0.15} />
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-zinc-300">
                We partner with businesses to architect, build and ship focused software. You talk directly to the builder.
              </p>

              <div className="mt-10 flex justify-center">
                <Magnetic strength={0.3}>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 min-h-[56px] rounded-full bg-white pl-8 pr-2 py-2 text-base font-semibold text-ink shadow-[0_20px_60px_-15px_rgba(124,92,255,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    Let&apos;s talk
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet to-coral text-white transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </Link>
                </Magnetic>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <MotionEmailBadge email="hello@tendercrafthq.com" variant="dark" size="md" />
                <MotionEmailBadge email="yyautama@tendercrafthq.com" variant="dark" size="md" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
