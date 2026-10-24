import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { recipeBox, recipeBoxContactUrl, recipeBoxFaq } from '@/lib/recipe-box';
import { getSiteUrl } from '@/lib/site';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}${recipeBox.path}`;
const description =
  'Recipe Box for Fire tablets keeps every recipe in one place. Import from cooking websites, cook one big step at a time with one-tap timers, and build a grocery list. Works offline, no ads.';

export const metadata: Metadata = {
  title: 'Recipe Box for Fire Tablets: Offline Recipe Organizer',
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Recipe Box for Fire Tablets | Tendercraft',
    description,
    url: pageUrl,
    type: 'website',
    images: [{ url: '/apps/recipe-box/cook-mode.png', width: 2512, height: 1488, alt: 'Recipe Box Cook Mode on a Fire tablet' }],
  },
  twitter: { card: 'summary_large_image', title: 'Recipe Box for Fire Tablets', description, images: ['/apps/recipe-box/cook-mode.png'] },
};

const screens = [
  { src: 'library.png', alt: 'Recipe library with photo cards, search and tag filters', caption: 'Every recipe in one place, with search and tags.' },
  { src: 'recipe.png', alt: 'Banana Bread recipe with ingredients, scaling buttons and method', caption: 'Scale ingredients to half, double or triple.' },
  { src: 'cook-mode.png', alt: 'Cook Mode showing one large step and a start timer button', caption: 'Cook Mode: one big step at a time, with one-tap timers.' },
  { src: 'grocery.png', alt: 'Grocery list with checked and unchecked items', caption: 'Add a recipe to your grocery list in one tap.' },
];

const features: [string, string][] = [
  ['Save recipes from the web', 'Paste a link from most cooking websites. Title, ingredients, steps and photo are filled in for you.'],
  ['Cook one step at a time', 'Large text you can read from across the counter. The screen stays on while you cook.'],
  ['Timers from the recipe', '"Simmer 20 minutes" becomes a one-tap timer that keeps running and rings even when you switch apps.'],
  ['Scale any recipe', 'Show ingredients for half, double or triple the amount.'],
  ['One-tap grocery list', "Add a recipe's ingredients to your list and check them off as you shop."],
  ['Private and offline', 'No account, no ads, no analytics. Back up to a file whenever you like.'],
];

export default function RecipeBoxPage() {
  const isAvailable = recipeBox.availability === 'available' && Boolean(recipeBox.amazonUrl);
  const primaryUrl = isAvailable ? recipeBox.amazonUrl! : recipeBoxContactUrl('Recipe Box launch');
  const primaryLabel = isAvailable ? 'Get it on the Amazon Appstore' : 'Ask about availability';
  const app = {
    '@type': 'SoftwareApplication',
    name: recipeBox.name,
    alternateName: recipeBox.fullName,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Fire OS',
    description,
    image: `${baseUrl}/apps/recipe-box/icon-512.png`,
    screenshot: screens.map((s) => `${baseUrl}/apps/recipe-box/${s.src}`),
    publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
    ...(isAvailable
      ? { url: recipeBox.amazonUrl, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }
      : {}),
  };
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', name: recipeBox.fullName, url: pageUrl, description, about: app },
      {
        '@type': 'FAQPage',
        mainEntity: recipeBoxFaq.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
      },
    ],
  };

  return (
    <article className="pb-20 text-[#2a211c] dark:text-[#f4ede4]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <div className="bg-[#faf6f0] dark:bg-[#1d1a17] border-b border-[#e6dccf] dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <Image src="/apps/recipe-box/icon-512.png" width={72} height={72} alt="" className="rounded-2xl" />
            <p className="mt-6 text-sm font-bold tracking-widest uppercase text-[#a63a23] dark:text-[#e58a6f]">An offline recipe app by Tendercraft</p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">Recipe Box for Fire tablets</h1>
            <p className="mt-5 text-lg sm:text-xl leading-relaxed max-w-xl">Keep every recipe in one box and cook one calm step at a time.</p>
            <p className="mt-4 text-base leading-relaxed max-w-xl">Import recipes from cooking websites, follow big step-by-step Cook Mode with one-tap timers, and turn any recipe into a grocery list. Free for {recipeBox.freeRecipeLimit} recipes.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={primaryUrl} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#c84b31] px-6 py-3 font-bold text-white hover:bg-[#a63a23] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#c84b31]">{primaryLabel}</a>
              <span className="font-semibold">{isAvailable ? 'Check the Appstore for compatible Fire tablets.' : 'Coming soon to the Amazon Appstore'}</span>
            </div>
          </div>
          <Image src="/apps/recipe-box/cook-mode.png" width={2512} height={1488} alt="Recipe Box Cook Mode showing a large cooking step and a start timer button" priority sizes="(max-width: 1024px) 100vw, 55vw" className="w-full h-auto rounded-2xl border border-[#e6dccf] shadow-xl" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <section className="py-16 sm:py-20" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold">What Recipe Box does</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {features.map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-[#e6dccf] dark:border-white/15 bg-white dark:bg-[#28241f] p-6">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-16" aria-labelledby="screens-heading">
          <h2 id="screens-heading" className="text-3xl sm:text-4xl font-bold">See the actual app</h2>
          <p className="mt-3 max-w-2xl leading-relaxed">Screens captured from the app on a tablet, with sample recipes.</p>
          <div className="mt-8 grid md:grid-cols-2 gap-7">
            {screens.map((s) => (
              <figure key={s.src} className="rounded-2xl overflow-hidden border border-[#e6dccf] dark:border-white/15 bg-white dark:bg-[#28241f]">
                <Image src={`/apps/recipe-box/${s.src}`} width={2512} height={1488} alt={s.alt} sizes="(max-width: 768px) 100vw, 50vw" className="w-full h-auto" />
                <figcaption className="p-4 font-medium">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 max-w-4xl">
            <h3 className="text-2xl font-bold">A 22-second tour</h3>
            <video className="mt-4 w-full rounded-2xl border border-[#e6dccf]" controls preload="none" poster="/apps/recipe-box/library.png" playsInline aria-label="Recipe Box 22-second app tour">
              <source src="/apps/recipe-box/promo-22s.mp4" type="video/mp4" />
              Your browser cannot play this video. The screenshots above show the app.
            </video>
          </div>
        </section>

        <section className="pb-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold">Questions</h2>
          <div className="mt-6 divide-y divide-[#e6dccf] dark:divide-white/15">
            {recipeBoxFaq.map((f) => (
              <div key={f.question} className="py-5">
                <h3 className="text-lg font-bold">{f.question}</h3>
                <p className="mt-2 max-w-3xl leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-[#faf6f0] dark:bg-[#28241f] p-8 sm:p-10" aria-labelledby="more-heading">
          <h2 id="more-heading" className="text-2xl sm:text-3xl font-bold">Guides and support</h2>
          <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 font-semibold">
            <Link href="/apps/recipe-box/save-recipes-from-websites" className="underline underline-offset-4">Save recipes from websites on a Fire tablet</Link>
            <Link href="/apps/recipe-box/keep-screen-on-while-cooking" className="underline underline-offset-4">Keep your Fire tablet screen on while cooking</Link>
            <a href={recipeBox.privacyUrl} className="underline underline-offset-4">Privacy policy</a>
            <a href={recipeBoxContactUrl()} className="underline underline-offset-4">Email support</a>
          </div>
        </section>
      </div>
    </article>
  );
}
