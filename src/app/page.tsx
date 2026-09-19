import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPublicProjects } from '@/lib/projects';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ProjectCard } from '@/components/ProjectCard';
import {
  ArrowRight,
  Layers,
  Cpu,
  Compass,
  Mail,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

export default async function HomePage() {
  const allProjects = await getPublicProjects();
  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. Hero Section */}
      <section className="relative pt-16 sm:pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,82,255,0.08),transparent)] pointer-events-none" />

        <SectionWrapper size="lg">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Independent Product Studio</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.08]">
              Focused software for difficult workflows.
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
              Tendercraft builds focused software that turns difficult workflows into useful products. Business systems, browser extensions, and continuous automation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/work"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0B101D] text-white hover:bg-blue-600 dark:bg-white dark:text-[#0B101D] dark:hover:bg-blue-500 dark:hover:text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg"
              >
                <span>View our work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-black/[0.12] dark:border-white/[0.15] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] text-zinc-900 dark:text-zinc-100 font-semibold text-sm transition-colors"
              >
                <span>Start a project</span>
              </Link>
            </div>
          </div>

          {/* Product Hero Visual Mosaic */}
          <div className="mt-16 sm:mt-20 relative rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] bg-zinc-100 dark:bg-[#111726] shadow-2xl p-2 sm:p-4">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-950">
              <Image
                src="/projects/beadle/beadle-hero.png"
                alt="Beadle alert engine console preview"
                fill
                priority
                className="object-cover object-top"
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
          </div>
        </SectionWrapper>
      </section>

      {/* 2. Featured Case Studies */}
      <section className="space-y-12">
        <SectionWrapper size="lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Selected Work
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                Verified Projects
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 group"
            >
              <span>Explore all case studies</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={{
                  slug: project.slug,
                  name: project.name,
                  tagline: project.tagline,
                  summary: project.summary,
                  statusLabel: project.statusLabel,
                  category: project.status === 'prototype' ? 'Enterprise Systems' : project.status === 'deployed' ? 'Web Platforms' : 'Operations Tooling',
                  coverImage: project.coverImagePath,
                  capabilities: project.capabilities,
                }}
                priority={idx === 0}
              />
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* 3. Studio Capabilities */}
      <section className="py-12 bg-zinc-50/70 dark:bg-[#0E1320]/70 border-y border-black/[0.06] dark:border-white/[0.06]">
        <SectionWrapper size="lg">
          <div className="max-w-2xl space-y-3 mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              What We Build
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              Disciplined product engineering across the layers where modern operations occur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-2xl bg-white dark:bg-[#131A2B] border border-black/[0.06] dark:border-white/[0.08] space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Business Web Apps
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Single-purpose web applications for complex operational flows, compliance registers, and multi-tenant ledgers.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white dark:bg-[#131A2B] border border-black/[0.06] dark:border-white/[0.08] space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Browser Extensions
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Contextual productivity overlays injected directly into target web platforms, load boards, and e-commerce checkouts.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white dark:bg-[#131A2B] border border-black/[0.06] dark:border-white/[0.08] space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Enterprise Desktop Tools
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Native Windows services, tray daemons, and GPO-deployable MSI packages built with .NET and Win32 APIs.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white dark:bg-[#131A2B] border border-black/[0.06] dark:border-white/[0.08] space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Continuous Automation
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                End-to-end data extraction pipelines, event webhooks, and ledger reconciliation scripts that run reliably.
              </p>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* 4. Working Approach */}
      <section className="space-y-12">
        <SectionWrapper size="lg">
          <div className="max-w-2xl space-y-3 mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Working Approach
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              From Friction to Delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 border-t-2 border-zinc-200 dark:border-zinc-800 pt-6">
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                01 / DISCOVER
              </span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Find the Bottleneck
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We isolate the high-friction manual step—lost emails, tab-switching lag, or paper logbooks.
              </p>
            </div>

            <div className="space-y-3 border-t-2 border-zinc-200 dark:border-zinc-800 pt-6">
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                02 / BUILD
              </span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Single-Purpose Scope
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We reject bloated feature sets and engineer tight, resilient software focused solely on solving the problem.
              </p>
            </div>

            <div className="space-y-3 border-t-2 border-zinc-200 dark:border-zinc-800 pt-6">
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                03 / VERIFY
              </span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Defensible Truth
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every claim, state transition, and receipt is verified against actual logs and network constraints.
              </p>
            </div>

            <div className="space-y-3 border-t-2 border-zinc-200 dark:border-zinc-800 pt-6">
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                04 / LAUNCH
              </span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Clean Deployment
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Shipped as zero-config web apps, silent MSI installers, or verified store-ready browser packages.
              </p>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* 5. Contact Banner */}
      <section>
        <SectionWrapper size="lg">
          <div className="p-8 sm:p-14 rounded-3xl bg-[#0B101D] text-white relative overflow-hidden space-y-8">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 font-mono">
                <Compass className="w-4 h-4" />
                <span>Start a Collaboration</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Have a difficult workflow that needs a focused tool?
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                We partner with businesses to architect, build, and deploy specialized software solutions. Direct communication with the builder.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <a
                href="mailto:hello@tendercrafthq.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>hello@tendercrafthq.com</span>
              </a>
              <a
                href="mailto:yyautama@tendercrafthq.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-colors border border-white/10"
              >
                <span>Direct Founder Line</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </div>
  );
}
