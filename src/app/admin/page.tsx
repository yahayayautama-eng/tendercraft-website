import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminProjects } from '@/lib/projects';
import { AdminDashboardClient } from './AdminDashboardClient';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Shield, Plus } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const result = await getAdminProjects();

  // Defense in depth: strictly redirect to login if unauthorized
  if (!result.authorized) {
    redirect('/admin/login');
  }

  const projects = result.projects;

  return (
    <div className="py-12 sm:py-16 min-h-[85vh]">
      <SectionWrapper size="lg">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Studio Management Backend</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Portfolio Projects
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Create, edit, preview, reorder, publish, and delete verified studio work.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </Link>
          </div>
        </div>

        {/* Client Interactive Table */}
        <div className="mt-8">
          <AdminDashboardClient initialProjects={projects} />
        </div>
      </SectionWrapper>
    </div>
  );
}
