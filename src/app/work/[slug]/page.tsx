import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPublicProjects, getPublicProjectBySlug } from '@/lib/projects';
import { SectionWrapper } from '@/components/SectionWrapper';
import { MotionEmailBadge } from '@/components/MotionEmailBadge';
import { getSiteUrl } from '@/lib/site';
import { ArrowLeft, ExternalLink, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal, SplitWords } from '@/components/motion/primitives';
import { CaseVisual } from '@/components/work/CaseVisual';
import { accentForSlug, accentStyle } from '@/lib/accents';

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

  const accent = accentForSlug(project.slug);
  const allProjects = await getPublicProjects();
  const idx = allProjects.findIndex((p) => p.slug === project.slug);
  const next = allProjects.length > 1 ? allProjects[(idx + 1) % allProjects.length] : null;
  const nextAccent = next ? accentForSlug(next.slug) : accent;

  const linkBtn =
    'group inline-flex items-center gap-2 min-h-[48px] rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink';

  return (
    <div style={accentStyle(accent)} className="pb-28 space-y-24 sm:space-y-36">
      {/* Hero */}
      <section className="relative -mt-24 pt-32 sm:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] overflow-hidden">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute -top-48 left-[5%] h-[520px] w-[520px] rounded-full blur-[130px] animate-aurora" style={{ background: accent.soft }} />
          <div className="absolute -top-10 right-[5%] h-[380px] w-[380px] rounded-full bg-violet/20 blur-[130px] animate-aurora" style={{ animationDelay: '-8s' }} />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-ink" />
        </div>

        <SectionWrapper size="lg">
          <Reveal>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 min-h-[44px] font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-transform duration-500 group-hover:-translate-x-1">
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
              All work
            </Link>
          </Reveal>

          <div className="mt-8 grid lg:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-16 items-end">
            <div className="space-y-6">
              <Reveal delay={0.05}>
                <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-200">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.hex, boxShadow: `0 0 10px ${accent.hex}` }} />
                  {project.statusLabel}
                </span>
              </Reveal>
              <h1 className="text-6xl sm:text-8xl lg:text-[7.5rem] font-semibold tracking-[-0.055em] text-white leading-[0.92]">
                <SplitWords text={project.name} immediate delay={0.1} />
              </h1>
              <Reveal delay={0.3}>
                <p className="text-xl sm:text-2xl text-zinc-300 max-w-2xl leading-snug">{project.tagline}</p>
              </Reveal>
            </div>

            <Reveal delay={0.4} className="space-y-5">
              <div className="flex flex-wrap gap-1.5">
                {project.technology.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300">
                    {tech}
                  </span>
                ))}
              </div>
              {(project.storeUrl || project.liveUrl) && (
                <div className="flex flex-wrap items-center gap-3">
                  {project.storeUrl && (
                    <a
                      href={project.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkBtn} pl-6 pr-2 text-ink`}
                      style={{ background: accent.hex, boxShadow: `0 20px 50px -15px ${accent.soft}` }}
                    >
                      Install from Chrome Web Store
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${linkBtn} glass px-6 text-white hover:bg-white/[0.08]`}>
                      Visit product site
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </Reveal>
          </div>

          <CaseVisual
            src={project.coverImagePath}
            alt={`Primary screenshot of ${project.name}`}
            label={`${project.slug} — case study`}
            glow={accent.soft}
          />
        </SectionWrapper>
      </section>

      {/* Problem → Solution */}
      <section>
        <SectionWrapper size="lg">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { k: 'The problem', body: project.problem, n: '01' },
              { k: 'What Tendercraft built', body: project.solution, n: '02' },
            ].map((b, i) => (
              <Reveal key={b.k} delay={i * 0.1}>
                <div className="spotlight relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-2 p-8 sm:p-10">
                  <div
                    aria-hidden="true"
                    className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-40"
                    style={{ background: i === 0 ? 'rgba(255,107,87,0.35)' : accent.soft }}
                  />
                  <div className="relative z-[3]">
                    <div className="flex items-center justify-between">
                      <h2 className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: i === 0 ? '#FF9A8B' : accent.light }}>
                        {b.k}
                      </h2>
                      <span className="font-mono text-xs text-zinc-600">{b.n}</span>
                    </div>
                    <p className="mt-8 text-lg sm:text-xl text-zinc-200 leading-relaxed">{b.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* Capabilities */}
      <section>
        <SectionWrapper size="lg">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-32 space-y-5">
              <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accent.light }}>
                ( Verified capabilities )
              </p>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.035em] text-white leading-[1.02]">
                <SplitWords text="What it" />{' '}
                <span className="font-display italic font-normal">
                  <SplitWords text="actually does." delay={0.1} wordClassName="gradient-text pr-[0.06em]" />
                </span>
              </h2>
              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Current delivery state</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.hex }} />
                    {project.statusLabel}
                  </p>
                </div>
              </Reveal>
            </div>

            <ol className="space-y-3">
              {project.capabilities.map((cap, i) => (
                <li key={i}>
                  <Reveal delay={Math.min(i, 5) * 0.06}>
                    <div className="spotlight group relative flex gap-5 overflow-hidden rounded-2xl border border-white/10 bg-ink-2 p-5 sm:p-6">
                      <span
                        className="relative z-[3] flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 font-mono text-xs transition-transform duration-500 group-hover:scale-110"
                        style={{ color: accent.light, background: accent.soft.replace(/0\.\d+\)$/, '0.12)') }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="relative z-[3] text-sm sm:text-base text-zinc-300 leading-relaxed pt-2">{cap}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </SectionWrapper>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section>
          <SectionWrapper size="lg">
            <div className="max-w-3xl space-y-4 mb-10">
              <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accent.light }}>
                ( Visual evidence )
              </p>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.035em] text-white leading-[1.02]">
                <SplitWords text="Interface &" />{' '}
                <span className="font-display italic font-normal text-zinc-400">
                  <SplitWords text="workflow." delay={0.1} />
                </span>
              </h2>
              {project.evidenceNote && (
                <Reveal delay={0.1}>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    <span className="font-semibold" style={{ color: accent.light }}>
                      Evidence note:{' '}
                    </span>
                    {project.evidenceNote}
                  </p>
                </Reveal>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((asset, i) => (
                <Reveal key={asset.id} delay={(i % 2) * 0.1}>
                  <figure className="group h-full rounded-[1.6rem] border border-white/10 bg-ink-2 p-2">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.2rem] bg-ink-3">
                      <Image
                        src={asset.storagePath}
                        alt={asset.altText}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    {asset.caption && <figcaption className="px-3 py-3 text-xs text-zinc-400 leading-relaxed">{asset.caption}</figcaption>}
                  </figure>
                </Reveal>
              ))}
            </div>
          </SectionWrapper>
        </section>
      )}

      {/* Next project */}
      {next && (
        <section>
          <SectionWrapper size="lg">
            <Reveal>
              <Link
                href={`/work/${next.slug}`}
                className="spotlight group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2 p-8 sm:p-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <div
                  aria-hidden="true"
                  className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full blur-3xl opacity-40 transition-all duration-700 group-hover:opacity-80 group-hover:scale-125"
                  style={{ background: nextAccent.soft }}
                />
                <div className="relative z-[3] flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">Next case study</p>
                    <p className="mt-4 text-5xl sm:text-7xl font-semibold tracking-[-0.05em] text-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                      {next.name}
                    </p>
                    <p className="mt-3 max-w-xl text-zinc-400">{next.tagline}</p>
                  </div>
                  <span
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-ink transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110"
                    style={{ background: nextAccent.hex }}
                  >
                    <ArrowUpRight className="h-7 w-7" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </SectionWrapper>
        </section>
      )}

      {/* CTA */}
      <section>
        <SectionWrapper size="lg">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2 p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-violet/15 via-transparent to-mint/10" />
              <div className="relative space-y-2 max-w-xl">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-white">
                  Need something <span className="font-display italic font-normal gradient-text pr-1">similar?</span>
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                  A focused system, custom browser extension, or enterprise workflow tool — let&apos;s scope it directly.
                </p>
              </div>
              <div className="relative flex flex-wrap items-center gap-3 shrink-0">
                <MotionEmailBadge email="hello@tendercrafthq.com" size="md" variant="dark" />
                <Link href="/contact" className={`${linkBtn} bg-white pl-6 pr-2 text-ink`}>
                  Start a project
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </SectionWrapper>
      </section>
    </div>
  );
}
