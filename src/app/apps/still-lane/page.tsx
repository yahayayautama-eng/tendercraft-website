import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { Clock, Database, Sliders, Sparkles, CheckCircle2, XCircle, ArrowUpRight, ChevronRight, Download, FileCode, PieChart, Coffee } from 'lucide-react';
import { MobileReminderCard } from '@/components/MobileReminderCard';
import { WindowsComparisonLinks } from '@/components/WindowsComparison';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}/apps/still-lane`;
const ogImageUrl = `${baseUrl}/still-lane/screenshot.png`;
const description =
  'Track app time privately on Windows. Review daily reports and use focus reminders you can override. Records stay on your PC. Try free for 15 days.';

export const metadata: Metadata = {
  title: { absolute: 'Still-Lane: Private Screen Time Tracker for Windows' },
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Still-Lane: Private Screen Time Tracker for Windows',
    description,
    url: pageUrl,
    type: 'website',
    images: [{ url: ogImageUrl, width: 1200, height: 675, alt: 'Still-Lane Windows screen time and computer usage tracker' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Still-Lane — Private Screen Time Tracker for Windows',
    description,
    images: [ogImageUrl],
  },
};


const faqs = [
  {
    question: 'Does Still-Lane send my computer usage or active window names to any server?',
    answer:
      'Never. All usage metrics and focus logs are stored strictly inside a local SQLite database in your personal Windows AppData folder. Still-Lane has zero telemetry, no cloud servers, no account registration, and zero surveillance capability.',
  },
  {
    question: 'Will Still-Lane forcefully kill my applications or risk unsaved work?',
    answer:
      'No. Still-Lane is designed for adult self-regulation and respectful boundaries. When a daily app budget is reached, it displays an intentional reminder screen that you can comfortably snooze or override without ever terminating processes or losing work.',
  },
  {
    question: 'How does Still-Lane detect when I am away from my desk?',
    answer:
      'Still-Lane monitors Windows system input inactivity. When no mouse movements or keystrokes occur for a configurable period, tracking pauses automatically so your daily reports reflect actual active computer time.',
  },
  {
    question: 'What is the pricing model?',
    answer:
      'Still-Lane offers a 15-day free trial through Microsoft Store, followed by an optional one-time purchase with no subscription. Check the Store for the current price in your region.',
  },
  {
    question: 'Can I export or delete my usage data anytime?',
    answer:
      'Yes. You can export your complete history to open CSV or JSON formats at any time. You can also exclude individual apps (which purges their entire history) or clear your entire database with one click.',
  },
];

export default function StillLanePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Still-Lane',
        alternateName: 'Still-Lane – Screen Time, App Usage Tracker & Gentle Focus Limits',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Windows 10, Windows 11',
        description,
        url: 'https://apps.microsoft.com/detail/9NP26W128KX9',
        image: `${baseUrl}/still-lane/icon.png`,
        screenshot: ogImageUrl,
        publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
        offers: {
          '@type': 'Offer',
          price: '14.99',
          priceCurrency: 'USD',
          description: 'One-time purchase; regional price shown in Microsoft Store',
        },
        featureList: [
          'Automatic local application time tracking',
          'Gentle overridable app time budgets',
          'Deep focus timer intervals with gentle snoozing',
          'Smart inactivity detection and away filtering',
          '100% local SQLite storage with zero telemetry',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Windows Apps', item: `${baseUrl}/apps/windows` },
          { '@type': 'ListItem', position: 3, name: 'Still-Lane', item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
      {
        '@type': 'VideoObject',
        name: 'Still-Lane — Private Windows Screen Time Tracker Demonstration',
        description: 'See 100% local SQLite screen time tracking, daily timeline insights, and gentle overridable budgets.',
        thumbnailUrl: `${baseUrl}/still-lane/screenshot.png`,
        uploadDate: '2026-10-24T00:00:00Z',
        contentUrl: `${baseUrl}/still-lane/preview.mp4`,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/apps/windows" className="hover:underline">Windows Apps</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-900 dark:text-zinc-100 font-medium">Still-Lane</span>
      </nav>

      {/* Hero Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-900/50">
            <Database className="w-3.5 h-3.5" />
            <span>100% Local SQLite Storage · Zero Surveillance</span>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Windows 11 & 10 Native</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <Image
            src="/still-lane/icon.png"
            alt="Still-Lane App Icon"
            width={88}
            height={88}
            className="rounded-2xl shadow-sm border border-black/5 dark:border-white/10 shrink-0"
            priority
          />
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Still-Lane — Screen Time & Focus Tracker for Windows
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl font-medium">
              See where your computer time goes, protect deep focus, and set gentle daily limits without corporate tracking.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="https://apps.microsoft.com/detail/9NP26W128KX9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <span>Try Still-Lane free for 15 days</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            One-time purchase · $14.99 one-time purchase (no subscriptions)
          </span>
        </div>

        {/* Winget quick install */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300">
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>winget install 9NP26W128KX9</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60 text-xs font-medium">
            <span>🎁</span>
            <span>
              <strong>Launch offer until 25 November 2026:</strong> the first 10 people who ask get a free Still-Lane code, redeemed in the Microsoft Store. Email{' '}
              <a href="mailto:hello@tendercrafthq.com?subject=Still-Lane%20Free%20License%20Request" className="underline font-semibold">
                hello@tendercrafthq.com
              </a>
            </span>
          </div>
        </div>
      </header>

      {/* App Screenshot */}
      <section className="space-y-3">
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md bg-zinc-950">
          <Image
            src="/still-lane/screenshot.png"
            alt="Still-Lane daily application timeline and focus reports"
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
          />
        </div>
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          Daily active timeline, application category summaries, and customizable overridable budget controls.
        </p>
      </section>

      {/* Video Demonstration */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Watch Still-Lane in Action
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            See 100% local SQLite screen time tracking, daily timeline insights, and gentle overridable budgets.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md bg-zinc-950">
          <video
            className="w-full h-auto aspect-video"
            controls
            preload="metadata"
            poster="/still-lane/screenshot.png"
            playsInline
            aria-label="Still-Lane private screen time tracker demonstration"
          >
            <source src="/still-lane/preview.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Why Still-Lane — Problem vs Solution */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Understand your app time and choose your reminders
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 space-y-3">
            <h3 className="font-semibold text-red-900 dark:text-red-200 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>Decide what you want a tracker to record</span>
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Before choosing a tracker, check what it records, where records are stored, and how limits behave. Still-Lane records foreground-app usage after consent and stores it on your PC. Browser time is counted as one app; individual websites and tasks are not identified.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>The Still-Lane Philosophy</span>
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Choose an app or category budget, then snooze or override a reminder when you need to continue. Still-Lane does not block or close apps. You can pause tracking whenever you want.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Deep-Dive Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          App reports, focus sessions and data controls
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Clock className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Automatic Local Tracking</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Records foreground-app time after consent and shows active and idle time separately. These estimates describe computer use; they do not measure completed work or productivity.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Sliders className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Gentle Overridable Budgets</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Set sensible daily time limits per app or category. When time is up, choose an extra 5 minutes or allow the app for today without losing work.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Deep Work Focus Intervals</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Start a focus session and choose which apps should trigger reminders during use. Reminders can be overridden; they do not prevent apps from opening or close them.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Coffee className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Optional Water-Break Reminder</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Turn on a water-break reminder with a daily glass counter if you want one. It is off unless you choose it.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Database className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">100% Local SQLite Storage</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              No cloud accounts, no sync servers, no employee tracking. All databases remain in your local AppData directory under your complete control.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <PieChart className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Open Export & Data Erasure</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Export entire usage histories to CSV or JSON formats. Exclude sensitive applications anytime, which immediately erases their stored records.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">What Still-Lane Tracks and Controls</h2>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Still-Lane capabilities and limits</caption>
            <thead className="bg-zinc-50 dark:bg-zinc-900/80"><tr><th scope="col" className="p-4">Capability</th><th scope="col" className="p-4">How it works</th></tr></thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr><th scope="row" className="p-4">App usage reports</th><td className="p-4">Daily and weekly active and idle time; browser time is counted as one app.</td></tr>
              <tr><th scope="row" className="p-4">Collection starts after consent</th><td className="p-4">Pause recording at any time. Window titles, web addresses, keystrokes, and screenshots are not recorded.</td></tr>
              <tr><th scope="row" className="p-4">Daily budgets and focus sessions</th><td className="p-4">Reminders can be snoozed or overridden. Apps are never forcibly closed.</td></tr>
              <tr><th scope="row" className="p-4">Your records</th><td className="p-4">Stored locally, with CSV/JSON export and deletion controls.</td></tr>
              <tr><th scope="row" className="p-4">Trial and purchase</th><td className="p-4">15-day free trial through Microsoft Store, then an optional one-time purchase. Check the current price for your region.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">{faq.question}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guides & Resources */}
      <section className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Related Guides & In-Depth Walkthroughs
        </h3>
        <Link
          href="/apps/still-lane/private-screen-time-tracking-guide"
          className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/60 hover:border-violet-500 transition-colors text-xs font-semibold text-zinc-900 dark:text-zinc-100"
        >
          <span>How to Track Windows Screen Time Without Cloud Surveillance →</span>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </Link>
      </section>

      {/* Technical Metadata & Directory Info */}
      <section className="p-6 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span><strong>Publisher:</strong> Tendercraft · <strong>Product ID:</strong> 9NP26W128KX9</span>
          <div className="flex items-center gap-4">
            <a href="https://tendercrafthq.com/still-lane/pad.xml" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5" />
              <span>PAD XML Manifest</span>
            </a>
            <Link href="/still-lane/privacy-policy.html" className="hover:underline">Privacy Policy</Link>
            <Link href="/still-lane/support.html" className="hover:underline">Support</Link>
          </div>
        </div>
        <p>
          Native Windows desktop utility with local SQLite persistence. Requires no administrator elevation to run.
        </p>
      </section>

      <WindowsComparisonLinks app="still-lane" />

      {/* Mobile Reminder */}
      <MobileReminderCard
        appName="Still-Lane"
        url="https://tendercrafthq.com/apps/still-lane"
        wingetCommand="winget install 9NP26W128KX9"
        tagline="Still-Lane is a native Windows 11 & 10 focus and time tracking app."
      />

      {/* Bottom CTA Card */}
      <section className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-violet-600 to-purple-800 text-white text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Take Back Control of Your Computer Time
        </h2>
        <p className="text-violet-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Try Still-Lane free for 15 days through Microsoft Store. A one-time purchase keeps access after the trial, with no subscription.
        </p>
        <div className="pt-2">
          <a
            href="https://apps.microsoft.com/detail/9NP26W128KX9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-zinc-100 text-violet-700 shadow-md transition-colors"
          >
            <span>View Still-Lane on Microsoft Store</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
