import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';

const baseUrl = getSiteUrl();
const path = '/apps/template-delivery-kit';
const pageUrl = `${baseUrl}${path}`;
const assets = '/apps/template-delivery-kit';
// Set to the Chrome Web Store listing URL once the extension is published.
const STORE_URL = '';
const CHECKOUT_URL = 'https://freighthud.lemonsqueezy.com/checkout/buy/97244259-d5d7-42e0-91bd-dd39078be779';
const SUPPORT = 'hello@tendercrafthq.com';
const description =
  'Template Delivery Kit is a Chrome extension for template sellers: branded delivery PDFs for Canva, Google and Notion links, in batches, plus checks that every link still opens for buyers.';

export const metadata: Metadata = {
  title: 'Template Delivery Kit: Delivery PDFs and Link Checks for Template Sellers',
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Template Delivery Kit | Tendercraft',
    description,
    url: pageUrl,
    type: 'website',
    images: [{ url: `${assets}/1-branded-pdf.png`, width: 1280, height: 800, alt: 'A branded delivery PDF made by Template Delivery Kit' }],
  },
  twitter: { card: 'summary_large_image', title: 'Template Delivery Kit', description, images: [`${assets}/1-branded-pdf.png`] },
};

const screens = [
  { src: '1-branded-pdf.png', alt: 'A one-page delivery PDF with shop name, Open your template button, how-to steps and licence terms', caption: 'Your brand on every delivery PDF.' },
  { src: '2-link-checks.png', alt: 'Product list with link statuses: Works, Asks for access, Not found', caption: 'Find broken links before buyers do.' },
  { src: '3-batch.png', alt: 'Batch box with one product and link per line and a Make PDFs button', caption: 'Paste your list, get every PDF.' },
  { src: '4-brand.png', alt: 'Brand settings with a live preview of the delivery page', caption: 'Set your brand once, remake all PDFs.' },
];

const features: [string, string][] = [
  ['Branded delivery PDFs', 'Shop name, logo, colours, how-to steps, licence terms and support email on a clean one-page PDF with a big "Open your template" button.'],
  ['Batch', 'Paste one product per line and get a PDF for each. Broken or unsafe links are listed first, so nothing broken ships.'],
  ['Link checks', 'Every template link is opened the way a logged-out buyer opens it: Works, Asks for access or Not found.'],
  ['Canva, Google and Notion', 'Canva template links, Google Docs, Sheets and Slides copy links, and Notion pages, each with the right steps for buyers.'],
  ['Stops edit links', 'Canva edit links are refused before they reach a buyer, so nobody can change your master design.'],
  ['Private', 'No account and no tracking. Your brand, products and links stay in your browser.'],
];

const faq = [
  { question: 'What does Template Delivery Kit do?', answer: 'It makes the branded PDF your buyers download after they buy a Canva, Google or Notion template, and it checks that each template link still opens for a buyer who is not logged in to your account.' },
  { question: 'Which links does it check?', answer: 'Canva template links, Google Docs, Sheets and Slides links (including /copy links) and Notion pages published on notion.site. Short links such as Bitly can go on a PDF but are shown as "Couldn\'t check".' },
  { question: 'How much does it cost?', answer: 'The free plan makes one PDF at a time with a small "Made with Template Delivery Kit" line. The paid plan is $7 a month or $49 a year and adds batch, link checks for your whole list, and removes that line.' },
  { question: 'How do I get my licence key?', answer: 'Buy the paid plan through Lemon Squeezy. The licence key is on your receipt; paste it into the Licence box in the extension\'s Brand settings.' },
  { question: 'Does it see my Canva or Google account?', answer: 'No. Link checks are made without your login, which is how a buyer sees the link. Your data stays in your browser.' },
];

export default function TemplateDeliveryKitPage() {
  const live = Boolean(STORE_URL);
  const primaryUrl = live ? STORE_URL : `mailto:${SUPPORT}?subject=${encodeURIComponent('Template Delivery Kit launch')}`;
  const primaryLabel = live ? 'Add to Chrome, free' : 'Tell me when it launches';
  const app = {
    '@type': 'SoftwareApplication',
    name: 'Template Delivery Kit',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Chrome',
    description,
    image: `${baseUrl}${assets}/icon-512.png`,
    screenshot: screens.map((s) => `${baseUrl}${assets}/${s.src}`),
    publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Monthly', price: '7', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Yearly', price: '49', priceCurrency: 'USD' },
    ],
    ...(live ? { url: STORE_URL } : {}),
  };
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', name: 'Template Delivery Kit', url: pageUrl, description, about: app },
      { '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Apps', item: `${baseUrl}/work` },
          { '@type': 'ListItem', position: 3, name: 'Template Delivery Kit', item: pageUrl },
        ],
      },
    ],
  };

  return (
    <article className="pb-20 text-[#111827] dark:text-[#f3f4f6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <div className="bg-[#f5f3ff] dark:bg-[#17132a] border-b border-[#e4ddfb] dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-20 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-center">
          <div>
            <Image src={`${assets}/icon-512.png`} width={72} height={72} alt="" className="rounded-2xl" />
            <p className="mt-6 text-sm font-bold tracking-widest uppercase text-[#6d28d9] dark:text-[#c4b5fd]">A Chrome extension by Tendercraft</p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">Template Delivery Kit</h1>
            <p className="mt-5 text-lg sm:text-xl leading-relaxed max-w-xl">Branded delivery PDFs for your Canva, Google and Notion templates, and a check that every link still opens for buyers.</p>
            <p className="mt-4 text-base leading-relaxed max-w-xl">Find the link that asks for access before a buyer emails you about it. Free for one PDF at a time; $7/month or $49/year for batch and link checks.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={primaryUrl} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#6d28d9] px-6 py-3 font-bold text-white hover:bg-[#5b21b6] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#6d28d9]">{primaryLabel}</a>
              <span className="font-semibold">{live ? 'Works in Chrome on Windows, Mac and ChromeOS.' : 'Coming soon to the Chrome Web Store'}</span>
            </div>
          </div>
          <video className="w-full h-auto rounded-2xl border border-[#e4ddfb] shadow-xl" controls preload="none" poster={`${assets}/promo-poster.png`} playsInline aria-label="Template Delivery Kit 33-second tour">
            <source src={`${assets}/promo-33s.mp4`} type="video/mp4" />
            Your browser cannot play this video. The screenshots below show the extension.
          </video>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <section className="py-16 sm:py-20" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold">What it does</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {features.map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-[#e4ddfb] dark:border-white/15 bg-white dark:bg-[#1f1b33] p-6">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-16" aria-labelledby="screens-heading">
          <h2 id="screens-heading" className="text-3xl sm:text-4xl font-bold">See the actual extension</h2>
          <p className="mt-3 max-w-2xl leading-relaxed">Screens captured from the extension with a sample shop, Pastel Paper Co.</p>
          <div className="mt-8 grid md:grid-cols-2 gap-7">
            {screens.map((s) => (
              <figure key={s.src} className="rounded-2xl overflow-hidden border border-[#e4ddfb] dark:border-white/15 bg-white dark:bg-[#1f1b33]">
                <Image src={`${assets}/${s.src}`} width={1280} height={800} alt={s.alt} sizes="(max-width: 768px) 100vw, 50vw" className="w-full h-auto" />
                <figcaption className="p-4 font-medium">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="pb-16" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-bold">Pricing</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-5 max-w-4xl">
            <div className="rounded-2xl border border-[#e4ddfb] dark:border-white/15 bg-white dark:bg-[#1f1b33] p-6">
              <h3 className="text-xl font-bold">Free</h3>
              <p className="mt-3 leading-relaxed">One delivery PDF at a time, with a small &quot;Made with Template Delivery Kit&quot; line.</p>
            </div>
            <div className="rounded-2xl border-2 border-[#6d28d9] bg-white dark:bg-[#1f1b33] p-6">
              <h3 className="text-xl font-bold">Paid: $7/month or $49/year</h3>
              <p className="mt-3 leading-relaxed">Batch PDFs, link checks for your whole list, and no &quot;Made with&quot; line. Your licence key arrives on the receipt.</p>
              <a href={CHECKOUT_URL} className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-[#6d28d9] px-5 py-2.5 font-bold text-white hover:bg-[#5b21b6]">Get the paid plan</a>
            </div>
          </div>
        </section>

        <section className="pb-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold">Questions</h2>
          <div className="mt-6 divide-y divide-[#e4ddfb] dark:divide-white/15">
            {faq.map((f) => (
              <div key={f.question} className="py-5">
                <h3 className="text-lg font-bold">{f.question}</h3>
                <p className="mt-2 max-w-3xl leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-[#f5f3ff] dark:bg-[#1f1b33] p-8 sm:p-10" aria-labelledby="more-heading">
          <h2 id="more-heading" className="text-2xl sm:text-3xl font-bold">Support</h2>
          <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 font-semibold">
            <a href="/template-delivery-kit/privacy.html" className="underline underline-offset-4">Privacy policy</a>
            <a href={`mailto:${SUPPORT}`} className="underline underline-offset-4">Email support</a>
            <Link href="/work" className="underline underline-offset-4">All Tendercraft apps</Link>
          </div>
        </section>
      </div>
    </article>
  );
}
