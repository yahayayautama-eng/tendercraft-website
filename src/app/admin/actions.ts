"use server";

import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { verifyAdminUser } from '@/lib/supabase/admin';
import { ProjectAsset } from '@/data/projects';

export async function loginAdminAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.', code: 400 };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      success: false,
      error: 'Supabase authentication backend is not configured in environment.',
      code: 503,
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { success: false, error: error?.message || 'Authentication failed.', code: 401 };
  }

  // Strictly verify admin allowlist table: possession of account is not enough
  const { data: adminUser, error: allowlistError } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', data.user.id)
    .single();

  if (allowlistError || !adminUser) {
    await supabase.auth.signOut();
    return {
      success: false,
      error: 'Access denied: Account is not authorized as a Tendercraft administrator.',
      code: 403,
    };
  }

  revalidatePath('/admin');
  return { success: true };
}

export async function logoutAdminAction() {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut({ scope: 'local' });
  }
  revalidatePath('/admin');
  return { success: true };
}

export async function togglePublishAction(id: string, published: boolean) {
  const auth = await verifyAdminUser();
  if (!auth.authorized) {
    return {
      success: false,
      error: auth.error || 'Unauthorized: Administrator privileges required.',
      code: 403,
    };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { success: false, error: 'Database unconfigured.', code: 503 };
  }

  const { error } = await supabase
    .from('projects')
    .update({ published: !published, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message, code: 500 };
  }

  revalidatePath('/admin');
  revalidatePath('/work');
  revalidatePath('/');
  return { success: true };
}

export async function toggleFeaturedAction(id: string, featured: boolean) {
  const auth = await verifyAdminUser();
  if (!auth.authorized) {
    return {
      success: false,
      error: auth.error || 'Unauthorized: Administrator privileges required.',
      code: 403,
    };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { success: false, error: 'Database unconfigured.', code: 503 };
  }

  const { error } = await supabase
    .from('projects')
    .update({ featured: !featured, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message, code: 500 };
  }

  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function deleteProjectAction(
  id: string,
  confirmationName: string,
  expectedName: string
) {
  const auth = await verifyAdminUser();
  if (!auth.authorized) {
    return {
      success: false,
      error: auth.error || 'Unauthorized: Administrator privileges required.',
      code: 403,
    };
  }

  if (confirmationName.trim().toLowerCase() !== expectedName.trim().toLowerCase()) {
    return { success: false, error: 'Project name confirmation does not match.', code: 400 };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { success: false, error: 'Database unconfigured.', code: 503 };
  }

  // 1. Fetch assets to clean up storage objects
  const { data: assets } = await supabase
    .from('project_assets')
    .select('storage_path')
    .eq('project_id', id);

  if (assets && assets.length > 0) {
    const storageKeys = assets
      .map((a) => a.storage_path)
      .filter((p) => p.startsWith('project-assets/'))
      .map((p) => p.replace('project-assets/', ''));

    if (storageKeys.length > 0) {
      await supabase.storage.from('project-assets').remove(storageKeys);
    }
  }

  // 2. Delete project row (cascades to project_assets table)
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) {
    return { success: false, error: error.message, code: 500 };
  }

  revalidatePath('/admin');
  revalidatePath('/work');
  revalidatePath('/');
  return { success: true };
}

export interface SaveProjectPayload {
  id?: string;
  name: string;
  slug: string;
  tagline: string;
  summary: string;
  problem: string;
  solution: string;
  capabilities: string[];
  technology: string[];
  status: 'prototype' | 'build' | 'deployed' | 'packaged' | 'production';
  statusLabel: string;
  coverImagePath: string;
  liveUrl?: string;
  storeUrl?: string;
  repositoryUrl?: string;
  featured: boolean;
  published: boolean;
  sortOrder?: number;
  gallery?: ProjectAsset[];
}

export async function saveProjectAction(payload: SaveProjectPayload) {
  const auth = await verifyAdminUser();
  if (!auth.authorized) {
    return {
      success: false,
      error: auth.error || 'Unauthorized: Administrator privileges required.',
      code: 403,
    };
  }

  // 1. Validate required fields
  if (!payload.name || payload.name.trim().length < 2 || payload.name.length > 100) {
    return { success: false, error: 'Project name must be between 2 and 100 characters.', code: 400 };
  }

  const cleanSlug = payload.slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '')
    .replace(/(^-|-$)/g, '');

  if (!cleanSlug || cleanSlug.length < 2 || cleanSlug.length > 100) {
    return { success: false, error: 'Invalid slug. Must be 2-100 lowercase alphanumeric characters and hyphens.', code: 400 };
  }

  if (!payload.tagline || payload.tagline.trim().length < 5 || payload.tagline.length > 250) {
    return { success: false, error: 'Tagline must be between 5 and 250 characters.', code: 400 };
  }

  const validStatuses = ['prototype', 'build', 'deployed', 'packaged', 'production'];
  if (!validStatuses.includes(payload.status)) {
    return { success: false, error: 'Status must be one of: prototype, build, deployed, packaged, production.', code: 400 };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { success: false, error: 'Database unconfigured.', code: 503 };
  }

  const cleanCapabilities = (payload.capabilities || [])
    .map((c) => c.trim())
    .filter((c) => c.length > 0);

  const cleanTechnology = (payload.technology || [])
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const rowData = {
    name: payload.name.trim(),
    slug: cleanSlug,
    tagline: payload.tagline.trim(),
    summary: payload.summary.trim(),
    problem: payload.problem.trim(),
    solution: payload.solution.trim(),
    capabilities: cleanCapabilities,
    technology: cleanTechnology,
    status: payload.status,
    status_label: payload.statusLabel.trim() || 'Working Application',
    cover_image_path: payload.coverImagePath.trim(),
    live_url: payload.liveUrl?.trim() || null,
    store_url: payload.storeUrl?.trim() || null,
    repository_url: payload.repositoryUrl?.trim() || null,
    featured: Boolean(payload.featured),
    published: Boolean(payload.published),
    sort_order: typeof payload.sortOrder === 'number' ? payload.sortOrder : 0,
    updated_at: new Date().toISOString(),
  };

  let projectId = payload.id;

  if (projectId) {
    // Update existing project
    const { error: updateError } = await supabase
      .from('projects')
      .update(rowData)
      .eq('id', projectId);

    if (updateError) {
      return { success: false, error: updateError.message, code: 500 };
    }
  } else {
    // Insert new project
    const { data: newProject, error: insertError } = await supabase
      .from('projects')
      .insert({
        ...rowData,
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (insertError || !newProject) {
      return { success: false, error: insertError?.message || 'Failed to insert project.', code: 500 };
    }
    projectId = newProject.id;
  }

  // Update gallery assets if provided
  if (payload.gallery && payload.gallery.length > 0 && projectId) {
    const galleryRows = payload.gallery
      .filter((g) => g.storagePath && g.storagePath.trim().length > 0)
      .map((g, idx) => ({
        project_id: projectId,
        storage_path: g.storagePath.trim(),
        alt_text: (g.altText || payload.name).trim(),
        caption: g.caption?.trim() || null,
        sort_order: idx + 1,
      }));

    if (galleryRows.length > 0) {
      await supabase.from('project_assets').delete().eq('project_id', projectId);
      await supabase.from('project_assets').insert(galleryRows);
    }
  }

  revalidatePath('/admin');
  revalidatePath('/work');
  revalidatePath(`/work/${cleanSlug}`);
  revalidatePath('/');
  return { success: true, projectId, slug: cleanSlug };
}
