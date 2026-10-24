import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { largePrintCrosswords, crosswordContactUrl } from '@/lib/large-print-crosswords';
import { getSiteUrl } from '@/lib/site';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}${largePrintCrosswords.path}`;
const description = 'Explore easy-to-read crosswords with three text sizes, offline play and no timer. See actual screenshots, puzzle details and Fire tablet availability.';

export const metadata: Metadata = {
  title: 'Large Print Crosswords for Fire Tablets',
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Large Print Crosswords for Fire Tablets | Tendercraft',
    description,
    url: pageUrl,
    type: 'website',
    images: [{ url: '/apps/large-print-crosswords/play-landscape.png', width: 2560, height: 1506, alt: 'Large Print Crosswords gameplay' }],
  },
  twitter: { card: 'summary_large_image', title: 'Large Print Crosswords for Fire Tablets', description, images: ['/apps/large-print-crosswords/play-landscape.png'] },
};

const screens = [
  { src: 'play-landscape.png', width: 2560, height: 1506, alt: 'Crossword gameplay with a large clue, keyboard and grid', caption: 'A clue, answer keys and puzzle grid on one screen.' },
  { src: 'home-largest.png', width: 2560, height: 1506, alt: 'Puzzle library with the Largest text size selected', caption: 'Choose a puzzle and make the text larger.' },
  { src: 'settings.png', width: 2560, height: 1506, alt: 'Display settings with text size and theme controls', caption: 'Pick a text size and colour theme.' },
  { src: 'play-dark.png', width: 2560, height: 1506, alt: 'Crossword grid shown in Deep Charcoal theme', caption: 'Deep Charcoal offers an alternate colour scheme.' },
  { src: 'play-portrait.png', width: 1600, height: 2466, alt: 'Crossword puzzle in portrait orientation', caption: 'Play in portrait or landscape.' },
];

const faq = [
  { question: 'Can I play without internet?', answer: 'Yes. The release app is designed to work offline. Puzzles, progress and display settings stay on the tablet.' },
  { question: 'How many puzzles are there?', answer: 'There are 150 in total: 120 in the library and 30 in a daily rotation. The daily selection repeats after 30 days; it is not an endless supply of new puzzles.' },
  { question: 'Are there ads, accounts or a timer?', answer: 'No. There are no ads or accounts, and you can take as long as you like with each puzzle.' },
  { question: 'Will it work on my Kindle or Fire tablet?', answer: 'The app is being prepared for compatible Fire tablets. Kindle e-readers such as Paperwhite are a different device family. A tested model list will be added after Fire hardware validation.' },
  { question: 'Is it available to buy now?', answer: largePrintCrosswords.availability === 'available' ? 'Use the Amazon Appstore link on this page to see the current price and device availability.' : 'The Amazon listing is still being prepared. Email us to ask about launch status or compatibility with your tablet.' },
];

export default function LargePrintCrosswordsPage() {
  const isAvailable = largePrintCrosswords.availability === 'available' && Boolean(largePrintCrosswords.amazonUrl);
  const primaryUrl = isAvailable ? largePrintCrosswords.amazonUrl! : crosswordContactUrl();
  const primaryLabel = isAvailable ? 'View on Amazon Appstore' : 'Ask about availability';
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Large Print Crosswords for Fire Tablets',
    url: pageUrl,
    description,
    about: { '@type': 'SoftwareApplication', name: largePrintCrosswords.name, applicationCategory: 'GameApplication', operatingSystem: 'Fire OS' },
    publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
  };

  return (
    <article className="pb-20 text-[#30251c] dark:text-[#f8f2e9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema).replace(/</g, '\\u003c') }} />
      <div className="bg-[#f3ede4] dark:bg-[#171c27] border-b border-[#d8c9b7] dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <p className="text-sm font-bold tracking-widest uppercase text-[#854600] dark:text-amber-300">An offline puzzle app by Tendercraft</p>
            <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">Crosswords with room to read.</h1>
            <p className="mt-5 text-lg sm:text-xl leading-relaxed max-w-xl">Large Print Crosswords brings bigger letters, clear clues and relaxed play to compatible Fire tablets.</p>
            <p className="mt-4 text-base leading-relaxed max-w-xl">Choose from three text sizes and two colour themes. Play without a timer, ads, an account or an internet connection.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={primaryUrl} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#824100] px-6 py-3 font-bold text-white hover:bg-[#633100] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#824100]">{primaryLabel}</a>
              <span className="font-semibold">{isAvailable ? 'Check the Appstore for current price and compatibility.' : 'Coming soon · Fire tablet release in preparation'}</span>
            </div>
          </div>
          <a href="/apps/large-print-crosswords/play-landscape.png" className="block overflow-hidden rounded-2xl border-2 border-[#a5927e] shadow-xl focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#824100]" aria-label="Open full-size gameplay screenshot">
            <Image src="/apps/large-print-crosswords/play-landscape.png" width={2560} height={1506} alt="Actual game screen with a large crossword clue, letter keys and compact puzzle grid" priority sizes="(max-width: 1024px) 100vw, 55vw" className="w-full h-auto" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <section className="py-16 sm:py-20" aria-labelledby="features-heading">
          <p className="font-bold uppercase tracking-widest text-sm text-[#854600] dark:text-amber-300">The way it plays</p>
          <h2 id="features-heading" className="mt-3 text-3xl sm:text-4xl font-bold">Pick up a puzzle at your pace</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              ['Read it your way', 'Switch between Large, Larger and Largest text. Choose Warm Parchment or Deep Charcoal.'],
              ['Take your time', 'No timer or scoring pressure. Check an answer or reveal a letter or whole word when you want help.'],
              ['Return whenever you like', 'Your puzzle progress and display choices are saved on your tablet. No account or connection is needed.'],
            ].map(([title, copy]) => <div key={title} className="rounded-2xl border border-[#d8c9b7] dark:border-white/15 bg-[#faf7f1] dark:bg-[#171c27] p-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed">{copy}</p></div>)}
          </div>
        </section>

        <section className="pb-16" aria-labelledby="puzzles-heading">
          <div className="rounded-3xl bg-[#30251c] text-white p-8 sm:p-12 grid md:grid-cols-[auto_1fr] gap-6 items-center">
            <p className="text-7xl sm:text-8xl font-black text-[#ffcf74]">150</p>
            <div><h2 id="puzzles-heading" className="text-2xl sm:text-3xl font-bold">Original compact crosswords included</h2><p className="mt-3 text-lg leading-relaxed text-[#f3e8da]">120 puzzles are in the library. Another 30 appear in a daily rotation that repeats after 30 days. All 150 are included with the paid app.</p></div>
          </div>
        </section>

        <section className="pb-16" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="text-3xl sm:text-4xl font-bold">See the actual app</h2>
          <p className="mt-3 max-w-2xl leading-relaxed">These images were captured from a review build on a tablet. Open any image to inspect the text and controls at full size.</p>
          <div className="mt-8 grid md:grid-cols-2 gap-7">
            {screens.map((screen) => <figure key={screen.src} className="rounded-2xl overflow-hidden border border-[#d8c9b7] dark:border-white/15 bg-[#faf7f1] dark:bg-[#171c27]"><a href={`/apps/large-print-crosswords/${screen.src}`} className="block focus-visible:outline-3 focus-visible:outline-[#824100]" aria-label={`Open full-size image: ${screen.alt}`}><Image src={`/apps/large-print-crosswords/${screen.src}`} width={screen.width} height={screen.height} alt={screen.alt} sizes="(max-width: 768px) 100vw, 50vw" className="w-full h-auto" /></a><figcaption className="p-4 font-medium">{screen.caption}</figcaption></figure>)}
          </div>
          <div className="mt-10 max-w-4xl"><h3 className="text-2xl font-bold">A quick look at play</h3><p className="mt-2">This 24-second preview shows the review build. The release is still in preparation.</p><video className="mt-4 w-full rounded-2xl border border-[#d8c9b7]" controls preload="none" poster="/apps/large-print-crosswords/play-landscape.png" playsInline aria-label="Large Print Crosswords 24-second app preview"><source src="/apps/large-print-crosswords/showcase-prelaunch-24s.mp4" type="video/mp4" />Your browser cannot play this video. The screenshots above show the app.</video></div>
        </section>

        <section className="pb-16" aria-labelledby="faq-heading"><h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold">Good to know</h2><div className="mt-6 divide-y divide-[#d8c9b7] dark:divide-white/15">{faq.map((item) => <div key={item.question} className="py-5"><h3 className="text-lg font-bold">{item.question}</h3><p className="mt-2 max-w-3xl leading-relaxed">{item.answer}</p></div>)}</div></section>

        <section className="rounded-3xl bg-[#f3ede4] dark:bg-[#171c27] p-8 sm:p-10" aria-labelledby="more-heading"><h2 id="more-heading" className="text-2xl sm:text-3xl font-bold">Read more and get in touch</h2><div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 font-semibold"><Link href="/apps/large-print-crosswords/choosing-a-readable-crossword-app" className="underline underline-offset-4">Choosing a readable crossword app</Link><Link href="/apps/large-print-crosswords/offline-play-guide" className="underline underline-offset-4">Using the app offline</Link><Link href={largePrintCrosswords.privacyUrl} className="underline underline-offset-4">App privacy policy</Link><a href={crosswordContactUrl('Large Print Crosswords question')} className="underline underline-offset-4">Email product support</a></div><p className="mt-5">Built and supported by Tendercraft. For now, email is the way to ask about launch status; there is no automated waitlist.</p></section>
      </div>
    </article>
  );
}
