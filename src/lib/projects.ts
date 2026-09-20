import { VERIFIED_PROJECTS, Project, ProjectAsset } from '@/data/projects';
import { createPublicSupabaseClient, createServerSupabaseClient } from '@/lib/supabase/server';
import { verifyAdminUser } from '@/lib/supabase/admin';

export async function getPublicProjects(): Promise<Project[]> {
  try {
    const supabase = createPublicSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_assets (
            id,
            storage_path,
            alt_text,
            caption,
            sort_order
          )
        `)
        .eq('published', true)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map(mapDatabaseRowToProject);
      }
    }
  } catch (err) {
    console.error('Error fetching public projects from Supabase:', err);
  }

  // Safe fallback to verified static dataset
  return VERIFIED_PROJECTS.filter((p) => p.published).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getPublicProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = createPublicSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_assets (
            id,
            storage_path,
            alt_text,
            caption,
            sort_order
          )
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (!error && data) {
        return mapDatabaseRowToProject(data);
      }
    }
  } catch (err) {
    console.error(`Error fetching project "${slug}" from Supabase:`, err);
  }

  const found = VERIFIED_PROJECTS.find((p) => p.slug === slug && p.published);
  return found || null;
}

export async function getAdminProjects(): Promise<{
  authorized: boolean;
  projects: Project[];
  error?: string;
}> {
  const auth = await verifyAdminUser();
  if (!auth.authorized) {
    return {
      authorized: false,
      projects: [],
      error: auth.error || 'Unauthorized',
    };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { authorized: false, projects: [], error: 'Backend unconfigured' };
  }

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_assets (
        id,
        storage_path,
        alt_text,
        caption,
        sort_order
      )
    `)
    .order('sort_order', { ascending: true });

  if (error) {
    return { authorized: false, projects: [], error: error.message };
  }

  return {
    authorized: true,
    projects: data.map(mapDatabaseRowToProject),
  };
}

export async function getPreviewProject(slug: string): Promise<{
  authorized: boolean;
  project: Project | null;
  error?: string;
}> {
  const auth = await verifyAdminUser();
  if (!auth.authorized) {
    return { authorized: false, project: null, error: auth.error || 'Unauthorized' };
  }

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_assets (
          id,
          storage_path,
          alt_text,
          caption,
          sort_order
        )
      `)
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return { authorized: true, project: mapDatabaseRowToProject(data) };
    }
  }

  const found = VERIFIED_PROJECTS.find((p) => p.slug === slug);
  return { authorized: true, project: found || null };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDatabaseRowToProject(row: any): Project {
  const technology = Array.isArray(row.technology) ? row.technology : [];

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    summary: row.summary,
    problem: row.problem,
    solution: row.solution,
    capabilities: Array.isArray(row.capabilities) ? row.capabilities : [],
    technology:
      row.slug === 'beadle'
        ? technology.map((item: string) => (item === 'Next.js 14' ? 'Next.js 16.3.1' : item))
        : technology,
    status: row.status,
    statusLabel: row.status_label,
    coverImagePath: row.cover_image_path,
    liveUrl: row.live_url || null,
    storeUrl: row.store_url || null,
    repositoryUrl: row.repository_url || null,
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    sortOrder: Number(row.sort_order) || 0,
    gallery: (row.project_assets || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((asset: any): ProjectAsset => ({
        id: asset.id,
        storagePath: asset.storage_path,
        altText: asset.alt_text,
        caption: asset.caption || undefined,
        sortOrder: asset.sort_order || 0,
      })),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
