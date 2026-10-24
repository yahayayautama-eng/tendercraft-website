import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import {
  ShieldCheck,
  Clock,
  Database,
  Sliders,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ChevronRight,
  Lock,
  Download,
  FileCode,
  PieChart,
  Coffee,
} from 'lucide-react';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}/apps/still-lane`;
const ogImageUrl = `${baseUrl}/still-lane/screenshot.png`;
const description =
  'Private, local-first Windows 11 & 10 computer usage tracker with gentle overridable limits and deep focus sessions. 100% local SQLite storage with zero cloud surveillance.';

export const metadata: Metadata = {
  title: 'Still-Lane — Private Screen Time & App Usage Tracker for Windows',
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Still-Lane — Private Screen Time & App Usage Tracker for Windows',
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

const comparisonData = [
  { feature: '100% Local SQLite Storage (Zero Cloud)', stillLane: true, rescueTime: false, manicTime: 'Partial', coldTurkey: true, activityWatch: true },
  { feature: 'Personal Computer Activity Sent to Remote Servers', stillLane: false, rescueTime: true, manicTime: false, coldTurkey: false, activityWatch: false },
  { feature: 'No Account or Registration Required', stillLane: true, rescueTime: false, manicTime: false, coldTurkey: true, activityWatch: true },
  { feature: 'Gentle, Overridable Limits (Never Force-Closes Apps)', stillLane: true, rescueTime: false, manicTime: false, coldTurkey: false, activityWatch: false },
  { feature: 'Integrated Deep Work Focus Intervals', stillLane: true, rescueTime: true, manicTime: false, coldTurkey: true, activityWatch: false },
  { feature: 'Annual / Lifetime Price', stillLane: '15-day trial · $14.99 once', rescueTime: '$78.00 / year', manicTime: '$67.00+ / license', coldTurkey: '$39.00 once', activityWatch: 'Free (Donation)' },
  { feature: 'Smart Inactivity / Step-Away Detection', stillLane: true, rescueTime: true, manicTime: true, coldTurkey: false, activityWatch: true },
  { feature: 'Export Your History to CSV or JSON', stillLane: true, rescueTime: true, manicTime: true, coldTurkey: false, activityWatch: true },
];

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
      'Still-Lane includes a full-featured 15-day free trial directly through the Microsoft Store. After the trial, a single one-time payment of $14.99 grants permanent lifetime access with no monthly fees or subscriptions.',
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
          description: '15-day free trial + $14.99 one-time lifetime license',
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
              Still-Lane
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
            <span>Start 15-Day Free Trial on Microsoft Store</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            15-day free trial · $14.99 one-time purchase (no subscriptions)
          </span>
        </div>

        {/* Winget quick install */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300">
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          <span>winget install 9NP26W128KX9</span>
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

      {/* Why Still-Lane — Problem vs Solution */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Why Gentle Self-Management Beats Surveillance
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 space-y-3">
            <h3 className="font-semibold text-red-900 dark:text-red-200 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>The Surveillance Tracker Problem</span>
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Mainstream screen time trackers either upload your full application activity to remote cloud servers, or employ aggressive blockers that abruptly kill your programs and risk losing unsaved documents. You are treated like an employee under surveillance or a child in detention.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>The Still-Lane Philosophy</span>
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Still-Lane respects you as an autonomous professional. Tracking is 100% local in SQLite, limits are clear reminders that you can intentionally snooze or override, and deep focus sessions protect your attention without punitive drama.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Deep-Dive Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Designed for Clarity and Digital Health
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Clock className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Automatic Local Tracking</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Tracks active application focus accurately in the background. Automatically filters idle away-time so reports reflect genuine work.
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
              Start dedicated focus blocks to protect attention on priority tasks. Distracting apps prompt for quick confirmation before opening.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Coffee className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Water & Rest Reminders</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Gentle hydration and posture check-ins with an optional daily glass counter to protect physical wellbeing during long desk sessions.
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

      {/* Comparison Matrix Table */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Still-Lane vs. Common Time Trackers
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Compare Still-Lane with RescueTime, ManicTime, Cold Turkey, and ActivityWatch.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Capability</th>
                <th className="p-4 font-bold text-violet-600 dark:text-violet-400">Still-Lane</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">RescueTime</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">ManicTime</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Cold Turkey</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">ActivityWatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {comparisonData.map((row, i) => (
                <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40">
                  <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100">{row.feature}</td>
                  <td className="p-4 font-bold text-violet-600 dark:text-violet-400">
                    {typeof row.stillLane === 'boolean' ? (
                      row.stillLane ? <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.stillLane
                    )}
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">
                    {typeof row.rescueTime === 'boolean' ? (
                      row.rescueTime ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.rescueTime
                    )}
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">
                    {typeof row.manicTime === 'boolean' ? (
                      row.manicTime ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.manicTime
                    )}
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">
                    {typeof row.coldTurkey === 'boolean' ? (
                      row.coldTurkey ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.coldTurkey
                    )}
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">
                    {typeof row.activityWatch === 'boolean' ? (
                      row.activityWatch ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.activityWatch
                    )}
                  </td>
                </tr>
              ))}
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

      {/* Bottom CTA Card */}
      <section className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-violet-600 to-purple-800 text-white text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Take Back Control of Your Computer Time
        </h2>
        <p className="text-violet-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Start your 15-day free trial on the Microsoft Store. Zero cloud lock-in, zero subscriptions, and complete peace of mind.
        </p>
        <div className="pt-2">
          <a
            href="https://apps.microsoft.com/detail/9NP26W128KX9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-zinc-100 text-violet-700 shadow-md transition-colors"
          >
            <span>Start Free Trial on Microsoft Store</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
