import React from 'react';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPreviewProject } from '@/lib/projects';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Eye, ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';

interface PreviewPageProps {
  params: Promise<{ slug: string }>;
}

export const metadata = {
  title: 'Draft Preview',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  const { authorized, project } = await getPreviewProject(slug);

  if (!authorized && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    redirect('/admin/login');
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Draft Preview Warning Banner */}
      <div className="sticky top-16 z-40 w-full bg-amber-500 text-black px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-md">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>
              AUTHENTICATED PREVIEW MODE &mdash; Showing {project.published ? 'Published' : 'UNPUBLISHED DRAFT'} project: {project.name}
            </span>
          </div>
          <Link
            href={`/admin/projects/${project.id}/edit`}
            className="px-3 py-1 bg-black text-white rounded-md text-[11px] font-bold hover:bg-zinc-800 transition-colors"
          >
            Edit Project
          </Link>
        </div>
      </div>

      {/* Case Study Shell */}
      <article className="pt-12 sm:pt-16 space-y-16 sm:space-y-24">
        {/* Hero Section */}
        <SectionWrapper size="lg">
          <div className="space-y-6">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Admin Dashboard</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50">
                {project.statusLabel}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Slug: /{project.slug}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 max-w-4xl leading-[1.1]">
              {project.name}
            </h1>

            <p className="text-lg sm:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed font-normal">
              {project.tagline}
            </p>
          </div>

          {/* Hero Visual */}
          <div className="mt-10 relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.08] shadow-2xl">
            <Image
              src={project.coverImagePath}
              alt={`Hero visual for ${project.name}`}
              fill
              priority
              className="object-cover object-top"
            />
          </div>
        </SectionWrapper>

        {/* Narrative & Editorial Grid */}
        <SectionWrapper size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8 space-y-12">
              <section className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  The Problem
                </h2>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {project.problem}
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  What Tendercraft Built
                </h2>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {project.solution}
                </p>
              </section>

              {/* Capabilities */}
              <section className="space-y-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Verified Capabilities
                </h2>
                <ul className="space-y-3.5">
                  {project.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {cap}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar Metadata */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#111726] border border-black/[0.06] dark:border-white/[0.08] space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                    Technology & Systems
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

                {project.liveUrl && (
                  <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
                    >
                      <span>Visit Live Application</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <SectionWrapper size="lg">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                System Interface Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((asset) => (
                  <div
                    key={asset.id}
                    className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-50 dark:bg-[#111726] space-y-3 p-3 shadow-sm"
                  >
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                      <Image
                        src={asset.storagePath}
                        alt={asset.altText}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    {asset.caption && (
                      <p className="text-xs text-zinc-500 px-2 pb-1">
                        {asset.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        )}
      </article>
    </div>
  );
}
