import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { visualScheduleBoard, visualScheduleContactUrl } from '@/lib/visual-schedule-board';
import { getSiteUrl } from '@/lib/site';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}${visualScheduleBoard.path}`;
const assets = `${visualScheduleBoard.path}`;
const title = 'Visual Schedule Board – Picture Routine App for Kids (Fire Tablet)';
const description =
  'An offline picture-routine app for Amazon Fire tablets. Build morning and bedtime schedules from 74 pictures or your own photos. No ads, no accounts.';
const definition =
  'Visual Schedule Board is an offline picture-routine app for Amazon Fire tablets. Parents and teachers build step-by-step visual schedules, such as a morning or bedtime routine, from 74 built-in pictures or their own photos, and children follow them one step at a time.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Visual Schedule Board | Tendercraft',
    description,
    url: pageUrl,
    type: 'website',
    images: [{ url: `${assets}/og.jpg`, width: 1200, height: 630, alt: 'Visual Schedule Board home screen with Morning, School and Bedtime routines' }],
  },
  twitter: { card: 'summary_large_image', title: 'Visual Schedule Board', description, images: [`${assets}/og.jpg`] },
};

const screens = [
  { file: 'home', alt: 'Home screen greeting a child with three routines: Morning, School and Bedtime, each showing its picture steps and a Start button', caption: 'Pick a routine. Each card shows its steps as pictures.' },
  { file: 'child-view', alt: 'Morning routine with the current step, Brush teeth, highlighted with a large picture and a Tap when done button, and the next steps beside it', caption: 'One step is highlighted. The next steps wait beside it.' },
  { file: 'first-then', alt: 'First / Then view showing Brush teeth as the first step and Get dressed as the step that comes then', caption: 'First / Then view: what to do now and what comes next.' },
  { file: 'progress', alt: 'Morning routine with two steps marked done and a progress bar, the third step Eat breakfast now highlighted', caption: 'Finished steps fade and show a Tap to undo hint.' },
  { file: 'all-done', alt: 'All done screen with a star and the finished Morning steps, with buttons to go back or undo the last step', caption: 'A calm All done screen when the routine is finished.' },
  { file: 'parent-gate', alt: 'Parent gate asking a multiplication question with an on-screen keypad before the parent area opens', caption: 'A parent gate keeps editing away from little fingers.' },
  { file: 'routine-editor', alt: 'Routine editor listing four steps with a picture, a timer or done label, move up, move down, edit and delete buttons', caption: 'Parents and teachers order, edit and add steps.' },
  { file: 'step-editor', alt: 'Step editor with a picture grid, a quiet timer set to 2 minutes and an option to use a real photo', caption: 'Choose a picture or use a real photo, and add an optional quiet timer.' },
];

const faq = [
  { question: 'What is Visual Schedule Board?', answer: definition },
  { question: 'Does it work without internet?', answer: 'Yes. Routines, pictures and photos are stored on the tablet and the app works fully offline.' },
  { question: 'Does it need an account, or show ads?', answer: 'No. There are no accounts, no ads and no analytics.' },
  { question: 'Is there a subscription?', answer: `No. The app is free to start with ${visualScheduleBoard.freeChildren} child profile and ${visualScheduleBoard.freeRoutines} routines. A one-time unlock through Amazon adds more children and routines.` },
  { question: 'Which devices does it run on?', answer: 'Compatible Amazon Fire tablets. It is not available for Kindle e-readers or for phones.' },
  { question: 'Can I use my own photos?', answer: 'Yes. Any step can use a photo from the tablet camera or gallery instead of a built-in picture.' },
  { question: 'Can children change the routines?', answer: 'Editing is behind a parent gate, a short multiplication question, so routines are changed by an adult.' },
  { question: 'Is it a medical or therapy app?', answer: 'No. It is a routine and organization tool that shows steps as pictures.' },
];

export default function VisualScheduleBoardPage() {
  const isAvailable = visualScheduleBoard.availability === 'available' && Boolean(visualScheduleBoard.amazonUrl);
  const primaryUrl = isAvailable ? visualScheduleBoard.amazonUrl! : visualScheduleContactUrl();
  const primaryLabel = isAvailable ? 'Get it on Amazon Appstore' : 'Ask about availability';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: visualScheduleBoard.name,
        description: definition,
        url: pageUrl,
        operatingSystem: 'Fire OS',
        applicationCategory: 'LifestyleApplication',
        image: `${baseUrl}${assets}/icon-512.png`,
        screenshot: screens.map((s) => `${baseUrl}${assets}/${s.file}.webp`),
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
        ...(isAvailable ? { downloadUrl: visualScheduleBoard.amazonUrl } : {}),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Apps', item: `${baseUrl}/work` },
          { '@type': 'ListItem', position: 3, name: visualScheduleBoard.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <article className="pb-20 text-[#1f2a24] dark:text-[#eef5f0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <div className="bg-[#eef5f0] dark:bg-[#15201a] border-b border-[#c5d8cb] dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <p className="text-sm font-bold tracking-widest uppercase text-[#316342] dark:text-emerald-300">A picture-routine app by Tendercraft</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">Visual Schedule Board: a picture routine app for kids on Fire tablets</h1>
            <p className="mt-5 text-lg leading-relaxed max-w-xl">{definition}</p>
            <p className="mt-4 text-base leading-relaxed max-w-xl">Free to start. One-time unlock, no subscription. No ads, no accounts.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={primaryUrl} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#316342] px-6 py-3 font-bold text-white hover:bg-[#244b31] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#316342]">{primaryLabel}</a>
              <span className="font-semibold">{isAvailable ? 'Check the Appstore for compatibility with your tablet.' : 'Fire tablet release · email us for the latest status'}</span>
            </div>
          </div>
          <a href={`${assets}/home.webp`} className="block overflow-hidden rounded-2xl border-2 border-[#9db8a5] shadow-xl focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#316342]" aria-label="Open full-size home screen screenshot">
            <Image src={`${assets}/home.webp`} width={1600} height={1000} alt={screens[0].alt} priority sizes="(max-width: 1024px) 100vw, 55vw" className="w-full h-auto" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <section className="py-16 sm:py-20" aria-labelledby="what-heading">
          <h2 id="what-heading" className="text-3xl sm:text-4xl font-bold">What is a visual schedule?</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed">A visual schedule shows the steps of a routine as pictures in order, so a child can see what happens now and what comes next instead of hearing a list of instructions. Families and classrooms use them for mornings, school days, bedtime and transitions. Visual Schedule Board puts that on a tablet.</p>
        </section>

        <section className="pb-16" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold">What you can do with it</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              ['Build routines from pictures', `Choose from ${visualScheduleBoard.pictureCount} built-in pictures or take a photo. Name each step and put the steps in order.`],
              ['One calm step at a time', 'A large card shows the current step. First / Then view shows just what to do now and what comes next. Tap a finished step to mark it done, tap again to undo.'],
              ['Optional timers and read-aloud', 'Add a quiet countdown with no alarm sound to any step. Read-aloud uses a voice already installed on the tablet.'],
              ['A profile per child', 'Each child gets their own routines. Routines reset every morning.'],
              ['Adult-only editing', 'A short multiplication question protects the parent area.'],
              ['Backup and restore', 'Export all routines and photos to one file and import it again later.'],
            ].map(([t, c]) => <div key={t} className="rounded-2xl border border-[#c5d8cb] dark:border-white/15 bg-[#f7faf8] dark:bg-[#15201a] p-6"><h3 className="text-xl font-bold">{t}</h3><p className="mt-3 leading-relaxed">{c}</p></div>)}
          </div>
        </section>

        <section className="pb-16 grid md:grid-cols-2 gap-8" aria-labelledby="use-heading">
          <div><h2 id="use-heading" className="text-3xl font-bold">At home</h2><p className="mt-3 leading-relaxed">Build a Morning routine with Brush teeth, Get dressed, Eat breakfast and Pack bag. Start it at the same time each day and let the child tap each step as it is finished.</p></div>
          <div><h2 className="text-3xl font-bold">In the classroom</h2><p className="mt-3 leading-relaxed">Create a School routine for arrival, put on shoes and bus ride, or show First / Then for a single transition. Make one profile per child on a shared tablet.</p></div>
        </section>

        <section className="pb-16" aria-labelledby="compare-heading">
          <h2 id="compare-heading" className="text-3xl sm:text-4xl font-bold">Paper chart or tablet</h2>
          <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[32rem] text-left border-collapse"><caption className="sr-only">Comparison of a paper picture chart and Visual Schedule Board</caption><thead><tr className="border-b border-[#c5d8cb] dark:border-white/15"><th scope="col" className="py-3 pr-4"><span className="sr-only">Task</span></th><th scope="col" className="py-3 pr-4">Paper chart</th><th scope="col" className="py-3">Visual Schedule Board</th></tr></thead><tbody className="divide-y divide-[#c5d8cb] dark:divide-white/15">
            {[
              ['Change a step', 'Reprint or redraw', 'Edit in seconds'],
              ['Use real photos', 'Print and cut out', 'Take or pick a photo'],
              ['Mark a step done', 'Velcro or stickers', 'One tap, one tap to undo'],
              ['Timer', 'Separate device', 'Built-in quiet countdown'],
              ['Several children', 'A chart each', 'A profile each'],
              ['Needs internet', 'No', 'No'],
            ].map(([a, b, c]) => <tr key={a}><th scope="row" className="py-3 pr-4 font-semibold">{a}</th><td className="py-3 pr-4">{b}</td><td className="py-3">{c}</td></tr>)}
          </tbody></table></div>
        </section>

        <section className="pb-16" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="text-3xl sm:text-4xl font-bold">See the actual app</h2>
          <p className="mt-3 max-w-2xl leading-relaxed">These are real screens from the app, with a fictional child named Maya. Open any image to see it full size.</p>
          <div className="mt-8 grid md:grid-cols-2 gap-7">
            {screens.slice(1).map((s) => <figure key={s.file} className="rounded-2xl overflow-hidden border border-[#c5d8cb] dark:border-white/15 bg-[#f7faf8] dark:bg-[#15201a]"><a href={`${assets}/${s.file}.webp`} className="block focus-visible:outline-3 focus-visible:outline-[#316342]" aria-label={`Open full-size image: ${s.alt}`}><Image src={`${assets}/${s.file}.webp`} width={1600} height={1000} alt={s.alt} sizes="(max-width: 768px) 100vw, 50vw" className="w-full h-auto" /></a><figcaption className="p-4 font-medium">{s.caption}</figcaption></figure>)}
          </div>
        </section>

        <section className="pb-16" aria-labelledby="privacy-heading">
          <h2 id="privacy-heading" className="text-3xl sm:text-4xl font-bold">Private by design</h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed">No ads, no accounts and no analytics. Names, routines and photos stay on the tablet. Read the full <Link href={visualScheduleBoard.privacyUrl} className="underline underline-offset-4 font-semibold">privacy policy</Link>.</p>
        </section>

        <section className="pb-16" aria-labelledby="faq-heading"><h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold">Questions and answers</h2><div className="mt-6 divide-y divide-[#c5d8cb] dark:divide-white/15">{faq.map((item) => <div key={item.question} className="py-5"><h3 className="text-lg font-bold">{item.question}</h3><p className="mt-2 max-w-3xl leading-relaxed">{item.answer}</p></div>)}</div></section>

        <section className="rounded-3xl bg-[#eef5f0] dark:bg-[#15201a] p-8 sm:p-10" aria-labelledby="contact-heading"><h2 id="contact-heading" className="text-2xl sm:text-3xl font-bold">Get in touch</h2><div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 font-semibold"><Link href={`${visualScheduleBoard.path}/printable-morning-routine-chart`} className="underline underline-offset-4">Free printable routine charts</Link><Link href={`${visualScheduleBoard.path}/first-then-board-guide`} className="underline underline-offset-4">How to use a First / Then board</Link><a href={visualScheduleContactUrl('Visual Schedule Board question')} className="underline underline-offset-4">Email product support</a><Link href={visualScheduleBoard.privacyUrl} className="underline underline-offset-4">App privacy policy</Link></div><p className="mt-5">Built and supported by Tendercraft. Pictures are Twemoji (CC BY 4.0).</p></section>
      </div>
    </article>
  );
}
