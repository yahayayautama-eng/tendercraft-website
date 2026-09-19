import React from 'react';
import { getPublicProjects } from '@/lib/projects';
import { SectionWrapper } from '@/components/SectionWrapper';
import { WorkGallery } from '@/components/WorkGallery';
import { getSiteUrl } from '@/lib/site';

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
    <div className="py-16 sm:py-24 space-y-16">
      <SectionWrapper size="lg">
        {/* Page Heading */}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Portfolio & Systems
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Selected Work
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Every project listed represents real repository code, verifiable delivery states, and authentic software engineering—including completed Chrome extensions live on the Chrome Web Store.
          </p>
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
