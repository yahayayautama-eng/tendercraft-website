'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, SplitWords } from '@/components/motion/primitives';

export interface FeaturedProject {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  statusLabel: string;
  category: string;
  coverImage: string;
  technology: string[];
}

const ACCENTS = [
  { hex: '#7C5CFF', soft: 'rgba(124,92,255,0.35)' },
  { hex: '#3DF2C0', soft: 'rgba(61,242,192,0.28)' },
  { hex: '#FF6B57', soft: 'rgba(255,107,87,0.3)' },
];

export function FeaturedWork({ projects }: { projects: FeaturedProject[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <section id="work" className="relative scroll-mt-24">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-mint">( Selected work )</p>
            </Reveal>
            <h2 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-[-0.035em] text-white leading-[1.02]">
              <SplitWords text="Real products." />
              <br />
              <span className="font-display italic font-normal text-zinc-400">
                <SplitWords text="Shipped & verified." delay={0.15} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white min-h-[44px]"
            >
              <span className="relative">
                All case studies
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-gradient-to-r from-violet to-mint transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:bg-white group-hover:text-ink group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        </div>

        <div ref={containerRef} className="relative">
          {projects.map((project, i) => (
            <StackCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: FeaturedProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const accent = ACCENTS[index % ACCENTS.length];
  const targetScale = 1 - (total - 1 - index) * 0.035;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: local } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(local, [0, 1], ['-6%', '6%']);

  return (
    <div className="md:sticky md:h-[88vh] md:max-h-[760px] flex items-start mb-6 md:mb-0" style={{ top: `calc(6rem + ${index * 22}px)` }}>
      <motion.div
        style={reduce ? undefined : { scale, transformOrigin: 'center top' }}
        className="w-full"
      >
        <Link
          href={`/work/${project.slug}`}
          className="spotlight group block rounded-[2rem] border border-white/10 bg-ink-2 overflow-hidden shadow-[0_-20px_80px_-40px_rgba(0,0,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        >
          <div className="relative z-[3] grid md:grid-cols-[0.9fr_1.1fr] gap-0">
            {/* Copy */}
            <div className="relative p-7 sm:p-10 lg:p-12 flex flex-col justify-between gap-10 min-h-[320px]">
              <div
                aria-hidden="true"
                className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-60 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: accent.soft }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500">
                    {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                  <span
                    className="font-mono text-[11px] uppercase tracking-widest"
                    style={{ color: accent.hex }}
                  >
                    {project.category}
                  </span>
                </div>
                <h3 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-white">
                  {project.name}
                </h3>
                <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-md">{project.tagline}</p>
              </div>

              <div className="relative space-y-6">
                <div className="flex flex-wrap gap-1.5">
                  {project.technology.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                  <span className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.hex, boxShadow: `0 0 10px ${accent.hex}` }} />
                    {project.statusLabel}
                  </span>
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110"
                    style={{ background: accent.hex }}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative p-3 sm:p-4 md:pl-0">
              <div
                ref={imgRef}
                className="relative h-full min-h-[240px] sm:min-h-[340px] md:min-h-[460px] overflow-hidden rounded-[1.4rem] border border-white/[0.06]"
                style={{ background: `radial-gradient(120% 90% at 100% 0%, ${accent.soft}, transparent 60%), #0B0B12` }}
              >
                <motion.div style={reduce ? undefined : { y: imgY }} className="absolute inset-[-6%_0]">
                  <div className="absolute inset-x-6 sm:inset-x-10 top-10 sm:top-14 bottom-0 overflow-hidden rounded-t-xl border border-white/10 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.02]">
                    <Image
                      src={project.coverImage}
                      alt={`Screenshot preview of ${project.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 640px"
                      className="object-cover object-top"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
