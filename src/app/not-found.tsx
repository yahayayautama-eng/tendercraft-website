import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { FadeIn } from '@/components/motion/primitives';

export default function NotFound() {
  return (
    <div className="tc-auto relative -mt-24 min-h-[92vh] flex items-center justify-center overflow-hidden pt-32 pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute left-1/2 top-1/2 h-[812px] w-[812px] -translate-x-1/2 -translate-y-1/2 orb bg-[conic-gradient(from_0deg,#7C5CFF,#3DF2C0,#FF6B57,#7C5CFF)] opacity-25 animate-spin-slow" />
      </div>

      <div className="w-full max-w-3xl px-5 sm:px-8 text-center">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-mint">( Error 404 )</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p
            aria-hidden="true"
            className="mt-4 font-display italic text-[10rem] sm:text-[15rem] leading-[0.85] tracking-[-0.04em] gradient-text gradient-shimmer pr-4"
          >
            404
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-white">This page wandered off.</h1>
          <p className="mx-auto mt-4 max-w-md text-base text-zinc-400 leading-relaxed">
            The page you are looking for doesn&apos;t exist or may have been moved.
          </p>
        </FadeIn>
        <FadeIn delay={0.3} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 min-h-[48px] rounded-full bg-white px-6 text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Return home
          </Link>
          <Link
            href="/work"
            className="glass group inline-flex items-center gap-2 min-h-[48px] rounded-full px-6 text-sm font-semibold text-white hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
          >
            View the work
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
