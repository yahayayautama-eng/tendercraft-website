import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { visualScheduleBoard } from '@/lib/visual-schedule-board';

const baseUrl = getSiteUrl();
const url = `${baseUrl}${visualScheduleBoard.path}/visual-schedule-for-classroom`;
const title = 'Visual Schedule for the Classroom: A Teacher’s Setup Guide';
const description = 'How teachers can set up picture schedules on a shared tablet: one profile per child, daily routines, First / Then for transitions, and tips for keeping it calm and simple.';

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

export default function VisualScheduleForClassroomPage() {
  const dir = visualScheduleBoard.path;
  return <article className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-zinc-900 dark:text-zinc-100">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <Link href={dir} className="font-semibold text-emerald-800 dark:text-emerald-300 underline underline-offset-4">← Visual Schedule Board</Link>
    <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">Visual schedule for the classroom: a teacher&apos;s setup guide</h1>
    <p className="mt-5 text-lg leading-relaxed">A picture schedule shows the order of the school day, so children can see what is happening now and what comes next. This guide shows how a teacher or classroom assistant can set one up on a shared Fire tablet, in about ten minutes.</p>
    <div className="mt-10 space-y-10 text-lg leading-relaxed">
      <section><h2 className="text-2xl font-bold">Decide what the schedule is for</h2><p className="mt-3">Start with the part of the day that needs the most prompting. Common choices are arrival, the move between lessons, packing up and going home. A schedule with four to six pictures is easier to follow than one with twelve.</p></section>
      <section><h2 className="text-2xl font-bold">Set it up in five steps</h2><ol className="mt-3 list-decimal pl-6 space-y-3"><li><strong>Create a profile for each child.</strong> Each child has their own routines, so one tablet can serve several children.</li><li><strong>Build the routine.</strong> Add a step for each part of the sequence, choose a picture from the 74 built-in pictures or use a photo of your own classroom, and name it in the words you use every day.</li><li><strong>Keep the order stable.</strong> Use the same sequence on the same days. Edit the routine when the timetable changes.</li><li><strong>Use First / Then for transitions.</strong> Show just two steps, for example First tidy up, then circle time.</li><li><strong>Add a quiet timer when it helps.</strong> A countdown on a step shows time passing with no alarm sound.</li></ol></section>
      <section><h2 className="text-2xl font-bold">A sample school-day routine</h2><ul className="mt-3 list-disc pl-6 space-y-1"><li>Arrive and put away bag</li><li>Circle time</li><li>Work time</li><li>Snack</li><li>Playground</li><li>Pack up and go home</li></ul></section>
      <section><h2 className="text-2xl font-bold">Tips for a calm classroom</h2><ul className="mt-3 list-disc pl-6 space-y-2"><li>Place the tablet where the child can see it without leaving their seat.</li><li>Let the child tap their own steps as they finish. Tapping again undoes a mistake.</li><li>Routines reset every morning, so each day starts fresh.</li><li>Editing sits behind a parent gate, a multiplication question, so children do not change the routines by accident.</li><li>Print a paper copy of a chart as a backup. The <Link href={`${dir}/printable-morning-routine-chart`} className="font-semibold underline underline-offset-4">free printable charts</Link> can be reused for a school routine.</li></ul></section>
      <section><h2 className="text-2xl font-bold">What the app needs and stores</h2><p className="mt-3">Visual Schedule Board works offline, shows no ads and has no accounts. Names, routines and photos stay on the tablet. Read the <Link href={visualScheduleBoard.privacyUrl} className="font-semibold underline underline-offset-4">privacy policy</Link>, and check your school&apos;s own rules on photos and children&apos;s data before adding pictures of pupils. The app is free for {visualScheduleBoard.freeChildren} child profile and {visualScheduleBoard.freeRoutines} routines. A one-time unlock through Amazon adds more children and routines.</p><Image src={`${dir}/routine-editor.webp`} width={1600} height={1000} alt="Routine editor listing four steps with a picture, move up, move down, edit and delete buttons" sizes="(max-width: 896px) 100vw, 896px" className="mt-4 w-full h-auto rounded-2xl border border-zinc-300 dark:border-zinc-700" /></section>
    </div>
    <p className="mt-12 rounded-2xl bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100 p-6">Visual Schedule Board is a routine and organization tool, not a medical or therapy product. <Link href={dir} className="font-bold underline underline-offset-4">See the app</Link> or read the <Link href={`${dir}/first-then-board-guide`} className="font-bold underline underline-offset-4">First / Then board guide</Link>.</p>
  </article>;
}
