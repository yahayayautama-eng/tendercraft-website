import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        'group relative flex flex-col rounded-2xl bg-white dark:bg-[#111726] border border-black/[0.08] dark:border-white/[0.08] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-black/[0.15] dark:hover:border-white/[0.2] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
        className
      )}
    >
      {/* Media Window */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-[#161F33]">
        <Image
          src={project.coverImage}
          alt={`Screenshot preview of ${project.name}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Status Chip */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-white/90 dark:bg-[#0B0F19]/90 text-zinc-900 dark:text-zinc-100 backdrop-blur-md shadow-xs border border-black/[0.06] dark:border-white/[0.1]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            {project.statusLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {project.category}
            </span>
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Capabilities */}
        {project.capabilities && project.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
            {project.capabilities.slice(0, 3).map((cap, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400"
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
