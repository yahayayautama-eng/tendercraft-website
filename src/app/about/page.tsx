import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/SectionWrapper';
import { getSiteUrl } from '@/lib/site';
import { Mail, MapPin, ArrowRight, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';

const siteUrl = getSiteUrl();

export const metadata = {
  title: 'About',
  description:
    'Tendercraft is an independent product studio building business software, workflow tools, browser products, and automation.',
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: 'About — Tendercraft',
    description:
      'Tendercraft is an independent product studio building business software, workflow tools, browser products, and automation.',
    url: `${siteUrl}/about`,
    siteName: 'Tendercraft',
    type: 'website',
    images: [
      {
        url: '/brand/tendercraft-og.png',
        width: 1200,
        height: 630,
        alt: 'About Tendercraft',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24 space-y-20 sm:space-y-28 pb-24">
      {/* Studio Header */}
      <section>
        <SectionWrapper size="lg">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              The Studio
            </p>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.08]">
              Built with purpose, restraint, and precision.
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Tendercraft is an independent product studio. We identify high-friction manual workflows in businesses and turn them into fast, reliable software products.
            </p>
          </div>
        </SectionWrapper>
      </section>

      {/* Philosophy Grid */}
      <section>
        <SectionWrapper size="lg">
          <div className="border-t border-black/[0.08] dark:border-white/[0.08] pt-14 space-y-12">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Operating Principles
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                How we think, build, and deliver software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-[#111726] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Defensible Truth
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  We never exaggerate readiness or invent vanity metrics. We only publish what has been built, tested, and verified in real codebases.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-[#111726] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Focused Utility
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  We build single-purpose software that executes one critical task exceptionally well, avoiding the bloat that plagues traditional enterprise suites.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-[#111726] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Tactile Polish
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Calm typography, generous negative space, and instant response times. Software should feel crisp, respectful of user focus, and effortless to operate.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* Background & Leadership Note */}
      <section>
        <SectionWrapper size="lg">
          <div className="p-8 sm:p-14 rounded-3xl bg-zinc-50 dark:bg-[#111726] border border-black/[0.06] dark:border-white/[0.08] space-y-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                <Layers className="w-4 h-4" />
                <span>Founder & Engineering</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Direct builder access from day one.
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                When you partner with Tendercraft, you don&apos;t talk to account managers or junior contractors. You collaborate directly with the founder and engineer who designs, implements, and verifies every system.
              </p>
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 pt-2 font-medium">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Operating from Nigeria / Serving remote clients globally</span>
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="mailto:yyautama@tendercrafthq.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B101D] text-white hover:bg-blue-600 dark:bg-white dark:text-[#0B101D] dark:hover:bg-blue-500 dark:hover:text-white text-sm font-semibold transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>yyautama@tendercrafthq.com</span>
              </a>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-black/[0.1] dark:border-white/[0.15] text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-black/[0.04] transition-colors"
              >
                <span>Explore Completed Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </div>
  );
}
