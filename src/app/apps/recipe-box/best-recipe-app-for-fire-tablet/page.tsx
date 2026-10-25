import Image from 'next/image';
import { RecipeBoxGuide, guideMetadata } from '@/components/RecipeBoxGuide';

const slug = 'best-recipe-app-for-fire-tablet';
const title = 'Best Recipe App for a Fire Tablet';
const description =
  'What to look for in a Fire tablet recipe app: Amazon Appstore, recipe import, screen kept on, offline use. A checklist and the options compared.';

export const metadata = guideMetadata(slug, title, description);

const faq = [
  {
    question: 'Is there a free recipe app for a Fire tablet?',
    answer: 'Yes. Recipe Box is free for up to 20 recipes, then a single one-time purchase removes the limit. A browser bookmark folder or a notes app is also free, but neither imports recipes or has a cooking view.',
  },
  {
    question: 'Can I use Google Play recipe apps on a Fire tablet?',
    answer: 'Not by default. Fire tablets use the Amazon Appstore, so choose an app that is listed there.',
  },
  {
    question: 'Does a recipe app need Wi-Fi?',
    answer: 'It does not have to. Recipe Box stores recipes on the tablet and only needs a connection when you import a recipe from a website.',
  },
];

export default function BestRecipeAppGuide() {
  return (
    <RecipeBoxGuide
      slug={slug}
      title={title}
      headline="The best recipe app for a Fire tablet"
      description={description}
      intro="A Fire tablet is a good kitchen screen: it is cheap, light and easy to prop up. The right app turns it into a recipe book. Here is what to check before you install one. We make Recipe Box, so read our pick with that in mind, and use the checklist to judge any app."
      faq={faq}
    >
      <section>
        <h2 className="text-2xl font-bold">A checklist for a Fire tablet recipe app</h2>
        <ul className="mt-3 list-disc pl-6 space-y-2">
          <li><strong>It is in the Amazon Appstore.</strong> Fire tablets do not include Google Play, so the app has to be listed in the Appstore.</li>
          <li><strong>It saves a recipe, not a web page.</strong> Importing the title, ingredients, steps and photo means you can read it later without the ads and pop-ups.</li>
          <li><strong>It is readable from across the counter.</strong> Look for large text and one step at a time.</li>
          <li><strong>The screen stays on while you cook.</strong> And goes back to sleep afterwards.</li>
          <li><strong>Timers that survive switching apps.</strong> A timer that stops when you leave the screen is not much use.</li>
          <li><strong>It works offline.</strong> Kitchen Wi-Fi is often weak.</li>
          <li><strong>The price is clear.</strong> Check for ads, accounts and subscriptions before you commit your recipes to an app.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Your options</h2>
        <ul className="mt-3 list-disc pl-6 space-y-3">
          <li><strong>Browser bookmarks in Silk.</strong> Free and instant. But pages fill with ads, links break, and you need a connection.</li>
          <li><strong>A notes app.</strong> Free, and it works offline. You have to type or paste every recipe yourself, and there is no timer or grocery list.</li>
          <li><strong>A recipe app from the Appstore.</strong> Compare the checklist above, and read the reviews for ads, sign-in requirements and subscriptions.</li>
          <li><strong>Recipe Box.</strong> Built for Fire tablets: paste a link to import a recipe, Cook Mode shows one large step at a time with the screen kept on, timers appear when a step mentions a time, and a recipe can be added to a grocery list in one tap. It works offline, with no ads and no account.</li>
        </ul>
        <Image src="/apps/recipe-box/library.png" width={2512} height={1488} alt="Recipe Box library of saved recipes on a Fire tablet" sizes="(max-width: 896px) 100vw, 896px" className="mt-5 w-full h-auto rounded-2xl border border-[#e6dccf]" />
      </section>

      <section>
        <h2 className="text-2xl font-bold">What Recipe Box does not do</h2>
        <p className="mt-3">Some websites do not publish their recipe in a standard format, so a link import will not work for every site. You can type a recipe in by hand instead. Recipe Box is made for Fire tablets and stores recipes on the device, so use Save backup now and then, especially before you reset or replace a tablet.</p>
      </section>
    </RecipeBoxGuide>
  );
}
