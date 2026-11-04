import React from 'react';
import { Reveal, SplitWords } from '@/components/motion/primitives';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  /** Rendered after the title in italic serif with the signature gradient */
  accent?: string;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  children?: React.ReactNode;
  /** Override the backdrop glow colours (any CSS colours) */
  glow?: [string, string];
}

/** Shared animated page header: aurora glow, hairline grid, kinetic headline. */
export function PageHero({ eyebrow, title, accent, description, align = 'left', children, glow }: PageHeroProps) {
  const [a, b] = glow ?? ['rgba(124,92,255,0.32)', 'rgba(61,242,192,0.2)'];
  const center = align === 'center';
  return (
    <section className="relative -mt-24 pt-36 sm:pt-44 pb-4">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-40 left-[8%] h-[440px] w-[440px] rounded-full blur-[120px] animate-aurora" style={{ background: a }} />
        <div
          className="absolute -top-16 right-[8%] h-[380px] w-[380px] rounded-full blur-[120px] animate-aurora"
          style={{ background: b, animationDelay: '-7s' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />
      </div>
      <div className={cn('w-full max-w-6xl mx-auto px-5 sm:px-8', center && 'text-center')}>
        <div className={cn('max-w-4xl space-y-6', center && 'mx-auto')}>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-mint">( {eyebrow} )</p>
          </Reveal>
          <h1 className="text-[2.6rem] sm:text-7xl lg:text-[5.25rem] font-semibold tracking-[-0.045em] text-white leading-[1]">
            <SplitWords text={title} immediate />
            {accent && (
              <>
                {' '}
                <span className="font-display italic font-normal tracking-[-0.02em]">
                  <SplitWords text={accent} immediate delay={0.15} wordClassName="gradient-text gradient-shimmer pr-[0.06em]" />
                </span>
              </>
            )}
          </h1>
          {description && (
            <Reveal delay={0.25}>
              <div className={cn('text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-3xl', center && 'mx-auto')}>
                {description}
              </div>
            </Reveal>
          )}
          {children && <Reveal delay={0.35}>{children}</Reveal>}
        </div>
      </div>
    </section>
  );
}
