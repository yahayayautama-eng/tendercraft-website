import React from 'react';
import { redirect } from 'next/navigation';
import { verifyAdminUser } from '@/lib/supabase/admin';
import { ProjectForm } from '../ProjectForm';
import { SectionWrapper } from '@/components/SectionWrapper';

export const metadata = {
  title: 'Create Project',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NewProjectPage() {
  const auth = await verifyAdminUser();
  if (!auth.authorized) {
    redirect('/admin/login');
  }
  return (
    <div className="py-12 sm:py-16">
      <SectionWrapper size="lg">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Create New Project
          </h1>
          <p className="text-sm text-zinc-500">
            Add a verified business product, browser extension, or system build.
          </p>
        </div>
        <ProjectForm isNew />
      </SectionWrapper>
    </div>
  );
}
