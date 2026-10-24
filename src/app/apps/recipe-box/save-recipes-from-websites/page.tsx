import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { recipeBox } from '@/lib/recipe-box';

const url = `${getSiteUrl()}${recipeBox.path}/save-recipes-from-websites`;
export const metadata: Metadata = {
  title: 'How to Save Recipes from Websites on a Fire Tablet',
  description: 'Keep recipes from cooking websites on your Fire tablet without bookmarks or screenshots. Paste a link into Recipe Box and the ingredients, steps and photo are saved for offline use.',
  alternates: { canonical: url },
};

export default function SaveRecipesGuide() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-[#2a211c] dark:text-[#f4ede4]">
      <Link href="/apps/recipe-box" className="font-semibold text-[#a63a23] dark:text-[#e58a6f] underline underline-offset-4">← Recipe Box for Fire tablets</Link>
      <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">How to save recipes from websites on a Fire tablet</h1>
      <p className="mt-5 text-lg leading-relaxed">Bookmarks break, pages fill with ads, and screenshots cut off the steps. The simplest fix is to keep the recipe itself, not the page. Here is how to do that with Recipe Box.</p>
      <div className="mt-10 space-y-10 text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold">1. Copy the recipe link</h2>
          <p className="mt-3">Open the recipe in Silk or any browser, then copy the address from the address bar.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">2. Paste it into Recipe Box</h2>
          <p className="mt-3">In Recipe Box, tap New recipe, paste the link into Import from a recipe website, and tap Import. Most cooking websites publish recipe details in a standard format, so the title, ingredients, steps and photo fill in automatically.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">3. Check it and save</h2>
          <p className="mt-3">Fix anything you like, add tags such as dinner or baking, and tap Save. The recipe now lives on your tablet and works without internet.</p>
          <Image src="/apps/recipe-box/recipe.png" width={2512} height={1488} alt="A saved Banana Bread recipe in Recipe Box" sizes="(max-width: 896px) 100vw, 896px" className="mt-4 w-full h-auto rounded-2xl border border-[#e6dccf]" />
        </section>
        <section>
          <h2 className="text-2xl font-bold">If a website will not import</h2>
          <p className="mt-3">A few sites block apps or do not include recipe details in their page. Type the recipe in by hand instead: one ingredient per line and one step per line. Write times like &quot;bake 20 minutes&quot; and Cook Mode will offer a timer.</p>
        </section>
      </div>
      <p className="mt-12 rounded-2xl bg-[#faf6f0] dark:bg-[#28241f] p-6"><Link href="/apps/recipe-box" className="font-bold underline underline-offset-4">See Recipe Box for Fire tablets</Link></p>
    </article>
  );
}
