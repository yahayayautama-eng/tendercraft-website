import { RecipeBoxGuide, guideMetadata } from '@/components/RecipeBoxGuide';
import { recipeBox } from '@/lib/recipe-box';

const slug = 'recipe-box-vs-paprika-pinterest-notes';
const title = 'Recipe Box vs Paprika, Pinterest and a Notes App';
const description =
  'An honest comparison of Recipe Box, Paprika, Pinterest boards and a notes app for keeping recipes on a Fire tablet: price, offline use, cooking tools.';

export const metadata = guideMetadata(slug, title, description);

const faq = [
  {
    question: 'Is Recipe Box a Paprika alternative for Fire tablets?',
    answer: 'It covers the same core job: save recipes from websites, scale them and make a grocery list. Recipe Box is built for Fire tablets and sold on the Amazon Appstore. Check where Paprika is sold and its current price before you choose.',
  },
  {
    question: 'Can Pinterest replace a recipe app?',
    answer: 'Pinterest is good for finding ideas. A pin is a link back to the original page, so you still need a connection and still see the website, and Pinterest needs an account.',
  },
  {
    question: 'Is a notes app enough?',
    answer: 'For a handful of recipes, yes. It is free and offline, but you type or paste each recipe by hand and there are no timers, scaling or grocery list.',
  },
];

const rows = [
  ['Built for Fire tablets', 'Yes, from the Amazon Appstore', 'Check where it is sold', 'App, or Silk browser', 'Usually included'],
  ['Saves the recipe, not the page', 'Yes, from a link or by hand', 'Yes, from websites', 'No, it saves a link', 'Only what you paste'],
  ['Works offline', 'Yes', 'Yes, once saved', 'No', 'Yes'],
  ['Cooking view and timers', 'Yes, one big step at a time', 'Yes', 'No', 'No'],
  ['Scale ingredients', 'Half, double, triple', 'Yes', 'No', 'By hand'],
  ['Grocery list', 'Yes, one tap', 'Yes', 'No', 'By hand'],
  ['Account needed', 'No', 'No', 'Yes', 'Depends on the app'],
  ['Ads', 'None', 'None', 'Yes', 'Depends on the app'],
  ['Price', `Free for ${recipeBox.freeRecipeLimit} recipes, then one purchase`, 'Paid app, one purchase per platform', 'Free', 'Free'],
];

export default function ComparisonGuide() {
  return (
    <RecipeBoxGuide
      slug={slug}
      title={title}
      headline="Recipe Box vs Paprika, Pinterest and a notes app"
      description={description}
      intro="There are four common ways to keep recipes on a tablet. We make Recipe Box, so we are not neutral, but here is a straight comparison of what each one is good at, including where Recipe Box falls short."
      faq={faq}
    >
      <section>
        <h2 className="text-2xl font-bold">At a glance</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-base border-collapse">
            <thead>
              <tr className="border-b border-[#e6dccf] dark:border-white/10">
                <th scope="col" className="py-3 pr-4"><span className="sr-only">Feature</span></th>
                <th scope="col" className="py-3 pr-4">Recipe Box</th>
                <th scope="col" className="py-3 pr-4">Paprika</th>
                <th scope="col" className="py-3 pr-4">Pinterest</th>
                <th scope="col" className="py-3">Notes app</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dccf] dark:divide-white/10 align-top">
              {rows.map((r) => (
                <tr key={r[0]}>
                  <th scope="row" className="py-3 pr-4 font-semibold">{r[0]}</th>
                  <td className="py-3 pr-4">{r[1]}</td>
                  <td className="py-3 pr-4">{r[2]}</td>
                  <td className="py-3 pr-4">{r[3]}</td>
                  <td className="py-3">{r[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">Paprika and Pinterest details are from their general public descriptions and can change. Check their current listings before you decide.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Recipe Box</h2>
        <p className="mt-3">Best if you cook from a Fire tablet and want something simple that works without Wi-Fi, with no account and no ads. Weaker if you want your recipes on a phone or a computer too, since Recipe Box stores them on the tablet and moves them by backup file, not live sync. Some websites also will not import and need typing in by hand.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Paprika</h2>
        <p className="mt-3">A well-known recipe manager with more features than Recipe Box and versions for several platforms, each bought separately. If you already use it on a phone or computer, it may suit you better. Whether it is available for your Fire tablet depends on where it is sold, so check before you buy.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Pinterest</h2>
        <p className="mt-3">Great for finding ideas and collecting them on boards. It is not a place to keep a recipe you rely on: pins point back to the original page, so you need a connection, the original site can change or disappear, and you need an account.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold">A notes app</h2>
        <p className="mt-3">The simplest option and perfectly fine for a few family favourites. It stops working well once you have dozens of recipes, because there is no import, search by ingredient, timer or grocery list.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Which one should you pick?</h2>
        <ul className="mt-3 list-disc pl-6 space-y-2">
          <li>Cooking mostly from a Fire tablet, offline, with no account: Recipe Box.</li>
          <li>Recipes on several devices with live syncing: look at Paprika or similar and check its platforms.</li>
          <li>Looking for ideas: Pinterest, then save the ones you cook.</li>
          <li>Under ten recipes and no wish to install anything: a notes app.</li>
        </ul>
      </section>
    </RecipeBoxGuide>
  );
}
