import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { visualScheduleBoard } from '@/lib/visual-schedule-board';

const baseUrl = getSiteUrl();
const url = `${baseUrl}${visualScheduleBoard.path}/visual-schedule-app-for-autism`;
const title = 'Visual Schedule App for Autistic Children on a Fire Tablet';
const description =
  'How a picture-based visual schedule app can support autistic and ADHD children with daily routines and transitions, and how to set one up on an Amazon Fire tablet.';

export const metadata: Metadata = { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: 'article' } };

const faq = [
  {
    question: 'Is Visual Schedule Board a therapy or medical tool?',
    answer: 'No. It is a routine and organization tool. It does not diagnose or treat anything. Many families use it alongside the strategies their child’s teachers or therapists recommend.',
  },
  {
    question: 'Can I use my own photos?',
    answer: `Yes. Choose from ${visualScheduleBoard.pictureCount} built-in pictures or add your own photos of real objects and places, which many children recognize more easily.`,
  },
  {
    question: 'Does it need internet or an account?',
    answer: 'No. Routines and photos stay on the tablet. There are no ads, accounts or analytics. Buying or restoring the one-time unlock uses the Amazon Appstore.',
  },
  {
    question: 'Is it free?',
    answer: `It is free to start with ${visualScheduleBoard.freeChildren} child profile and ${visualScheduleBoard.freeRoutines} routines. A one-time unlock adds more children and routines. There is no subscription.`,
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Article', headline: title, description, url, datePublished: '2026-11-12', dateModified: '2026-11-12', author: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl }, publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl } },
    { '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: visualScheduleBoard.name, item: `${baseUrl}${visualScheduleBoard.path}` },
        { '@type': 'ListItem', position: 3, name: 'Visual schedule app for autism', item: url },
      ],
    },
  ],
};

export default function VisualScheduleAppForAutismPage() {
  const dir = visualScheduleBoard.path;
  return <article className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-zinc-900 dark:text-zinc-100">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <Link href={dir} className="font-semibold text-emerald-800 dark:text-emerald-300 underline underline-offset-4">← Visual Schedule Board</Link>
    <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">A visual schedule app for autistic children</h1>
    <p className="mt-5 text-lg leading-relaxed">Many autistic and ADHD children find the day easier when they can see what comes next. A visual schedule shows each step of a routine as a picture, one at a time. Visual Schedule Board puts that on an Amazon Fire tablet, so the schedule goes wherever the tablet goes.</p>
    <div className="mt-10 space-y-10 text-lg leading-relaxed">
      <section><h2 className="text-2xl font-bold">Why pictures help</h2><p className="mt-3">Spoken instructions disappear as soon as they are said. A picture stays on the screen. Seeing “toothbrush, then pyjamas, then story” lets a child check what is happening without asking again, and makes transitions less of a surprise.</p></section>
      <section><h2 className="text-2xl font-bold">First / Then for hard transitions</h2><p className="mt-3">The First / Then view shows only the current step and the next one, such as “First shoes, then park”. It is a simple way to get through a less-liked task. See the <Link href={`${dir}/first-then-board-guide`} className="underline underline-offset-4">First / Then board guide</Link> for ideas.</p></section>
      <section><h2 className="text-2xl font-bold">Calm by design</h2><ul className="mt-3 list-disc pl-6 space-y-2"><li>Large step cards with one step at a time.</li><li>Optional quiet timers instead of loud alarms.</li><li>Read-aloud of each step, using a voice installed on the tablet.</li><li>No ads, pop-ups or flashing rewards.</li><li>A parent gate, so children cannot change or delete routines.</li></ul></section>
      <section><h2 className="text-2xl font-bold">Set it up in a few minutes</h2><ol className="mt-3 list-decimal pl-6 space-y-2"><li>Install Visual Schedule Board from the Amazon Appstore on the Fire tablet.</li><li>Open the parent area by pressing and holding “Hold for parents”.</li><li>Edit the Morning or Bedtime routine, or build a new one from {visualScheduleBoard.pictureCount} built-in pictures or your own photos.</li><li>Hand the tablet over and tap Start.</li></ol><p className="mt-3">The <Link href={`${dir}/visual-schedule-app-fire-tablet`} className="underline underline-offset-4">Fire tablet setup guide</Link> covers each step in detail.</p></section>
      <section><h2 className="text-2xl font-bold">Common questions</h2><div className="mt-3 divide-y divide-zinc-200 dark:divide-zinc-700">{faq.map((f) => <div key={f.question} className="py-4"><h3 className="font-bold">{f.question}</h3><p className="mt-2">{f.answer}</p></div>)}</div></section>
    </div>
    <p className="mt-12 rounded-2xl bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100 p-6">{visualScheduleBoard.amazonUrl ? <a href={visualScheduleBoard.amazonUrl} className="font-bold underline underline-offset-4">Get Visual Schedule Board on the Amazon Appstore</a> : <Link href={dir} className="font-bold underline underline-offset-4">See Visual Schedule Board</Link>}. Free to start, no subscription.</p>
  </article>;
}
