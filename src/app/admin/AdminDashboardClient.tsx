"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Project } from '@/data/projects';
import {
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  LogOut,
  AlertTriangle,
  X,
} from 'lucide-react';
import {
  togglePublishAction,
  toggleFeaturedAction,
  deleteProjectAction,
  logoutAdminAction,
} from './actions';

export function AdminDashboardClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [deleteModalProject, setDeleteModalProject] = useState<Project | null>(null);
  const [confirmInput, setConfirmInput] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleTogglePublish(p: Project) {
    setActionLoading(true);
    try {
      await togglePublishAction(p.id, p.published);
      setProjects((prev) =>
        prev.map((item) =>
          item.id === p.id ? { ...item, published: !item.published } : item
        )
      );
      router.refresh();
    } finally {
      setActionLoading(false);
    }
  }

  async function handleToggleFeatured(p: Project) {
    setActionLoading(true);
    try {
      await toggleFeaturedAction(p.id, p.featured);
      setProjects((prev) =>
        prev.map((item) =>
          item.id === p.id ? { ...item, featured: !item.featured } : item
        )
      );
      router.refresh();
    } finally {
      setActionLoading(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteModalProject) return;
    if (confirmInput.trim() !== deleteModalProject.name.trim()) {
      setDeleteError('Project name does not match.');
      return;
    }

    setActionLoading(true);
    setDeleteError(null);
    try {
      const res = await deleteProjectAction(
        deleteModalProject.id,
        confirmInput,
        deleteModalProject.name
      );
      if (res.success) {
        setProjects((prev) => prev.filter((item) => item.id !== deleteModalProject.id));
        setDeleteModalProject(null);
        setConfirmInput('');
        router.refresh();
      } else {
        setDeleteError(res.error || 'Failed to delete project.');
      }
    } finally {
      setActionLoading(false);
    }
  }

  async function handleLogout() {
    await logoutAdminAction();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-zinc-500">
          Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-red-600 transition-colors p-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] overflow-hidden bg-white dark:bg-[#111726] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-black/[0.06] dark:border-white/[0.08] bg-zinc-50/70 dark:bg-[#161F33]/70 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                <th className="py-3.5 px-4 sm:px-6">Project</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Published</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-500 text-sm">
                    No projects found. Click &quot;New Project&quot; to create one.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Project Identity */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-black/[0.06] dark:border-white/[0.08]">
                          <Image
                            src={project.coverImagePath}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <span>{project.name}</span>
                          </div>
                          <div className="text-xs text-zinc-400 font-mono">
                            /{project.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300">
                        {project.statusLabel}
                      </span>
                    </td>

                    {/* Published Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={() => handleTogglePublish(project)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                          project.published
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200'
                        }`}
                        title="Click to toggle published state"
                      >
                        {project.published ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Live</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={() => handleToggleFeatured(project)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          project.featured
                            ? 'text-amber-500 bg-amber-500/10 hover:bg-amber-500/20'
                            : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                        }`}
                        title="Toggle featured on home page"
                      >
                        <Star
                          className="w-4 h-4"
                          fill={project.featured ? 'currentColor' : 'none'}
                        />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/preview/${project.slug}`}
                          className="p-2 rounded-lg text-zinc-500 hover:text-blue-600 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
                          title="Preview project"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="p-2 rounded-lg text-zinc-500 hover:text-blue-600 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
                          title="Edit project"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteModalProject(project);
                            setConfirmInput('');
                            setDeleteError(null);
                          }}
                          className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmed Deletion Modal */}
      {deleteModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-[#111726] rounded-2xl border border-red-200 dark:border-red-900/50 p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-red-600">
                <div className="p-2 rounded-full bg-red-100 dark:bg-red-950/50">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Delete Project
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDeleteModalProject(null)}
                className="text-zinc-400 hover:text-zinc-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              This action is <strong className="text-red-600">irreversible</strong>. It will permanently remove <strong>{deleteModalProject.name}</strong>, all associated gallery images, and storage assets.
            </p>

            <div className="space-y-2">
              <label
                htmlFor="confirm-name"
                className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Type <span className="font-mono text-red-600 font-bold">{deleteModalProject.name}</span> to confirm:
              </label>
              <input
                id="confirm-name"
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                placeholder={deleteModalProject.name}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600 font-mono"
              />
            </div>

            {deleteError && (
              <p className="text-xs text-red-600">{deleteError}</p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalProject(null)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  confirmInput.trim() !== deleteModalProject.name.trim() ||
                  actionLoading
                }
                onClick={handleConfirmDelete}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm disabled:opacity-40 cursor-pointer"
              >
                {actionLoading ? 'Deleting...' : 'Permanently Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
