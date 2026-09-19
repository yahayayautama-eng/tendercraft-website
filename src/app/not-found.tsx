import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-24">
      <SectionWrapper size="sm" className="text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
          <Compass className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
            Error 404
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            The page you are looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>
        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B101D] text-white dark:bg-white dark:text-[#0B101D] text-sm font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/[0.1] dark:border-white/[0.15] text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-black/[0.04] transition-colors"
          >
            <span>View Work</span>
          </Link>
        </div>
      </SectionWrapper>
    </div>
  );
}
