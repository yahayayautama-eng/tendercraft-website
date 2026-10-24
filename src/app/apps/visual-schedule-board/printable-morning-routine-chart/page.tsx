import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { visualScheduleBoard } from '@/lib/visual-schedule-board';

const baseUrl = getSiteUrl();
const url = `${baseUrl}${visualScheduleBoard.path}/printable-morning-routine-chart`;
const title = 'Free Printable Morning Routine Chart for Kids (PDF)';
const description = 'Download a free picture morning routine chart and a bedtime chart, with tips for hanging it up, using it every day and changing steps as your child grows.';

export const metadata: Metadata = { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: 'article' } };

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  url,
  datePublished: '2026-10-24',
  dateModified: '2026-10-24',
  author: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
  publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
  mainEntityOfPage: url,
};

export default function PrintableMorningRoutineChartPage() {
  const dir = visualScheduleBoard.path;
  return <article className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-zinc-900 dark:text-zinc-100">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <Link href={visualScheduleBoard.path} className="font-semibold text-emerald-800 dark:text-emerald-300 underline underline-offset-4">← Visual Schedule Board</Link>
    <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">Free printable morning routine chart for kids</h1>
    <p className="mt-5 text-lg leading-relaxed">A picture chart shows a child the order of the morning in six steps, so you do not have to repeat the list. Print one of the charts below, hang it at the child&apos;s eye level and tick each step as it is finished. They are free to print and share. No sign-up is needed.</p>
    <div className="mt-8 flex flex-wrap gap-4">
      <a href={`${dir}/morning-routine-chart.pdf`} className="inline-flex min-h-12 items-center rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white hover:bg-emerald-900">Download morning chart (PDF)</a>
      <a href={`${dir}/bedtime-routine-chart.pdf`} className="inline-flex min-h-12 items-center rounded-xl border-2 border-emerald-800 px-6 py-3 font-bold text-emerald-900 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-950">Download bedtime chart (PDF)</a>
    </div>
    <p className="mt-3 text-sm">US Letter size, one page. Pictures are Twemoji, CC BY 4.0.</p>

    <div className="mt-12 space-y-10 text-lg leading-relaxed">
      <section><h2 className="text-2xl font-bold">What is on the morning chart</h2><p className="mt-3">Brush teeth, get dressed, eat breakfast, put on shoes, pack bag and go to school. The bedtime chart covers wash up, brush teeth, read a book, lights off, get into bed and time to sleep. Each step has a large picture, a short label and a tick box.</p></section>
      <section><h2 className="text-2xl font-bold">How to use it</h2><ol className="mt-3 list-decimal pl-6 space-y-2"><li>Print the chart and hang it where the routine happens, at the child&apos;s eye level.</li><li>Walk through the steps together the first few days, pointing to each picture.</li><li>Let the child tick each step, or put a sticker on it.</li><li>Start the routine at about the same time each day.</li><li>When the chart works, remove a prompt: point to the chart instead of speaking.</li></ol></section>
      <section><h2 className="text-2xl font-bold">Tips that help</h2><ul className="mt-3 list-disc pl-6 space-y-2"><li>Keep the order the same every day.</li><li>Use six steps or fewer. Fewer steps are easier to follow.</li><li>Use words the child already uses. Rename a step if needed.</li><li>Laminate the page and use a dry-erase marker for ticks.</li></ul></section>
      <section><h2 className="text-2xl font-bold">When paper is not enough</h2><p className="mt-3">A paper chart is fixed. If you want other steps, photos of your own shoes and bag, a quiet timer for tooth brushing or a separate routine for each child, you can build it on a tablet. <Link href={visualScheduleBoard.path} className="font-semibold underline underline-offset-4">Visual Schedule Board</Link> is an offline picture-routine app for Amazon Fire tablets. It has 74 built-in pictures, supports your own photos, and shows one step at a time. Tap a step when it is done, and tap again to undo.</p></section>
      <section><h2 className="text-2xl font-bold">Licence</h2><p className="mt-3">You may print and share these charts for home, classroom and personal use. Keep the small credit line at the bottom. Pictures are Twemoji by Twitter, Inc. and contributors, licensed under CC BY 4.0.</p></section>
    </div>
    <p className="mt-12 rounded-2xl bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100 p-6"><Link href={visualScheduleBoard.path} className="font-bold underline underline-offset-4">See the Visual Schedule Board app</Link> or read the <Link href={`${visualScheduleBoard.path}/first-then-board-guide`} className="font-bold underline underline-offset-4">guide to First / Then boards</Link>.</p>
  </article>;
}
