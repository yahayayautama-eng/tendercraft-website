import React from 'react';
import { getPublicProjects } from '@/lib/projects';
import { SectionWrapper } from '@/components/SectionWrapper';
import { WorkGallery } from '@/components/WorkGallery';
import { getSiteUrl } from '@/lib/site';
import { Reveal, SplitWords } from '@/components/motion/primitives';

const siteUrl = getSiteUrl();

export const metadata = {
  title: 'Work',
  description:
    'Verified software builds, operational platforms, and completed Chrome extensions created by Tendercraft.',
  alternates: {
    canonical: `${siteUrl}/work`,
  },
  openGraph: {
    title: 'Work — Tendercraft',
    description:
      'Verified software builds, operational platforms, and completed Chrome extensions created by Tendercraft.',
    url: `${siteUrl}/work`,
    siteName: 'Tendercraft',
    type: 'website',
    images: [
      {
        url: '/brand/tendercraft-og.png',
        width: 1200,
        height: 630,
        alt: 'Tendercraft Portfolio',
      },
    ],
  },
};

export default async function WorkPage() {
  const projects = await getPublicProjects();

  const formattedProjects = projects.map((project) => ({
    id: project.id,
    slug: project.slug,
    name: project.name,
    tagline: project.tagline,
    summary: project.summary,
    statusLabel: project.statusLabel,
    category:
      project.slug === 'freighthud' || project.slug === 'cartitemizer'
        ? 'Chrome Extension'
        : project.status === 'prototype'
        ? 'Enterprise Systems'
        : project.status === 'deployed'
        ? 'Web Platforms'
        : 'Operations Platforms',
    coverImage: project.coverImagePath,
    capabilities: project.capabilities,
  }));

  return (
    <div className="tc-auto relative -mt-24 pt-36 sm:pt-44 pb-24 space-y-16">
      <SectionWrapper size="lg">
        {/* Page Heading */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] overflow-hidden">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute -top-40 left-[10%] h-[420px] w-[420px] rounded-full bg-violet/30 blur-[120px] animate-aurora" />
          <div className="absolute -top-20 right-[10%] h-[360px] w-[360px] rounded-full bg-mint/20 blur-[120px] animate-aurora" style={{ animationDelay: '-7s' }} />
        </div>
        <div className="max-w-4xl space-y-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-mint">( Portfolio &amp; systems )</p>
          </Reveal>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.045em] text-white leading-[0.98]">
            <SplitWords text="Selected" immediate />{' '}
            <span className="font-display italic font-normal">
              <SplitWords wordClassName="gradient-text gradient-shimmer pr-[0.06em]" text="work." immediate delay={0.12} />
            </span>
          </h1>
          <Reveal delay={0.25}>
            <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-3xl">
              Every project listed represents real repository code, verifiable delivery states, and authentic software engineering—including completed Chrome extensions live on the Chrome Web Store.
            </p>
          </Reveal>
        </div>

        {/* Projects Gallery with Category Filters */}
        <div className="mt-12">
          {formattedProjects.length === 0 ? (
            <div className="p-16 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 text-center space-y-4">
              <h3 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                No published projects currently active.
              </h3>
              <p className="text-sm text-zinc-500">
                Check back shortly as new verified case studies are released.
              </p>
            </div>
          ) : (
            <WorkGallery projects={formattedProjects} />
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}
