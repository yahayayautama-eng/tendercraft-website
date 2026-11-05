import type { Metadata } from 'next';
import React from 'react';
import { getPublicProjects } from '@/lib/projects';
import { HeroMotion } from '@/components/HeroMotion';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { AppsBento } from '@/components/home/AppsBento';
import { StatsTicker, Capabilities, Process, ClosingCta } from '@/components/home/Sections';

function categoryFor(slug: string, status: string) {
  if (slug === 'freighthud' || slug === 'cartitemizer') return 'Chrome Extension';
  if (status === 'prototype') return 'Enterprise Systems';
  if (status === 'deployed') return 'Web Platforms';
  return 'Operations Platforms';
}

export default async function HomePage() {
  const allProjects = await getPublicProjects();
  const featuredProjects = allProjects.filter((p) => p.featured);

  const technologies = Array.from(
    new Set(
      allProjects
        .flatMap((p) => p.technology)
        .map((t) => t.replace(/\s+\d+(\.\d+)*$/, '').replace('Chrome Extension Manifest V3', 'Manifest V3'))
    )
  ).filter((t) => t !== 'Chrome Web Store');

  return (
    <div className="tc-auto space-y-28 sm:space-y-40 pb-28">
      <HeroMotion />

      <StatsTicker technologies={technologies} caseStudies={allProjects.length} />

      <FeaturedWork
        projects={featuredProjects.map((p) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          tagline: p.tagline,
          statusLabel: p.statusLabel,
          category: categoryFor(p.slug, p.status),
          coverImage: p.coverImagePath,
          technology: p.technology,
        }))}
      />

      <AppsBento />

      <Capabilities />

      <Process />

      <ClosingCta />
    </div>
  );
}

export const metadata: Metadata = { alternates: { canonical: '/' } };
