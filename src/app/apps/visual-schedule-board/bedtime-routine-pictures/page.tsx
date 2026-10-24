import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { visualScheduleBoard } from '@/lib/visual-schedule-board';

const baseUrl = getSiteUrl();
const url = `${baseUrl}${visualScheduleBoard.path}/bedtime-routine-pictures`;
const title = 'Bedtime Routine Pictures for Toddlers and Young Kids';
const description = 'A simple six-step bedtime routine in pictures, with a free printable chart and tips for keeping the evening calm and predictable.';

export const metadata: Metadata = { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: 'article' } };

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  url,
  datePublished: '2026-10-25',
  dateModified: '2026-10-25',
  author: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
  publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
  mainEntityOfPage: url,
};

export default function BedtimeRoutinePicturesPage() {
  const dir = visualScheduleBoard.path;
  return <article className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-zinc-900 dark:text-zinc-100">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <Link href={dir} className="font-semibold text-emerald-800 dark:text-emerald-300 underline underline-offset-4">← Visual Schedule Board</Link>
    <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">Bedtime routine pictures for toddlers and young kids</h1>
    <p className="mt-5 text-lg leading-relaxed">Evenings go more smoothly when a child can see the order: wash up, brush teeth, a book, lights off, bed. A bedtime picture routine shows those steps one by one, so the sequence is the same every night and you do not have to repeat it.</p>
    <div className="mt-8"><a href={`${dir}/bedtime-routine-chart.pdf`} className="inline-flex min-h-12 items-center rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white hover:bg-emerald-900">Download the free bedtime chart (PDF)</a></div>
    <div className="mt-10 space-y-10 text-lg leading-relaxed">
      <section><h2 className="text-2xl font-bold">A simple six-step bedtime routine</h2><ol className="mt-3 list-decimal pl-6 space-y-2"><li>Wash up</li><li>Brush teeth</li><li>Read a book</li><li>Lights off</li><li>Get into bed</li><li>Time to sleep</li></ol><p className="mt-3">Change the steps to fit your family. Add a bath, pyjamas or a cuddly toy, and remove what you do not need.</p></section>
      <section><h2 className="text-2xl font-bold">Tips for a calmer evening</h2><ul className="mt-3 list-disc pl-6 space-y-2"><li>Start at about the same time each night.</li><li>Keep the order the same, and use the same words for each step.</li><li>Dim the lights and turn off screens that are not part of the routine.</li><li>Let the child tick or tap each step, so they feel in charge of the plan.</li><li>Praise the effort of each step, not just the end.</li></ul></section>
      <section><h2 className="text-2xl font-bold">Using it on a tablet</h2><p className="mt-3">In <Link href={dir} className="font-semibold underline underline-offset-4">Visual Schedule Board</Link>, the Bedtime routine shows one large step at a time. Tap a step when it is done, and the next one lights up. When the last step is finished, a calm All done screen appears. The app has no ads and works offline, so it is safe to leave on a bedside table.</p><Image src={`${dir}/all-done.webp`} width={1600} height={1000} alt="All done screen with a star and the finished steps, shown when a routine is complete" sizes="(max-width: 896px) 100vw, 896px" className="mt-4 w-full h-auto rounded-2xl border border-zinc-300 dark:border-zinc-700" /></section>
      <section><h2 className="text-2xl font-bold">Pictures and credits</h2><p className="mt-3">The printable chart uses Twemoji pictures by Twitter, Inc. and contributors, licensed under CC BY 4.0. You may print and share the chart for home and classroom use.</p></section>
    </div>
    <p className="mt-12 rounded-2xl bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100 p-6">Visual Schedule Board is a routine and organization tool. <Link href={dir} className="font-bold underline underline-offset-4">See the app</Link>, or print the <Link href={`${dir}/printable-morning-routine-chart`} className="font-bold underline underline-offset-4">morning routine chart</Link>.</p>
  </article>;
}
