import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { accentForSlug, accentStyle } from '@/lib/accents';

export interface ProjectCardData {
  slug: string;
  name: string;
  tagline: string;
  summary?: string;
  statusLabel: string;
  category: string;
  coverImage: string;
  capabilities?: string[];
  featured?: boolean;
}

interface ProjectCardProps {
  project: ProjectCardData;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({ project, priority = false, className }: ProjectCardProps) {
  const projectStyle = accentStyle(accentForSlug(project.slug));

  return (
    <Link
      href={`/work/${project.slug}`}
      style={projectStyle}
      className={cn(
        'tc-auto spotlight group relative flex h-full flex-col rounded-[1.75rem] bg-ink-2 border border-white/10 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(124,92,255,0.55)] motion-reduce:hover:translate-y-0 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
        className
      )}
    >
      {/* Media Window (Standardized 16:10 Ratio) */}
      <div className="relative z-[3] m-2 mb-0 aspect-[16/10] overflow-hidden rounded-[1.35rem] bg-ink-3">
        <Image
          src={project.coverImage}
          alt={`Screenshot preview of ${project.name}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] duration-700 motion-reduce:transform-none motion-reduce:transition-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Status Chip */}
        <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-ink/70 text-zinc-100 backdrop-blur-md border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--project-accent-fg-dark)] shrink-0" />
            <span>{project.statusLabel}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-[3] p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--project-accent-fg-dark)] font-mono">
              {project.category}
            </span>
            <div className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-zinc-300 group-hover:bg-white group-hover:text-ink group-hover:rotate-45 transition-all duration-500 shrink-0">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-[1.75rem] font-semibold tracking-[-0.03em] text-zinc-100 group-hover:text-[var(--project-accent-fg-dark)] transition-colors duration-200">
            {project.name}
          </h3>
          <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Capabilities */}
        {project.capabilities && project.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.07]">
            {project.capabilities.slice(0, 3).map((cap, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full max-w-full truncate border border-white/10 bg-white/[0.03] text-zinc-300"
              >
                {cap}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
