import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getAdminProjects } from '@/lib/projects';
import { ProjectForm } from '../../ProjectForm';
import { SectionWrapper } from '@/components/SectionWrapper';

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Edit Project',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const result = await getAdminProjects();

  if (!result.authorized) {
    redirect('/admin/login');
  }

  const project = result.projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16">
      <SectionWrapper size="lg">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Edit Project: {project.name}
          </h1>
          <p className="text-sm text-zinc-500">
            Modify project content, gallery images, capabilities, and published state.
          </p>
        </div>
        <ProjectForm initialData={project} />
      </SectionWrapper>
    </div>
  );
}
