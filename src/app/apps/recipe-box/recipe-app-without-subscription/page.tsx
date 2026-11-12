import { RecipeBoxGuide, guideMetadata } from '@/components/RecipeBoxGuide';
import { recipeBox } from '@/lib/recipe-box';

const slug = 'recipe-app-without-subscription';
const title = 'Recipe App Without a Subscription for Fire Tablets';
const description =
  'A recipe organizer for Amazon Fire tablets with no monthly fee: free for up to 20 recipes, then one purchase. No account, no ads, works offline.';

export const metadata = guideMetadata(slug, title, description);

const faq = [
  {
    question: 'How much does Recipe Box cost?',
    answer: `It is free for up to ${recipeBox.freeRecipeLimit} recipes. A single one-time purchase removes the limit. There is no monthly or yearly subscription.`,
  },
  {
    question: 'Do I need an account?',
    answer: 'No. There is no sign-up and no login. Recipes are stored on your tablet, and the one-time unlock is handled by your Amazon account.',
  },
  {
    question: 'What if I get a new tablet?',
    answer: 'Use Save backup to write all recipes to one file, then Restore on the new tablet. The unlock can be restored from your Amazon account.',
  },
];

export default function RecipeAppWithoutSubscriptionGuide() {
  return (
    <RecipeBoxGuide
      slug={slug}
      title={title}
      headline="A recipe app without a subscription"
      description={description}
      intro="Many recipe apps now charge every month for features that used to be a one-off purchase. If you only want a dependable place to keep your recipes on a Fire tablet, a subscription is hard to justify. Here is how Recipe Box handles it."
      faq={faq}
    >
      <section>
        <h2 className="text-2xl font-bold">Free to start, pay once if you need more</h2>
        <p className="mt-3">Recipe Box is free for up to {recipeBox.freeRecipeLimit} recipes, with every feature included. If your collection grows past that, one purchase through the Amazon Appstore removes the limit for good. Nothing renews, and nothing stops working if you skip a month.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Everything is included</h2>
        <ul className="mt-3 list-disc pl-6 space-y-2">
          <li>Save recipes from most cooking websites with a pasted link.</li>
          <li>Cook Mode: one large step at a time, with the screen kept on.</li>
          <li>One-tap timers found in the recipe steps, which keep ringing when you switch apps.</li>
          <li>Scale ingredients to half, double or triple.</li>
          <li>A grocery list from any recipe.</li>
          <li>Backup and restore to a single file.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold">No account, no ads, no cloud</h2>
        <p className="mt-3">Subscriptions usually come with an account and a server holding your data. Recipe Box keeps recipes on the tablet instead, with no ads or analytics, and works offline. See the <a href={recipeBox.privacyUrl} className="underline underline-offset-4">privacy policy</a> for details.</p>
      </section>
    </RecipeBoxGuide>
  );
}
