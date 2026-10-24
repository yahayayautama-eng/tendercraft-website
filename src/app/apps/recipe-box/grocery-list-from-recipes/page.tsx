import Image from 'next/image';
import { RecipeBoxGuide, guideMetadata } from '@/components/RecipeBoxGuide';

const slug = 'grocery-list-from-recipes';
const title = 'Make a Grocery List from Recipes on a Fire Tablet';
const description =
  'Turn the ingredients of any saved recipe into a shopping list in one tap, scale the amounts first, and check items off in the store. Works offline on a Fire tablet.';

export const metadata = guideMetadata(slug, title, description);

const faq = [
  {
    question: 'Does the grocery list use the scaled amounts?',
    answer: 'Yes. If you set a recipe to half, double or triple before adding it, the scaled ingredient lines are what go on the list.',
  },
  {
    question: 'What if an ingredient is already on my list?',
    answer: 'Recipe Box skips an item when the same line is already on the list and not yet checked, and tells you how many items were added. Different wording or amounts are added as separate lines.',
  },
  {
    question: 'Can I add things that are not in a recipe?',
    answer: 'Yes. Type any item into the grocery list and add it.',
  },
];

export default function GroceryListGuide() {
  return (
    <RecipeBoxGuide
      slug={slug}
      title={title}
      headline="Turn recipes into a grocery list on a Fire tablet"
      description={description}
      intro="Copying ingredients into a shopping list by hand is the boring part of cooking. With Recipe Box you can add a whole recipe to a list in one tap, and carry the same tablet round the store."
      faq={faq}
    >
      <section>
        <h2 className="text-2xl font-bold">1. Pick the amount</h2>
        <p className="mt-3">Open a recipe and choose half, normal, double or triple. The ingredient amounts update on screen.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold">2. Add it to the grocery list</h2>
        <p className="mt-3">Tap Add to grocery list. The scaled ingredient lines are added, and the app tells you how many were new. Do this for every recipe you plan to cook this week.</p>
        <Image src="/apps/recipe-box/grocery.png" width={2512} height={1488} alt="Recipe Box grocery list with checked items" sizes="(max-width: 896px) 100vw, 896px" className="mt-5 w-full h-auto rounded-2xl border border-[#e6dccf]" />
      </section>
      <section>
        <h2 className="text-2xl font-bold">3. Check items off while you shop</h2>
        <p className="mt-3">Tap an item to check it off. The list works offline, so a weak signal in the store does not matter. When you are done, tap Clear checked to remove the ticked items and keep the rest.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold">Tip: tidy the list before you go</h2>
        <p className="mt-3">Amounts are not added together. If two recipes both need onions, you will see two lines, so a quick glance before you leave helps you buy the right quantity.</p>
      </section>
    </RecipeBoxGuide>
  );
}
