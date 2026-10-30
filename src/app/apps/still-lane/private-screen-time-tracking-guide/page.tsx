import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { ChevronRight, ArrowUpRight, Database } from 'lucide-react';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}/apps/still-lane/private-screen-time-tracking-guide`;
const description =
  'Track app time on Windows with local reports and focus reminders you can override. Learn what Still-Lane records and how to export or delete your data.';

export const metadata: Metadata = {
  title: { absolute: 'Track Windows Screen Time Privately' },
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'How to Track Windows Screen Time Without Cloud Surveillance',
    description,
    url: pageUrl,
    type: 'article',
    images: [{ url: `${baseUrl}/still-lane/screenshot.png`, width: 1200, height: 675, alt: 'Still-Lane private screen time tracking interface' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Track Windows Screen Time Without Cloud Surveillance',
    description,
    images: [`${baseUrl}/still-lane/screenshot.png`],
  },
};

export default function PrivateScreenTimeTrackingGuide() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Track Windows Screen Time Without Cloud Surveillance',
    description,
    author: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
    publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
    mainEntityOfPage: pageUrl,
    datePublished: '2026-10-24T00:00:00Z',
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12 text-zinc-900 dark:text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/apps/windows" className="hover:underline">Windows Apps</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/apps/still-lane" className="hover:underline">Still-Lane</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-medium text-zinc-900 dark:text-zinc-100">Private Usage Guide</span>
      </nav>

      {/* Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-900/50">
          <Database className="w-3.5 h-3.5" />
          <span>Productivity & Wellbeing Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          How to Track Windows Screen Time Without Cloud Surveillance
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
          You don’t need an employer monitoring dashboard or a cloud subscription to understand where your day goes. Here is how local-first SQLite tracking and respectful boundaries help you stay focused.
        </p>
      </header>

      {/* Content Body */}
      <div className="space-y-10 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Choose What Your Tracker Records
          </h2>
          <p>
            Before choosing a screen time tracker, check its data collection and how its limits behave:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Collection and storage:</strong> Check whether a tool records app names, window titles, websites, or screenshots, and whether those records stay on your device or are uploaded. Still-Lane records application duration locally after consent; it does not record window titles, websites, keystrokes, or screenshots.
            </li>
            <li>
              <strong>Limit behavior:</strong> Check whether a tool gives reminders or prevents access to an app. Still-Lane uses reminders that you can override and never closes your applications.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            The Local-First Alternative: Still-Lane
          </h2>
          <p>
            <strong>Still-Lane</strong> was designed with a simple premise: adults are capable of intentional self-regulation when given clear, unbiased data and gentle reminders.
          </p>
          <p>
            Instead of logging into an online portal, Still-Lane records active focus times directly into a high-performance <strong>local SQLite database</strong> stored in your personal Windows AppData directory. There is zero telemetry, no cloud sync, and no user account.
          </p>

          <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm mt-6">
            <Image
              src="/still-lane/screenshot.png"
              alt="Still-Lane local activity reports and focus budget controls"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs text-center text-zinc-500">
            Still-Lane daily application timeline and category breakdowns: 100% private and stored locally.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Gentle, Overridable Budgets
          </h2>
          <p>
            When an application reaches its daily limit, Still-Lane displays a full-screen notification asking you to choose: take an intentional break, add another 5 minutes, or allow the app for the rest of today. It never abruptly force-closes applications or causes data loss.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Smart Away Detection
          </h2>
          <p>
            If you get up to make coffee or take a phone call, Still-Lane detects the cessation of mouse and keyboard inputs and pauses tracking automatically. Your end-of-day reports reflect true computer engagement rather than phantom idle hours.
          </p>
        </section>
      </div>

      {/* Call to Action Box */}
      <footer className="p-6 sm:p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
          Understand your digital habits with total privacy
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          View Still-Lane on the Microsoft Store for its current regional price. App usage is recorded locally after consent, with no account, telemetry, or document uploads.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="https://apps.microsoft.com/detail/9NP26W128KX9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs bg-violet-600 hover:bg-violet-700 text-white shadow-xs transition-colors"
          >
            <span>View Still-Lane on Microsoft Store</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <Link href="/apps/still-lane" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:underline">
            View full technical specifications →
          </Link>
        </div>
      </footer>
    </article>
  );
}
