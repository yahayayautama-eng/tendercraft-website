import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { visualScheduleBoard } from '@/lib/visual-schedule-board';

const baseUrl = getSiteUrl();
const url = `${baseUrl}${visualScheduleBoard.path}/visual-schedule-app-fire-tablet`;
const title = 'Visual Schedule App for Fire Tablet: Setup Guide';
const description = 'How to install Visual Schedule Board on an Amazon Fire tablet, build your first routine, add photos, add more children and back up your routines.';

export const metadata: Metadata = { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: 'article' } };

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Article', headline: title, description, url, datePublished: '2026-10-25', dateModified: '2026-10-25', author: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl }, publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl }, mainEntityOfPage: url },
    {
      '@type': 'HowTo',
      name: 'Set up Visual Schedule Board on a Fire tablet',
      step: [
        { '@type': 'HowToStep', name: 'Install the app', text: 'Open the Appstore on your Fire tablet, search for Visual Schedule Board and tap Get.' },
        { '@type': 'HowToStep', name: 'Open a routine', text: 'Open the app and tap Start on Morning or Bedtime to see the steps.' },
        { '@type': 'HowToStep', name: 'Unlock the parent area', text: 'Press and hold Hold for parents, then answer the multiplication question.' },
        { '@type': 'HowToStep', name: 'Edit the routine', text: 'Rename steps, change pictures, add photos and set optional quiet timers.' },
        { '@type': 'HowToStep', name: 'Back up', text: 'Export all routines and photos to one backup file from the parent area.' },
      ],
    },
  ],
};

export default function VisualScheduleAppFireTabletPage() {
  const dir = visualScheduleBoard.path;
  return <article className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-zinc-900 dark:text-zinc-100">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <Link href={dir} className="font-semibold text-emerald-800 dark:text-emerald-300 underline underline-offset-4">← Visual Schedule Board</Link>
    <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">Visual schedule app for Fire tablet: setup guide</h1>
    <p className="mt-5 text-lg leading-relaxed">Visual Schedule Board is a picture-routine app for Amazon Fire tablets. This guide covers installing it, building a first routine and looking after your data. No account is needed, and the app works without internet.</p>
    <div className="mt-10 space-y-10 text-lg leading-relaxed">
      <section><h2 className="text-2xl font-bold">1. Install it</h2><p className="mt-3">Open the Appstore on your Fire tablet, search for <em>Visual Schedule Board</em> and tap Get. The Appstore page shows whether your tablet is supported. The app is made for Fire tablets and is not available for Kindle e-readers.</p></section>
      <section><h2 className="text-2xl font-bold">2. Start a routine</h2><p className="mt-3">The app opens on the home screen with a sample profile and routines. Tap Start on a routine to see the first step. The child taps the step when it is done. Tapping a finished step again undoes it.</p><Image src={`${dir}/home.webp`} width={1600} height={1000} alt="Home screen with Morning, School and Bedtime routines, each with a Start button" sizes="(max-width: 896px) 100vw, 896px" className="mt-4 w-full h-auto rounded-2xl border border-zinc-300 dark:border-zinc-700" /></section>
      <section><h2 className="text-2xl font-bold">3. Open the parent area</h2><p className="mt-3">Press and hold <strong>Hold for parents</strong> for two seconds, then answer the multiplication question with the on-screen keypad. This keeps editing away from small fingers.</p></section>
      <section><h2 className="text-2xl font-bold">4. Build your own routine</h2><p className="mt-3">Add a step, name it, and pick one of the 74 built-in pictures or use a photo from the camera or gallery. Set an optional quiet timer, then move steps up or down to put them in order.</p></section>
      <section><h2 className="text-2xl font-bold">5. Add more children</h2><p className="mt-3">Each child gets a profile with their own routines. The app is free for {visualScheduleBoard.freeChildren} child profile and {visualScheduleBoard.freeRoutines} routines. A one-time unlock through Amazon adds more children and routines, with no subscription.</p></section>
      <section><h2 className="text-2xl font-bold">6. Back up your routines</h2><p className="mt-3">From the parent area, export everything, including photos, to a single backup file. Import it later on the same tablet or a new one. Uninstalling the app removes the data stored on the tablet, so keep a backup of routines you care about.</p></section>
      <section><h2 className="text-2xl font-bold">Read-aloud and photos</h2><p className="mt-3">Read-aloud uses a voice already installed on the tablet. If no voice is available, the option is hidden. The camera is optional and only used when you take a photo for a step.</p></section>
    </div>
    <p className="mt-12 rounded-2xl bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100 p-6">Questions? Email <a href={`mailto:${visualScheduleBoard.supportEmail}`} className="font-bold underline underline-offset-4">{visualScheduleBoard.supportEmail}</a>. <Link href={dir} className="font-bold underline underline-offset-4">Back to Visual Schedule Board</Link>.</p>
  </article>;
}
