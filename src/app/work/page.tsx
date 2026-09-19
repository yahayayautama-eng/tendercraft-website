import React from 'react';
import { getPublicProjects } from '@/lib/projects';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ProjectCard } from '@/components/ProjectCard';
import { getSiteUrl } from '@/lib/site';

const siteUrl = getSiteUrl();

export const metadata = {
  title: 'Work',
  description:
    'Verified software builds, operational platforms, and browser workflow tools created by Tendercraft.',
  alternates: {
    canonical: `${siteUrl}/work`,
  },
  openGraph: {
    title: 'Work — Tendercraft',
    description:
      'Verified software builds, operational platforms, and browser workflow tools created by Tendercraft.',
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
            Every project listed represents real repository code, verifiable delivery states, and authentic software engineering.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="mt-14">
          {projects.length === 0 ? (
            <div className="p-16 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 text-center space-y-4">
              <h3 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                No published projects currently active.
              </h3>
              <p className="text-sm text-zinc-500">
                Check back shortly as new verified case studies are released.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={{
                    slug: project.slug,
                    name: project.name,
                    tagline: project.tagline,
                    summary: project.summary,
                    statusLabel: project.statusLabel,
                    category:
                      project.status === 'prototype'
                        ? 'Enterprise Systems'
                        : project.status === 'deployed'
                        ? 'Web Platforms'
                        : project.status === 'packaged'
                        ? 'Browser Tools'
                        : 'Operations Platforms',
                    coverImage: project.coverImagePath,
                    capabilities: project.capabilities,
                  }}
                  priority={idx < 2}
                />
              ))}
            </div>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}
