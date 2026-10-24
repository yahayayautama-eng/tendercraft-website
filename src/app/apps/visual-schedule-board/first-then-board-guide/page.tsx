import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { visualScheduleBoard } from '@/lib/visual-schedule-board';

const baseUrl = getSiteUrl();
const url = `${baseUrl}${visualScheduleBoard.path}/first-then-board-guide`;
const title = 'How to Use a First / Then Board at Home or in Class';
const description = 'A practical guide to First / Then boards: what they are, how to set one up in four steps, examples for home and the classroom, and common mistakes to avoid.';

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

export default function FirstThenBoardGuidePage() {
  return <article className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-zinc-900 dark:text-zinc-100">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <Link href={visualScheduleBoard.path} className="font-semibold text-emerald-800 dark:text-emerald-300 underline underline-offset-4">← Visual Schedule Board</Link>
    <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">How to use a First / Then board</h1>
    <p className="mt-5 text-lg leading-relaxed">A First / Then board shows two pictures side by side: what to do first, and what comes then. It is the smallest visual schedule there is, and the easiest one to start with. This guide explains how to set one up and use it at home or in a classroom.</p>
    <div className="mt-8 space-y-10 text-lg leading-relaxed">
      <section><h2 className="text-2xl font-bold">What a First / Then board is</h2><p className="mt-3">The board has two spaces. The left one, First, shows the task. The right one, Then, shows what happens when the task is done, such as a snack, a story or outdoor play. Because only two things are on show, a child sees what is expected now and what is coming next without a long list.</p></section>

      <section><h2 className="text-2xl font-bold">Set one up in four steps</h2><ol className="mt-3 list-decimal pl-6 space-y-3"><li><strong>Pick one task.</strong> Choose something short and specific, such as brush teeth or put on shoes.</li><li><strong>Pick a Then that the child enjoys.</strong> Keep it realistic and something you can give straight away.</li><li><strong>Show the two pictures.</strong> Point to First, then to Then. Say it in a few words: first shoes, then park.</li><li><strong>Follow through.</strong> When the task is done, move to Then straight away. Reliable follow-through is what makes the board work.</li></ol></section>

      <section><h2 className="text-2xl font-bold">Examples</h2><ul className="mt-3 list-disc pl-6 space-y-2"><li><strong>At home:</strong> First get dressed, then breakfast. First bath, then a book.</li><li><strong>In class:</strong> First put away the toys, then circle time. First worksheet, then free choice.</li><li><strong>Out and about:</strong> First shoes and coat, then the park.</li></ul></section>

      <section><h2 className="text-2xl font-bold">Using it in Visual Schedule Board</h2><p className="mt-3">On a Fire tablet, open a routine and switch to First / Then view. The current step appears large on the left, and the next step on the right. Tap the finished step to mark it done, and the board moves on. Tap it again if it was marked by mistake.</p><Image src={`${visualScheduleBoard.path}/first-then.webp`} width={1600} height={1000} alt="First / Then view in Visual Schedule Board showing Brush teeth as the first step and Get dressed as the step that comes then" sizes="(max-width: 896px) 100vw, 896px" className="mt-4 w-full h-auto rounded-2xl border border-zinc-300 dark:border-zinc-700" /><p className="mt-3">You can build a routine in minutes from 74 built-in pictures or your own photos. See <Link href={visualScheduleBoard.path} className="font-semibold underline underline-offset-4">Visual Schedule Board</Link> for the full list of features.</p></section>

      <section><h2 className="text-2xl font-bold">Common mistakes</h2><ul className="mt-3 list-disc pl-6 space-y-2"><li>Putting too many steps on the board. Start with two.</li><li>Choosing a Then that you cannot deliver. Only promise what you will give.</li><li>Changing the order mid-task. Keep it predictable.</li><li>Using it as a punishment. A board is a plan, not a threat.</li><li>Keeping it forever. When a task becomes easy, drop the board for that task or move to a longer routine.</li></ul></section>

      <section><h2 className="text-2xl font-bold">When to move to a longer routine</h2><p className="mt-3">Once First / Then is going well, try three or four steps in a row, such as a morning routine. You can print a free <Link href={`${visualScheduleBoard.path}/printable-morning-routine-chart`} className="font-semibold underline underline-offset-4">morning routine chart</Link> to start on paper.</p></section>
    </div>
    <p className="mt-12 rounded-2xl bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100 p-6">Visual Schedule Board is a routine and organization tool. It is not a medical or therapy product. <Link href={visualScheduleBoard.path} className="font-bold underline underline-offset-4">See the app</Link>.</p>
  </article>;
}
