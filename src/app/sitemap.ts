import { MetadataRoute } from 'next';
import { getPublicProjects } from '@/lib/projects';
import { getSiteUrl } from '@/lib/site';
import { largePrintCrosswords } from '@/lib/large-print-crosswords';
import { visualScheduleBoard } from '@/lib/visual-schedule-board';
import { recipeBox } from '@/lib/recipe-box';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const allProjects = await getPublicProjects();
  const projects = allProjects.filter((p) => p.published);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}${largePrintCrosswords.path}`,
      lastModified: new Date(`${largePrintCrosswords.updatedAt}T00:00:00Z`),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${largePrintCrosswords.path}/choosing-a-readable-crossword-app`,
      lastModified: new Date(`${largePrintCrosswords.updatedAt}T00:00:00Z`),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}${largePrintCrosswords.path}/offline-play-guide`,
      lastModified: new Date(`${largePrintCrosswords.updatedAt}T00:00:00Z`),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}${recipeBox.path}`,
      lastModified: new Date(`${recipeBox.updatedAt}T00:00:00Z`),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${recipeBox.path}/save-recipes-from-websites`,
      lastModified: new Date(`${recipeBox.updatedAt}T00:00:00Z`),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}${recipeBox.path}/keep-screen-on-while-cooking`,
      lastModified: new Date(`${recipeBox.updatedAt}T00:00:00Z`),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}${visualScheduleBoard.path}`,
      lastModified: new Date(`${visualScheduleBoard.updatedAt}T00:00:00Z`),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(project.updatedAt || project.createdAt),
    changeFrequency: 'monthly',
    priority: project.featured ? 0.85 : 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
