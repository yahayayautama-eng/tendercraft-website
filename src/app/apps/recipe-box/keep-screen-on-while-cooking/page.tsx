import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { recipeBox } from '@/lib/recipe-box';

const url = `${getSiteUrl()}${recipeBox.path}/keep-screen-on-while-cooking`;
export const metadata: Metadata = {
  title: 'How to Keep a Fire Tablet Screen On While Cooking',
  description: 'Stop your Fire tablet going dark in the middle of a recipe. Two options: change the screen timeout, or use a recipe app that keeps the screen on only while you cook.',
  alternates: { canonical: url },
};

export default function KeepScreenOnGuide() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-[#2a211c] dark:text-[#f4ede4]">
      <Link href="/apps/recipe-box" className="font-semibold text-[#a63a23] dark:text-[#e58a6f] underline underline-offset-4">← Recipe Box for Fire tablets</Link>
      <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">How to keep a Fire tablet screen on while cooking</h1>
      <p className="mt-5 text-lg leading-relaxed">Nothing is more annoying than a screen that locks while your hands are covered in flour. You have two options.</p>
      <div className="mt-10 space-y-10 text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold">Option 1: Lengthen the screen timeout</h2>
          <p className="mt-3">Open Settings, then Display, then Screen Timeout, and pick a longer time. This works for every app, but it also keeps the screen on when you are not cooking, which uses more battery. Remember to change it back.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Option 2: Use Cook Mode in Recipe Box</h2>
          <p className="mt-3">Recipe Box keeps the screen on only while Cook Mode is open, then lets it sleep normally again. Cook Mode also shows one large step at a time, so you can read it from across the counter, and offers a one-tap timer when a step mentions a time.</p>
          <Image src="/apps/recipe-box/cook-mode.png" width={2512} height={1488} alt="Recipe Box Cook Mode with a large step and a timer button" sizes="(max-width: 896px) 100vw, 896px" className="mt-4 w-full h-auto rounded-2xl border border-[#e6dccf]" />
        </section>
        <section>
          <h2 className="text-2xl font-bold">Tip: timers that survive switching apps</h2>
          <p className="mt-3">Recipe Box timers keep running if you leave Cook Mode or open another app, and ring with a notification when they finish.</p>
        </section>
      </div>
      <p className="mt-12 rounded-2xl bg-[#faf6f0] dark:bg-[#28241f] p-6"><Link href="/apps/recipe-box" className="font-bold underline underline-offset-4">See Recipe Box for Fire tablets</Link></p>
    </article>
  );
}
