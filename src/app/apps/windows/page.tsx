import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { WINDOWS_APPS } from '@/lib/windows-apps';
import { ShieldCheck, Cpu, HardDrive, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { MobileReminderCard } from '@/components/MobileReminderCard';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}/apps/windows`;
const ogImageUrl = `${baseUrl}/brand/tendercraft-og.png`;
const description =
  'Discover native Windows 11 & 10 desktop utilities built for privacy and performance. Featuring Vox Reader (offline neural text-to-speech), Cropmark (secure screenshot redaction), and Still-Lane (private screen time & gentle focus).';

export const metadata: Metadata = {
  title: 'Native Windows Apps for Privacy & Focus',
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Native Windows Apps for Privacy & Focus',
    description,
    url: pageUrl,
    type: 'website',
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: 'Tendercraft Native Windows Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Native Windows Apps | Tendercraft',
    description,
    images: [ogImageUrl],
  },
};

export default function WindowsAppsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      ...WINDOWS_APPS.map((app) => ({
        '@type': 'SoftwareApplication',
        name: app.name,
        alternateName: app.fullName,
        applicationCategory: app.category,
        operatingSystem: app.operatingSystem,
        description: app.summary,
        url: app.storeUrl,
        publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
        featureList: app.features.map(([title, desc]) => `${title}: ${desc}`),
      })),
      {
        '@type': 'FAQPage',
        mainEntity: WINDOWS_APPS.flatMap((app) =>
          app.faqs.map((f) => ({
            '@type': 'Question',
            name: `${app.name}: ${f.question}`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          }))
        ),
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero Header */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Local-First Windows 11 & 10 Suite</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Native Windows Software for Privacy, Speed & Focus
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          High-performance desktop utilities that run entirely on your PC. No mandatory cloud accounts, no subscription fatigue, and zero telemetry.
        </p>
      </header>

      {/* App Cards Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {WINDOWS_APPS.map((app) => (
          <div
            key={app.id}
            id={app.id}
            className="flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all hover:border-blue-500/50"
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  <Image
                    src={app.iconPath}
                    alt={`${app.name} icon`}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {app.badge}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {app.name}
                </h2>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                  {app.pricingLabel}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
                  {app.summary}
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Key Capabilities
                </p>
                <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                  {app.features.map(([title, desc], i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-zinc-900 dark:text-zinc-100 font-medium">{title}:</strong> {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5">
              <Link
                href={`/apps/${app.id}`}
                className="inline-flex items-center justify-center w-full gap-2 px-5 py-2.5 rounded-xl font-medium text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <span>Read Feature Specs & Comparisons</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={app.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
              >
                <span>Get on Microsoft Store</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-zinc-500">
                <Link href={app.privacyUrl} className="hover:underline">
                  Privacy Policy
                </Link>
                {app.supportUrl && (
                  <Link href={app.supportUrl} className="hover:underline">
                    Support
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Mobile Reminder */}
      <MobileReminderCard
        appName="Tendercraft Windows Suite"
        url="https://tendercrafthq.com/apps/windows"
        tagline="Tendercraft apps (Vox Reader, Cropmark, and Still-Lane) run natively on Windows 11 & 10."
      />

      {/* Philosophy Banner */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/30 p-8 sm:p-12">
        <h3 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-8">
          The Tendercraft Windows Standard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">100% On-Device Privacy</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Your files, audio documents, screenshots, and screen-time activity never touch a remote server. Everything is stored locally.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Native WinUI 3 & .NET Performance</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Built natively for modern Windows 11 and 10. Instant launch times, near-zero background idle CPU, and minimal RAM footprint.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <HardDrive className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Permanent Ownership</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Generous permanent free versions paired with honest, one-time lifetime licenses. No $15/month subscriptions for simple desktop tools.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Common questions about installation, updates, and licensing on the Microsoft Store.
          </p>
        </div>

        <div className="space-y-6">
          {WINDOWS_APPS.flatMap((app) =>
            app.faqs.map((faq, idx) => (
              <div
                key={`${app.id}-${idx}`}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 p-5 bg-white dark:bg-zinc-900/40 space-y-2"
              >
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">[{app.name}]</span>
                  {faq.question}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
