import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { largePrintCrosswords } from '@/lib/large-print-crosswords';

const url = `${getSiteUrl()}/apps/large-print-crosswords/choosing-a-readable-crossword-app`;
export const metadata: Metadata = {
  title: 'How to Choose a Readable Crossword App',
  description: 'Practical ways to judge crossword text, controls, contrast, help and device compatibility before choosing an app.',
  alternates: { canonical: url },
};

export default function ChoosingCrosswordAppPage() {
  return <article className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-zinc-900 dark:text-zinc-100">
    <Link href="/apps/large-print-crosswords" className="font-semibold text-blue-700 dark:text-blue-300 underline underline-offset-4">← Large Print Crosswords</Link>
    <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">How to choose a crossword app you can read comfortably</h1>
    <p className="mt-5 text-lg leading-relaxed">“Large print” means different things across apps. Before paying or installing, look closely at the clue, grid, keyboard and navigation screens. A big title alone does not tell you how readable the puzzle will feel.</p>
    <div className="mt-10 space-y-10 text-lg leading-relaxed">
      <section><h2 className="text-2xl font-bold">Inspect a real puzzle screen</h2><p className="mt-3">Zoom in on an actual screenshot. Can you read the current clue while seeing the answer cells and keys? Check the smallest labels too: settings, back buttons and help controls. Promotional art is useful for mood, but it does not show the playing experience.</p></section>
      <figure><Image src="/apps/large-print-crosswords/play-landscape.png" width={2560} height={1506} alt="Actual Large Print Crosswords screen showing the clue, answer cells, keyboard and grid" sizes="(max-width: 896px) 100vw, 896px" className="w-full h-auto rounded-2xl border border-zinc-300 dark:border-zinc-700" /><figcaption className="mt-2 text-base text-zinc-600 dark:text-zinc-400">Actual review-build gameplay; open the <a className="underline" href="/apps/large-print-crosswords/play-landscape.png">full-size screenshot</a> to inspect it closely.</figcaption></figure>
      <section><h2 className="text-2xl font-bold">Look for useful display choices</h2><p className="mt-3">Text size and colour themes can help you find a comfortable setup. Check whether the clue, buttons and on-screen keyboard change together. Large Print Crosswords offers three text sizes and Warm Parchment and Deep Charcoal themes; judge them from the screenshots before assuming they suit you.</p></section>
      <section><h2 className="text-2xl font-bold">Check the kind of puzzles and help offered</h2><p className="mt-3">Some apps have full newspaper-style grids; others use smaller, quicker crosswords. Large Print Crosswords uses compact grids and includes 150 puzzles in total: 120 in the library and 30 in a repeating daily rotation. It lets you check answers or reveal a letter or word, and has no timer.</p></section>
      <section><h2 className="text-2xl font-bold">Confirm your device and the purchase terms</h2><p className="mt-3">Fire tablets run apps; Kindle e-readers such as Paperwhite are different devices. Check the store’s device compatibility list and current price before buying. Also check whether the puzzle count includes recurring selections, and whether an app has ads, subscriptions or in-app purchases.</p></section>
    </div>
    <p className="mt-12 rounded-2xl bg-amber-50 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100 p-6">{largePrintCrosswords.availability === 'available' ? 'Check the current store availability for your device.' : 'Our Fire-tablet release is still being prepared.'} <Link href="/apps/large-print-crosswords" className="font-bold underline underline-offset-4">See the app screenshots and current status</Link>.</p>
  </article>;
}
