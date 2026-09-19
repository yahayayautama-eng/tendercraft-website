'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ProjectCard, ProjectCardData } from '@/components/ProjectCard';
import { Sparkles } from 'lucide-react';

interface WorkGalleryProps {
  projects: Array<ProjectCardData & { id: string }>;
}

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'chrome-extensions', label: 'Chrome Extensions' },
  { id: 'enterprise-systems', label: 'Enterprise Systems' },
  { id: 'operations-platforms', label: 'Operations Platforms' },
  { id: 'web-platforms', label: 'Web Platforms' },
] as const;

export function WorkGallery({ projects }: WorkGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'chrome-extensions') {
      return (
        project.category.toLowerCase().includes('chrome') ||
        project.category.toLowerCase().includes('browser')
      );
    }
    if (selectedCategory === 'enterprise-systems') {
      return project.category.toLowerCase().includes('enterprise');
    }
    if (selectedCategory === 'operations-platforms') {
      return project.category.toLowerCase().includes('operations');
    }
    if (selectedCategory === 'web-platforms') {
      return project.category.toLowerCase().includes('web');
    }
    return true;
  });

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return projects.length;
    if (catId === 'chrome-extensions') {
      return projects.filter(
        (p) =>
          p.category.toLowerCase().includes('chrome') ||
          p.category.toLowerCase().includes('browser')
      ).length;
    }
    if (catId === 'enterprise-systems') {
      return projects.filter((p) =>
        p.category.toLowerCase().includes('enterprise')
      ).length;
    }
    if (catId === 'operations-platforms') {
      return projects.filter((p) =>
        p.category.toLowerCase().includes('operations')
      ).length;
    }
    if (catId === 'web-platforms') {
      return projects.filter((p) =>
        p.category.toLowerCase().includes('web')
      ).length;
    }
    return 0;
  };

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs with Sliding Pill */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-zinc-100/80 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] max-w-fit"
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = getCategoryCount(cat.id);
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(cat.id)}
              className="relative inline-flex items-center gap-2 min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
            >
              {isSelected && (
                <motion.div
                  layoutId="activeFilterTabBackground"
                  className="absolute inset-0 bg-white dark:bg-[#111726] rounded-xl shadow-xs border border-black/[0.06] dark:border-white/[0.1]"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', bounce: 0.15, duration: 0.4 }
                  }
                />
              )}
              <span
                className={`relative z-10 transition-colors ${
                  isSelected
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </span>
              <span
                className={`relative z-10 text-[11px] font-mono px-1.5 py-0.5 rounded-full transition-colors ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                    : 'bg-black/[0.05] dark:bg-white/[0.08] text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chrome Extension Highlights Callout */}
      <AnimatePresence>
        {selectedCategory === 'chrome-extensions' && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 flex items-start gap-3"
          >
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Completed & Shipped Chrome Extensions:
              </span>{' '}
              These browser extensions are published and active in the official
              Google Chrome Web Store, featuring live Manifest V3 production
              architectures, receipt parsing, and logistics rate calculators.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={
                shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }
              }
              animate={
                shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }
              }
              exit={
                shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <ProjectCard project={project} priority={idx < 2} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
