import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPublicProjects, getPublicProjectBySlug } from '@/lib/projects';
import { SectionWrapper } from '@/components/SectionWrapper';
import { MotionEmailBadge } from '@/components/MotionEmailBadge';
import { getSiteUrl } from '@/lib/site';
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getPublicProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const siteUrl = getSiteUrl();

  return {
    title: project.name,
    description: project.tagline,
    alternates: {
      canonical: `${siteUrl}/work/${slug}`,
    },
    openGraph: {
      title: `${project.name} — Tendercraft Case Study`,
      description: project.tagline,
      url: `${siteUrl}/work/${slug}`,
      siteName: 'Tendercraft',
      type: 'article',
      images: [
        {
          url: project.coverImagePath,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} — Tendercraft Case Study`,
      description: project.tagline,
      images: [project.coverImagePath],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectStyle = project.slug === 'beadle'
    ? ({
        '--project-accent': '#1F4B3F',
        '--project-accent-hover': '#16362D',
        '--project-accent-fg-dark': '#A9C7BC',
        '--project-accent-tint': '#E8F0ED',
        '--project-accent-tint-dark': 'rgba(31, 75, 63, 0.4)',
        '--project-accent-border': '#C7D9D1',
        '--project-accent-border-dark': '#376B5D',
      } as React.CSSProperties)
    : undefined;

  return (
    <div style={projectStyle} className="pb-24 sm:pb-32 space-y-16 sm:space-y-24">
      {/* Top Breadcrumb & Hero */}
      <section className="pt-12 sm:pt-20">
        <SectionWrapper size="lg">
          <div className="space-y-6">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 min-h-[44px] text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-[var(--project-accent)] dark:hover:text-[var(--project-accent-fg-dark)] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--project-accent)] rounded-md px-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to All Work</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--project-accent-tint)] dark:bg-[var(--project-accent-tint-dark)] text-[var(--project-accent)] dark:text-[var(--project-accent-fg-dark)] border border-[var(--project-accent-border)] dark:border-[var(--project-accent-border-dark)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--project-accent)] dark:bg-[var(--project-accent-fg-dark)]" />
                {project.statusLabel}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 max-w-4xl leading-[1.08]">
              {project.name}
            </h1>

            <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
              {project.tagline}
            </p>

            {(project.storeUrl || project.liveUrl) && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.storeUrl && (
                  <a
                    href={project.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-[var(--project-accent)] hover:bg-[var(--project-accent-hover)] text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--project-accent)] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0F19]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="4" />
                      <line x1="21.17" y1="8" x2="12" y2="8" />
                      <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                      <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                    </svg>
                    <span>Install from Chrome Web Store</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full border border-black/[0.12] dark:border-white/[0.15] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] text-zinc-900 dark:text-zinc-100 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--project-accent)] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0F19]"
                  >
                    <span>Visit Product Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Large Hero Visual */}
          <div className="mt-12 relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-[#111726] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl">
            <Image
              src={project.coverImagePath}
              alt={`Primary screenshot of ${project.name}`}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover object-top"
            />
          </div>
        </SectionWrapper>
      </section>

      {/* Case Study Narrative */}
      <section>
        <SectionWrapper size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main Narrative Column */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--project-accent)] dark:text-[var(--project-accent-fg-dark)] font-mono">
                  The Problem
                </h2>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                  {project.problem}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--project-accent)] dark:text-[var(--project-accent-fg-dark)] font-mono">
                  What Tendercraft Built
                </h2>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                  {project.solution}
                </p>
              </div>

              {/* Verified Capabilities */}
              <div className="space-y-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--project-accent)] dark:text-[var(--project-accent-fg-dark)] font-mono">
                  Verified Capabilities
                </h2>
                <ul className="space-y-4">
                  {project.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <CheckCircle2 className="w-5 h-5 text-[var(--project-accent)] dark:text-[var(--project-accent-fg-dark)] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {cap}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Specifications */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-6 sm:p-7 rounded-2xl bg-zinc-50 dark:bg-[#111726] border border-black/[0.06] dark:border-white/[0.08] space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 font-mono mb-3">
                    Technology & Stack
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technology.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-black/[0.04] dark:border-white/[0.06] text-zinc-800 dark:text-zinc-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 font-mono mb-2">
                    Current Delivery State
                  </h3>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {project.statusLabel}
                  </p>
                </div>

                {project.storeUrl && (
                  <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <a
                      href={project.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-semibold text-[var(--project-accent)] hover:text-[var(--project-accent-hover)] dark:hover:text-[var(--project-accent-fg-dark)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--project-accent)] rounded-md"
                    >
                      <span>Google Chrome Web Store</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {project.liveUrl && (
                  <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-semibold text-[var(--project-accent)] hover:text-[var(--project-accent-hover)] dark:hover:text-[var(--project-accent-fg-dark)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--project-accent)] rounded-md"
                    >
                      <span>Visit Product Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* Screenshot Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="space-y-8">
          <SectionWrapper size="lg">
            <div className="space-y-2 mb-8">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--project-accent)] dark:text-[var(--project-accent-fg-dark)] font-mono">
                Visual Evidence
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Interface & Workflow Gallery
              </h2>
              {project.evidenceNote && (
                <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <span className="font-semibold text-[var(--project-accent)] dark:text-[var(--project-accent-fg-dark)]">Evidence note: </span>
                  {project.evidenceNote}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((asset) => (
                <div
                  key={asset.id}
                  className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-50 dark:bg-[#111726] p-3 space-y-3 shadow-sm"
                >
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src={asset.storagePath}
                      alt={asset.altText}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top"
                    />
                  </div>
                  {asset.caption && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 px-2 pb-1 leading-relaxed">
                      {asset.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </SectionWrapper>
        </section>
      )}

      {/* CTA Box */}
      <section>
        <SectionWrapper size="lg">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-50 dark:bg-[#111726] border border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Discuss a Similar Product
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Need a focused system, custom browser extension, or enterprise workflow tool? Let&apos;s scope it directly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <MotionEmailBadge email="hello@tendercrafthq.com" size="md" />
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-5 py-2.5 rounded-full border border-black/[0.1] dark:border-white/[0.15] text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-black/[0.03] dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--project-accent)]"
              >
                <span>Contact Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </div>
  );
}
