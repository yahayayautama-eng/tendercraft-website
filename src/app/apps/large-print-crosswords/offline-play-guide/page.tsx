import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { largePrintCrosswords } from '@/lib/large-print-crosswords';

const url = `${getSiteUrl()}/apps/large-print-crosswords/offline-play-guide`;
export const metadata: Metadata = {
  title: 'Using Large Print Crosswords Offline',
  description: 'Learn how the puzzle library, daily rotation, text sizes, display themes, answer help and saved progress work.',
  alternates: { canonical: url },
};

export default function OfflinePlayGuidePage() {
  return <article className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-zinc-900 dark:text-zinc-100">
    <Link href="/apps/large-print-crosswords" className="font-semibold text-blue-700 dark:text-blue-300 underline underline-offset-4">← Large Print Crosswords</Link>
    <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">How offline play works</h1>
    <p className="mt-5 text-lg leading-relaxed">Large Print Crosswords keeps its puzzles on the tablet. You do not need to create an account or maintain an internet connection to play. The release build does not request network access.</p>
    <div className="mt-10 space-y-10 text-lg leading-relaxed">
      <section><h2 className="text-2xl font-bold">Find a puzzle</h2><p className="mt-3">Choose one of 120 library crosswords across Easy, Medium and Hard, or open the daily selection. The daily view draws from 30 separate puzzles and repeats after 30 days. There are 150 puzzles total, and the app does not download new puzzles.</p></section>
      <section><h2 className="text-2xl font-bold">Set up the display</h2><p className="mt-3">Open Settings to choose Large, Larger or Largest text. Switch between Warm Parchment and Deep Charcoal themes. The screen below shows those controls in the review build.</p><Image src="/apps/large-print-crosswords/settings.png" width={2560} height={1506} alt="Large Print Crosswords settings screen showing text size and colour theme choices" sizes="(max-width: 896px) 100vw, 896px" className="mt-4 w-full h-auto rounded-2xl border border-zinc-300 dark:border-zinc-700" /></section>
      <section><h2 className="text-2xl font-bold">Play at your pace</h2><p className="mt-3">Tap an answer and type with the on-screen keys. Use Check to inspect an answer, or Reveal letter and Reveal word if you want a hand. There is no countdown or penalty for using help.</p></section>
      <section><h2 className="text-2xl font-bold">Come back later</h2><p className="mt-3">Progress and display choices are saved locally on your tablet. Clearing app storage or uninstalling deletes that saved state. There is no account sync or cloud backup.</p></section>
      <section><h2 className="text-2xl font-bold">Device availability</h2><p className="mt-3">{largePrintCrosswords.availability === 'published' ? 'Check the Amazon listing for currently supported Fire tablets.' : 'The app is being prepared for compatible Fire tablets.'} A Fire tablet and a Kindle e-reader are different devices. Contact us if you are unsure about a particular tablet.</p></section>
    </div>
    <p className="mt-12 rounded-2xl bg-amber-50 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100 p-6"><Link href="/apps/large-print-crosswords" className="font-bold underline underline-offset-4">View the app preview and ask about availability</Link>.</p>
  </article>;
}
