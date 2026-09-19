import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/SectionWrapper';
import { MotionEmailBadge } from '@/components/MotionEmailBadge';
import { getSiteUrl } from '@/lib/site';
import { Globe, ArrowRight, ShieldCheck, Zap, Layers, Sparkles, ArrowUpRight } from 'lucide-react';

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

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
    </svg>
  );
}

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
            <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
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
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Defensible Truth
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We never exaggerate readiness or invent vanity metrics. We only publish what has been built, tested, and verified in real codebases.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-[#111726] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Zap className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Focused Utility
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We build single-purpose software that executes one critical task exceptionally well, avoiding the bloat that plagues traditional enterprise suites.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-[#111726] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Tactile Polish
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Calm typography, generous negative space, and instant response times. Software should feel crisp, respectful of user focus, and effortless to operate.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* Founder & Engineering Section */}
      <section aria-labelledby="founder-heading">
        <SectionWrapper size="lg">
          <div className="p-8 sm:p-14 rounded-3xl bg-zinc-50 dark:bg-[#111726] border border-black/[0.06] dark:border-white/[0.08] space-y-10">
            <div className="flex flex-col md:flex-row items-start gap-8 sm:gap-10">
              {/* Founder Avatar / Portrait */}
              <div className="shrink-0 relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-blue-600 to-[#0B101D] dark:from-blue-600 dark:to-[#070A11] p-1 shadow-md">
                  <div className="w-full h-full rounded-[22px] bg-[#0B101D] flex flex-col items-center justify-center text-white relative overflow-hidden">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
                      YY
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-blue-400 font-mono mt-0.5">
                      Engineer
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full shadow-xs">
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </div>

              {/* Founder Details & Biography */}
              <div className="space-y-4 flex-1">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                    <span>Founder & Engineering</span>
                  </div>
                  <h2 id="founder-heading" className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Yahaya Yautama
                  </h2>
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 font-mono">
                    Founder & Principal Systems Engineer
                  </p>
                </div>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
                  When you partner with Tendercraft, you don&apos;t talk to account managers or junior contractors. You collaborate directly with the founder and engineer who designs, implements, and verifies every system. Yahaya designs and ships production software across Windows desktop engines (.NET/WPF), high-concurrency web platforms (Next.js/PostgreSQL), and browser workflow tools.
                </p>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 pt-1 font-medium">
                  <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
                  <span>Independent Product Studio · Remote Worldwide</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Actions & Links (All >= 44x44px touch targets) */}
            <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center gap-3">
              <MotionEmailBadge email="yyautama@tendercrafthq.com" size="md" />

              <a
                href="https://github.com/yahayayautama-eng"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yahaya Yautama on GitHub (opens in new tab)"
                className="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-white/5 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/in/yahaya-yautama"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yahaya Yautama on LinkedIn (opens in new tab)"
                className="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-white/5 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>

              <Link
                href="/work"
                className="min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span>Explore Completed Work</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </div>
  );
}
