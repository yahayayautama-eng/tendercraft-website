import Image from 'next/image';
import { RecipeBoxGuide, guideMetadata } from '@/components/RecipeBoxGuide';

const slug = 'offline-recipe-app';
const title = 'Offline Recipe App for a Fire Tablet';
const description =
  'Cook without Wi-Fi. How an offline recipe app works on a Fire tablet, what still needs a connection, and how to back up your recipes.';

export const metadata = guideMetadata(slug, title, description);

const faq = [
  {
    question: 'Does Recipe Box work without internet?',
    answer: 'Yes. Saved recipes, photos, Cook Mode, timers and the grocery list all work offline. Only importing a recipe from a website needs a connection.',
  },
  {
    question: 'Where are my recipes stored?',
    answer: 'On your tablet. There is no account and nothing is sent to a server, so the recipes are not available on other devices unless you move a backup file.',
  },
  {
    question: 'What happens if I reset my tablet?',
    answer: 'Local data is removed along with the app. Use Save backup in Recipe Box to write all recipes to a file, keep it somewhere safe, then restore it on the same or another tablet.',
  },
];

export default function OfflineRecipeAppGuide() {
  return (
    <RecipeBoxGuide
      slug={slug}
      title={title}
      headline="An offline recipe app that works without Wi-Fi"
      description={description}
      intro="Kitchens are often the worst room for Wi-Fi, and nobody wants a recipe page to reload while their hands are covered in flour. A recipe app that keeps everything on the tablet avoids that. Here is how it works in Recipe Box."
      faq={faq}
    >
      <section>
        <h2 className="text-2xl font-bold">What works offline</h2>
        <ul className="mt-3 list-disc pl-6 space-y-2">
          <li>Browsing and searching your saved recipes by name, ingredient or tag.</li>
          <li>Cook Mode, with one large step at a time and the screen kept on.</li>
          <li>Timers, which keep running and ring even if you switch apps.</li>
          <li>Scaling ingredients to half, double or triple.</li>
          <li>The grocery list.</li>
          <li>Your own recipe photos.</li>
        </ul>
        <Image src="/apps/recipe-box/recipe.png" width={2512} height={1488} alt="A saved recipe open in Recipe Box on a Fire tablet" sizes="(max-width: 896px) 100vw, 896px" className="mt-5 w-full h-auto rounded-2xl border border-[#e6dccf]" />
      </section>

      <section>
        <h2 className="text-2xl font-bold">What needs a connection</h2>
        <p className="mt-3">Only one thing: importing a recipe from a website. Do that on home Wi-Fi, and the recipe is on your tablet from then on.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Privacy comes with it</h2>
        <p className="mt-3">Because recipes stay on the device, there is no account to create, no cloud service and no analytics. See the <a href="/recipe-box/privacy.html" className="underline underline-offset-4">privacy policy</a> for details.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Back up your recipes</h2>
        <p className="mt-3">The trade-off of keeping everything on the tablet is that a reset or a lost device takes the recipes with it. In the app, choose Save backup to write every recipe to a single file, keep a copy somewhere safe, and use Restore on the same or a new tablet.</p>
      </section>
    </RecipeBoxGuide>
  );
}
