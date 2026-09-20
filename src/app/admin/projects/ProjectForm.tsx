"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Project, ProjectAsset } from '@/data/projects';
import { ArrowLeft, Save, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { saveProjectAction } from '../actions';

interface ProjectFormProps {
  initialData?: Project;
  isNew?: boolean;
}

export function ProjectForm({ initialData, isNew = false }: ProjectFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [autoSlug, setAutoSlug] = useState(isNew);
  const [tagline, setTagline] = useState(initialData?.tagline || '');
  const [status, setStatus] = useState(initialData?.status || 'build');
  const [statusLabel, setStatusLabel] = useState(initialData?.statusLabel || 'Working Application');
  const [coverImagePath, setCoverImagePath] = useState(initialData?.coverImagePath || '');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [problem, setProblem] = useState(initialData?.problem || '');
  const [solution, setSolution] = useState(initialData?.solution || '');
  const [capabilities, setCapabilities] = useState<string[]>(initialData?.capabilities || ['']);
  const [technology, setTechnology] = useState<string[]>(initialData?.technology || ['']);
  const [liveUrl, setLiveUrl] = useState(initialData?.liveUrl || '');
  const [storeUrl, setStoreUrl] = useState(initialData?.storeUrl || '');
  const [repositoryUrl, setRepositoryUrl] = useState(initialData?.repositoryUrl || '');
  const [featured, setFeatured] = useState(Boolean(initialData?.featured));
  const [published, setPublished] = useState(Boolean(initialData?.published));
  const [gallery, setGallery] = useState<ProjectAsset[]>(initialData?.gallery || []);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Auto generate slug from name
  function handleNameChange(val: string) {
    setName(val);
    if (autoSlug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  }

  function handleAddCapability() {
    setCapabilities([...capabilities, '']);
  }

  function handleUpdateCapability(index: number, val: string) {
    const updated = [...capabilities];
    updated[index] = val;
    setCapabilities(updated);
  }

  function handleRemoveCapability(index: number) {
    setCapabilities(capabilities.filter((_, i) => i !== index));
  }

  function handleAddTech() {
    setTechnology([...technology, '']);
  }

  function handleUpdateTech(index: number, val: string) {
    const updated = [...technology];
    updated[index] = val;
    setTechnology(updated);
  }

  function handleRemoveTech(index: number) {
    setTechnology(technology.filter((_, i) => i !== index));
  }

  function handleAddGalleryItem() {
    setGallery([
      ...gallery,
      {
        id: `temp-${Date.now()}`,
        storagePath: '',
        altText: '',
        caption: '',
        sortOrder: gallery.length + 1,
      },
    ]);
  }

  function handleUpdateGalleryItem(index: number, field: keyof ProjectAsset, val: string | number) {
    const updated = [...gallery];
    updated[index] = { ...updated[index], [field]: val };
    setGallery(updated);
  }

  function handleRemoveGalleryItem(index: number) {
    setGallery(gallery.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await saveProjectAction({
        id: initialData?.id,
        name,
        slug,
        tagline,
        status: status as Project['status'],
        statusLabel,
        coverImagePath,
        summary,
        problem,
        solution,
        capabilities,
        technology,
        liveUrl,
        storeUrl,
        repositoryUrl,
        featured,
        published,
        sortOrder: initialData?.sortOrder || 0,
        gallery,
      });

      if (res.success) {
        setSuccess('Project saved successfully.');
        setTimeout(() => {
          router.push('/admin');
          router.refresh();
        }, 800);
      } else {
        setError(res.error || 'Failed to save project.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save project.';
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 cursor-pointer text-sm"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : isNew ? 'Create Project' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-sm text-red-700 dark:text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-sm text-emerald-700 dark:text-emerald-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Core Details Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111726] border border-black/[0.08] dark:border-white/[0.08] space-y-6">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          General Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1.5">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Beadle"
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                Slug (URL Identifier) *
              </label>
              <button
                type="button"
                onClick={() => setAutoSlug(!autoSlug)}
                className="text-[11px] text-blue-600 hover:underline"
              >
                {autoSlug ? 'Lock Slug' : 'Auto from Name'}
              </button>
            </div>
            <div className="flex items-center rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] overflow-hidden focus-within:ring-2 focus-within:ring-blue-600">
              <span className="pl-3.5 pr-1 text-xs text-zinc-400 font-mono">/work/</span>
              <input
                type="text"
                required
                value={slug}
                readOnly={autoSlug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="beadle"
                className="w-full pr-3.5 py-2.5 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1.5">
            One-Line Tagline *
          </label>
          <input
            type="text"
            required
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Urgent Windows desktop alerts with delivery tracking."
            className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1.5">
              Status Category *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Project['status'])}
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="prototype">prototype</option>
              <option value="build">build</option>
              <option value="deployed">deployed</option>
              <option value="packaged">packaged</option>
              <option value="production">production</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1.5">
              Public Status Badge Label *
            </label>
            <input
              type="text"
              required
              value={statusLabel}
              onChange={(e) => setStatusLabel(e.target.value)}
              placeholder="e.g. On-Premise Build, Deployed Web App"
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1.5">
            Cover Image Path or URL *
          </label>
          <input
            type="text"
            required
            value={coverImagePath}
            onChange={(e) => setCoverImagePath(e.target.value)}
            placeholder="/projects/beadle/beadle-hero.webp"
            className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
          />
        </div>

        <div className="flex items-center gap-8 pt-4 border-t border-black/[0.04] dark:border-white/[0.06]">
          <label className="flex items-center gap-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Published (Visible to public visitors)</span>
          </label>

          <label className="flex items-center gap-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Featured on Home Page</span>
          </label>
        </div>
      </div>

      {/* Case Study Editorial Content Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111726] border border-black/[0.08] dark:border-white/[0.08] space-y-6">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Case Study Copy
        </h2>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1.5">
            Executive Summary *
          </label>
          <textarea
            required
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1.5">
            The User Problem *
          </label>
          <textarea
            required
            rows={3}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1.5">
            What Tendercraft Built (The Solution) *
          </label>
          <textarea
            required
            rows={3}
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
          />
        </div>
      </div>

      {/* Verified Capabilities & Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111726] border border-black/[0.08] dark:border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Key Capabilities
            </h2>
            <button
              type="button"
              onClick={handleAddCapability}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add item</span>
            </button>
          </div>
          <div className="space-y-2.5">
            {capabilities.map((cap, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={cap}
                  onChange={(e) => handleUpdateCapability(index, e.target.value)}
                  placeholder="e.g. Active Directory & LDAP targeting"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCapability(index)}
                  className="p-1.5 text-zinc-400 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111726] border border-black/[0.08] dark:border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Technology Stack
            </h2>
            <button
              type="button"
              onClick={handleAddTech}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add item</span>
            </button>
          </div>
          <div className="space-y-2.5">
            {technology.map((tech, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => handleUpdateTech(index, e.target.value)}
                  placeholder="e.g. .NET 8, SignalR"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTech(index)}
                  className="p-1.5 text-zinc-400 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* External Verified Links */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111726] border border-black/[0.08] dark:border-white/[0.08] space-y-4">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
          Verified External Links
        </h2>
        <p className="text-xs text-zinc-500">
          Leave blank if not publicly deployed or unverified.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
              Live Web URL
            </label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
              Store / Marketplace URL
            </label>
            <input
              type="url"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
              Public Repository URL
            </label>
            <input
              type="url"
              value={repositoryUrl}
              onChange={(e) => setRepositoryUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>
      </div>

      {/* Gallery Media Management Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111726] border border-black/[0.08] dark:border-white/[0.08] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Gallery Media Management
            </h2>
            <p className="text-xs text-zinc-500">
              Upload, caption, alt-text, and reorder case study images.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddGalleryItem}
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add image</span>
          </button>
        </div>

        <div className="space-y-4">
          {gallery.map((item, index) => (
            <div
              key={item.id || index}
              className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-zinc-50 dark:bg-[#161F33] grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
            >
              <div className="sm:col-span-2 relative aspect-video rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-black/[0.08]">
                {item.storagePath ? (
                  <Image
                    src={item.storagePath}
                    alt=""
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-400">
                    No image
                  </div>
                )}
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="text-[11px] font-semibold text-zinc-500">
                  Image Path / Storage Key
                </label>
                <input
                  type="text"
                  value={item.storagePath}
                  onChange={(e) => handleUpdateGalleryItem(index, 'storagePath', e.target.value)}
                  placeholder="/projects/..."
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#111726] font-mono"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-[11px] font-semibold text-zinc-500">
                  Alt Text (Accessibility)
                </label>
                <input
                  type="text"
                  value={item.altText}
                  onChange={(e) => handleUpdateGalleryItem(index, 'altText', e.target.value)}
                  placeholder="Descriptive alt text"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#111726]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-semibold text-zinc-500">
                  Caption
                </label>
                <input
                  type="text"
                  value={item.caption || ''}
                  onChange={(e) => handleUpdateGalleryItem(index, 'caption', e.target.value)}
                  placeholder="Optional caption"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#111726]"
                />
              </div>

              <div className="sm:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryItem(index)}
                  className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
