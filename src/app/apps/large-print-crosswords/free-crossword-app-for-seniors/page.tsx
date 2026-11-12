import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { largePrintCrosswords } from '@/lib/large-print-crosswords';

const baseUrl = getSiteUrl();
const url = `${baseUrl}${largePrintCrosswords.path}/free-crossword-app-for-seniors`;
const title = 'Free Crossword App for Seniors on a Fire Tablet';
const description =
  'A free, large-print crossword app for older adults on Amazon Fire tablets: big text, no ads, no timer and offline play. What is free and what the one-time unlock adds.';

export const metadata: Metadata = { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: 'article' } };

const faq = [
  {
    question: 'Is Large Print Crosswords really free?',
    answer: `Yes. It is free to download. The daily puzzles and the first ${largePrintCrosswords.freePerLevel} library puzzles at each level are free to play. A single one-time purchase (US$${largePrintCrosswords.unlockPriceUsd} in the US) unlocks all 150 puzzles. There are no ads and no subscription.`,
  },
  {
    question: 'Is it good for someone with low vision?',
    answer: 'It offers three text sizes (Large, Larger and Largest) and two high-contrast colour themes. It is not a substitute for advice from an eye-care professional, and VoiceView compatibility has not been independently verified.',
  },
  {
    question: 'Does it work on a Kindle Paperwhite?',
    answer: 'No. It is an app for compatible Amazon Fire tablets. Kindle e-readers such as Paperwhite are a different device family and do not run Appstore apps.',
  },
  {
    question: 'Does it need Wi-Fi?',
    answer: 'No. Puzzles and progress stay on the tablet. Only buying or restoring the optional unlock uses the Amazon Appstore and needs a connection.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Article', headline: title, description, url, datePublished: '2026-11-12', dateModified: '2026-11-12', author: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl }, publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl } },
    { '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: largePrintCrosswords.name, item: `${baseUrl}${largePrintCrosswords.path}` },
        { '@type': 'ListItem', position: 3, name: 'Free crossword app for seniors', item: url },
      ],
    },
  ],
};

export default function FreeCrosswordAppForSeniorsPage() {
  const dir = largePrintCrosswords.path;
  return <article className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-zinc-900 dark:text-zinc-100">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <Link href={dir} className="font-semibold text-blue-700 dark:text-blue-300 underline underline-offset-4">← Large Print Crosswords</Link>
    <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">A free crossword app for seniors on a Fire tablet</h1>
    <p className="mt-5 text-lg leading-relaxed">Many crossword apps are hard to read, full of ads or built around a countdown. Large Print Crosswords is made the other way round: big letters, calm colours, no timer and no ads. It is free to try on compatible Amazon Fire tablets.</p>
    <div className="mt-10 space-y-10 text-lg leading-relaxed">
      <section><h2 className="text-2xl font-bold">Easy to read</h2><p className="mt-3">Choose Large, Larger or Largest text in Settings. The current clue is shown in large print above its answer boxes, and the on-screen keyboard has big keys. Switch between Warm Parchment and Deep Charcoal if one is easier on your eyes.</p></section>
      <section><h2 className="text-2xl font-bold">No pressure</h2><p className="mt-3">There is no timer, no score and no penalty for help. Check an answer when you want to, or reveal a letter or a whole word if you are stuck. Progress saves automatically, so you can stop and come back later.</p></section>
      <section><h2 className="text-2xl font-bold">What is free</h2><ul className="mt-3 list-disc pl-6 space-y-2"><li>The daily puzzles, which rotate through 30 crosswords.</li><li>The first {largePrintCrosswords.freePerLevel} library puzzles at each level: Easy, Medium and Hard.</li><li>Every display setting and every help button.</li></ul><p className="mt-3">A one-time purchase of US${largePrintCrosswords.unlockPriceUsd} (in the US) unlocks the whole library of 150 puzzles. It is tied to your Amazon account, so you can restore it on your other Fire tablets. There is no subscription.</p></section>
      <section><h2 className="text-2xl font-bold">A good gift for a parent or grandparent</h2><p className="mt-3">Set it up on their tablet, pick a comfortable text size together, and show them the Check button. There is no account to create and nothing to sign in to. Read <Link href={`${dir}/choosing-a-readable-crossword-app`} className="underline underline-offset-4">choosing a readable crossword app</Link> for more on what to look for.</p></section>
      <section><h2 className="text-2xl font-bold">Common questions</h2><div className="mt-3 divide-y divide-zinc-200 dark:divide-zinc-700">{faq.map((f) => <div key={f.question} className="py-4"><h3 className="font-bold">{f.question}</h3><p className="mt-2">{f.answer}</p></div>)}</div></section>
    </div>
    <p className="mt-12 rounded-2xl bg-amber-50 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100 p-6">{largePrintCrosswords.amazonUrl ? <a href={largePrintCrosswords.amazonUrl} className="font-bold underline underline-offset-4">Get Large Print Crosswords free on the Amazon Appstore</a> : <Link href={dir} className="font-bold underline underline-offset-4">See Large Print Crosswords</Link>}.</p>
  </article>;
}
