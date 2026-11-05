'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Magnetic, RotatingWord, SplitWords } from '@/components/motion/primitives';

const EASE = [0.16, 1, 0.3, 1] as const;

const AUDIENCES = ['difficult workflows', 'IT teams', 'freight dispatchers', 'estate managers', 'risk officers', 'home cooks'];

export function HeroMotion() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'center center'] });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [28, 0]), { stiffness: 120, damping: 24 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.86, 1]), { stiffness: 120, damping: 24 });
  const sideY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const leftX = useTransform(scrollYProgress, [0, 1], ['8%', '0%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['-8%', '0%']);

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="relative -mt-20 sm:-mt-24 pt-36 sm:pt-44 pb-10 overflow-hidden">
      {/* Aurora backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-40 left-[8%] h-[520px] w-[520px] rounded-full bg-violet/40 blur-[120px] animate-aurora" />
        <div
          className="absolute top-10 right-[4%] h-[440px] w-[440px] rounded-full bg-mint/25 blur-[120px] animate-aurora"
          style={{ animationDelay: '-6s' }}
        />
        <div
          className="absolute top-[38%] left-[40%] h-[380px] w-[380px] rounded-full bg-coral/20 blur-[120px] animate-aurora"
          style={{ animationDelay: '-11s' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Studio pill */}
          <motion.div {...fade(0)} className="inline-flex">
            <span className="glass inline-flex items-center gap-2 rounded-full pl-1.5 pr-4 py-1.5 text-xs font-medium text-zinc-300">
              <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-2 py-0.5 text-[11px] font-semibold text-mint">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-mint opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
                </span>
                Shipping
              </span>
              Independent product studio · Remote worldwide
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="mt-8 text-[2.75rem] leading-[1.02] sm:text-7xl lg:text-[5.75rem] font-semibold tracking-[-0.04em] text-white">
            <SplitWords text="Focused software" immediate delay={0.15} />
            <br />
            <SplitWords text="crafted for" immediate delay={0.3} className="text-zinc-400" />{' '}
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
              className="inline-block"
            >
              <span className="sr-only">difficult workflows.</span>
              <span aria-hidden="true" className="font-display italic font-normal tracking-[-0.02em]">
                <RotatingWord words={AUDIENCES} wordClassName="gradient-text gradient-shimmer pr-[0.08em]" />
              </span>
            </motion.span>
          </h1>

          <motion.p
            {...fade(0.7)}
            className="mt-7 text-base sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto"
          >
            Tendercraft turns high-friction manual work into fast, reliable products — desktop agents,
            browser extensions, business platforms and apps people actually enjoy using.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fade(0.85)} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Magnetic>
              <Link
                href="/work"
                className="group relative inline-flex items-center gap-2 min-h-[52px] rounded-full bg-white pl-7 pr-2 py-2 text-sm font-semibold text-ink shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_60px_-15px_rgba(124,92,255,0.7)] transition-shadow hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_25px_70px_-10px_rgba(61,242,192,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                View the work
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-[-45deg]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href="/contact"
                className="glass inline-flex items-center gap-2 min-h-[52px] rounded-full px-7 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
              >
                <Sparkles className="h-4 w-4 text-coral" />
                Start a project
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* 3D product stage */}
        <motion.div
          ref={stageRef}
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
          className="relative mt-16 sm:mt-24"
          style={{ perspective: 1600 }}
        >
          <motion.div
            style={reduce ? undefined : { rotateX, scale, transformOrigin: 'center top' }}
            className="relative mx-auto max-w-5xl"
          >
            {/* glow under the stage */}
            <div aria-hidden="true" className="absolute -inset-x-10 -bottom-10 top-1/3 -z-10 rounded-[3rem] bg-gradient-to-r from-violet/40 via-mint/20 to-coral/30 blur-3xl" />

            {/* Side screens */}
            <motion.div
              style={reduce ? undefined : { y: sideY, x: leftX }}
              className="absolute -left-4 sm:-left-16 top-[12%] w-[38%] hidden md:block z-0"
            >
              <div className="rotate-[-6deg] rounded-2xl p-1.5 glass shadow-2xl">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image src="/projects/compoundos/dashboard.png" alt="" fill sizes="30vw" className="object-cover object-top" />
                </div>
              </div>
            </motion.div>
            <motion.div
              style={reduce ? undefined : { y: sideY, x: rightX }}
              className="absolute -right-4 sm:-right-16 top-[18%] w-[38%] hidden md:block z-0"
            >
              <div className="rotate-[6deg] rounded-2xl p-1.5 glass shadow-2xl">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image src="/projects/freighthud/freighthud-hero.jpg" alt="" fill sizes="30vw" className="object-cover object-top" />
                </div>
              </div>
            </motion.div>

            {/* Main screen */}
            <div className="relative z-10 mx-auto w-full md:w-[78%] rounded-[1.4rem] p-2 glass shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-1.5 px-3 pb-2 pt-1">
                <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFC857]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
                <span className="ml-3 hidden sm:inline font-mono text-[11px] text-zinc-500">beadle — admin console</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink-2">
                <Image
                  src="/projects/beadle/beadle-hero.webp"
                  alt="Beadle alert engine console preview"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating chips */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.6, ease: EASE }}
              className="absolute z-20 hidden sm:block sm:left-[6%] bottom-[14%] animate-float"
            >
              <div className="glass rounded-2xl px-3.5 py-2.5 text-left shadow-xl bg-ink/60">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Chrome Web Store</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_#3DF2C0]" />2 extensions live
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.45, duration: 0.6, ease: EASE }}
              className="absolute z-20 hidden sm:block sm:right-[6%] top-[6%] animate-float"
              style={{ animationDelay: '-3s' }}
            >
              <div className="glass rounded-2xl px-3.5 py-2.5 text-left shadow-xl bg-ink/60">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Built with</p>
                <p className="mt-0.5 text-sm font-semibold text-white">
                  .NET 8 · SignalR <span className="text-coral">·</span> WPF
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

