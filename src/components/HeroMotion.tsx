'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from '@/components/SectionWrapper';

export function HeroMotion() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.12,
            delayChildren: 0.05,
          },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative pt-16 sm:pt-28 pb-12 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,82,255,0.09),transparent)] pointer-events-none" />

      <SectionWrapper size="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          {/* Studio Pill */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Independent Product Studio</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.08]"
          >
            Focused software for difficult workflows.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Tendercraft builds focused software that turns difficult workflows into useful products. Business systems, browser extensions, and continuous automation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-3 rounded-full bg-[#0B101D] text-white hover:bg-blue-600 dark:bg-white dark:text-[#0B101D] dark:hover:bg-blue-500 dark:hover:text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0F19]"
            >
              <span>View our work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-3 rounded-full border border-black/[0.12] dark:border-white/[0.15] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] text-zinc-900 dark:text-zinc-100 font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0F19]"
            >
              <span>Start a project</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Product Hero Visual Mosaic with Spring Depth */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
            delay: shouldReduceMotion ? 0 : 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  y: -3,
                  transition: { duration: 0.25, ease: 'easeOut' },
                }
          }
          className="mt-16 sm:mt-20 relative rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] bg-zinc-100 dark:bg-[#111726] shadow-2xl p-2 sm:p-4 group"
        >
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-950">
            <Image
              src="/projects/beadle/beadle-hero.png"
              alt="Beadle alert engine console preview"
              fill
              priority
              className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs sm:text-sm font-medium">
              <span className="backdrop-blur-md bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                Featured: Beadle Enterprise Desktop Alert System
              </span>
              <span className="hidden sm:inline-block font-mono text-zinc-300">
                Active Directory · .NET 8 · SignalR
              </span>
            </div>
          </div>
        </motion.div>
      </SectionWrapper>
    </section>
  );
}
