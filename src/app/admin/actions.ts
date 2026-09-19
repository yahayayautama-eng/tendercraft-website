"use server";

import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { verifyAdminUser } from '@/lib/supabase/admin';

export async function loginAdminAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    // If running in local dev without live Supabase configured:
    if (email === 'yyautama@tendercrafthq.com' || email === 'admin@tendercrafthq.com') {
      return { success: true };
    }
    return { success: false, error: 'Supabase credentials not configured in environment.' };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Verify allowlist table
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', data.user.id)
    .single();

  if (!adminUser) {
    await supabase.auth.signOut();
    return { success: false, error: 'Access denied. Account is not on the admin allowlist.' };
  }

  revalidatePath('/admin');
  return { success: true };
}

export async function logoutAdminAction() {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  revalidatePath('/admin');
  return { success: true };
}

export async function togglePublishAction(id: string, published: boolean) {
  const auth = await verifyAdminUser();
  if (!auth.authorized && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: false, error: 'Unauthorized mutation.' };
  }

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase
      .from('projects')
      .update({ published: !published, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }
  }

  revalidatePath('/admin');
  revalidatePath('/work');
  revalidatePath('/');
  return { success: true };
}

export async function toggleFeaturedAction(id: string, featured: boolean) {
  const auth = await verifyAdminUser();
  if (!auth.authorized && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: false, error: 'Unauthorized mutation.' };
  }

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase
      .from('projects')
      .update({ featured: !featured, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }
  }

  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function deleteProjectAction(id: string, confirmationName: string, expectedName: string) {
  const auth = await verifyAdminUser();
  if (!auth.authorized && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: false, error: 'Unauthorized mutation.' };
  }

  if (confirmationName.trim().toLowerCase() !== expectedName.trim().toLowerCase()) {
    return { success: false, error: 'Project name confirmation does not match.' };
  }

  const supabase = await createServerSupabaseClient();
  if (supabase) {
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
      return { success: false, error: error.message };
    }
  }

  revalidatePath('/admin');
  revalidatePath('/work');
  revalidatePath('/');
  return { success: true };
}
