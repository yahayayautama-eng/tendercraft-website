import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { getSiteUrl } from '@/lib/site';
import { WINDOWS_APPS } from '@/lib/windows-apps';
import { recipeBox } from '@/lib/recipe-box';
import { visualScheduleBoard } from '@/lib/visual-schedule-board';
import { largePrintCrosswords } from '@/lib/large-print-crosswords';

const siteUrl = getSiteUrl();

export const metadata = {
  title: 'Apps',
  description:
    'Every Tendercraft app in one place: private Windows apps, Fire tablet apps for cooking, routines and crosswords, and Template Delivery Kit for Chrome.',
  alternates: { canonical: `${siteUrl}/apps` },
};

const groups: { title: string; apps: { name: string; href: string; blurb: string }[] }[] = [
  {
    title: 'Windows',
    apps: WINDOWS_APPS.map((a) => ({ name: a.name, href: `/apps/${a.id}`, blurb: a.tagline })),
  },
  {
    title: 'Fire tablets',
    apps: [
      { name: recipeBox.name, href: recipeBox.path, blurb: 'Save and cook from your recipes offline, with a grocery list and keep-screen-on mode.' },
      { name: visualScheduleBoard.name, href: visualScheduleBoard.path, blurb: 'Picture-based routines and first-then boards for children, families and classrooms.' },
      { name: largePrintCrosswords.name, href: largePrintCrosswords.path, blurb: 'Easy-to-read crosswords with large letters that play fully offline.' },
    ],
  },
  {
    title: 'Chrome',
    apps: [
      {
        name: 'Template Delivery Kit',
        href: '/apps/template-delivery-kit',
        blurb: 'Branded delivery PDFs for Canva, Google and Notion template links, plus checks that every link still opens.',
      },
    ],
  },
];

export default function AppsPage() {
  return (
    <div className="py-16 sm:py-24 pb-24">
      <SectionWrapper size="lg">
        <div className="space-y-4 pb-10 border-b border-black/[0.08] dark:border-white/[0.08]">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Apps</h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Small apps that do one job well, for Windows, Fire tablets and Chrome.
          </p>
        </div>

        <div className="mt-12 space-y-14">
          {groups.map((g) => (
            <section key={g.title} aria-labelledby={`apps-${g.title}`} className="space-y-5">
              <h2 id={`apps-${g.title}`} className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                {g.title}
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.apps.map((app) => (
                  <li key={app.href}>
                    <Link
                      href={app.href}
                      className="group flex h-full flex-col gap-3 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] p-6 transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <span className="flex items-center justify-between text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {app.name}
                        <ArrowUpRight className="w-4 h-4 text-zinc-400 transition-transform group-hover:rotate-45" aria-hidden="true" />
                      </span>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{app.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
