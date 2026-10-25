import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import {
  ShieldCheck,
  Scissors,
  Layers,
  FileText,
  Palette,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ChevronRight,
  Lock,
  Download,
  FileCode,
  Sparkles,
  EyeOff,
} from 'lucide-react';
import { MobileReminderCard } from '@/components/MobileReminderCard';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}/apps/cropmark`;
const ogImageUrl = `${baseUrl}/cropmark/screenshot.png`;
const description =
  'Native Windows 11 & 10 screenshot tool with verified destructive redaction (Acropalypse-safe), numbered step callouts, and multi-page PDF export. Free tier with zero watermarks.';

export const metadata: Metadata = {
  title: 'Cropmark — Screenshot Tool with Secure Redaction & PDF Export for Windows',
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Cropmark — Screenshot Tool with Secure Redaction & PDF Export for Windows',
    description,
    url: pageUrl,
    type: 'website',
    images: [{ url: ogImageUrl, width: 1200, height: 675, alt: 'Cropmark screenshot markup and redaction interface' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cropmark — Screenshot Tool with True Redaction for Windows',
    description,
    images: [ogImageUrl],
  },
};

const comparisonData = [
  { feature: 'True Destructive Redaction (Zeroed Pixels)', cropmark: true, snippingTool: false, snagit: 'Partial', sharex: false, greenshot: false },
  { feature: 'Acropalypse-Safe Memory Buffer Wiping', cropmark: true, snippingTool: false, snagit: false, sharex: false, greenshot: false },
  { feature: 'Auto-Incrementing Numbered Step Badges (1, 2, 3...)', cropmark: true, snippingTool: false, snagit: true, sharex: true, greenshot: true },
  { feature: 'Merge Screenshots into Multi-Page PDF', cropmark: true, snippingTool: false, snagit: true, sharex: false, greenshot: false },
  { feature: 'Zero Watermarks on Exports (Free & Pro)', cropmark: true, snippingTool: true, snagit: 'Watermarks on trial', sharex: true, greenshot: true },
  { feature: 'Annual / Lifetime Price', cropmark: '$0 (or $18.99 once)', snippingTool: 'Free with Windows', snagit: '$39.00 / yr or $79', sharex: 'Free (Donation)', greenshot: 'Free (Donation)' },
  { feature: 'Native Modern WinUI 3 Architecture', cropmark: true, snippingTool: true, snagit: false, sharex: false, greenshot: false },
  { feature: 'Zero Analytics, Cloud Accounts or Telemetry', cropmark: true, snippingTool: false, snagit: false, sharex: true, greenshot: true },
];

const faqs = [
  {
    question: 'How is Cropmark redaction different from standard screenshot markup tools?',
    answer:
      'Standard screenshot tools often draw a black or blurred rectangle directly over sensitive image pixels as an overlay layer. In many cases, or when adjusted with contrast and brightness filters, the underlying data remains accessible (such as in the well-documented Acropalypse vulnerability). Cropmark permanently zeroes out and overwrites the covered bitmap pixels in memory before file export, ensuring data recovery is mathematically impossible.',
  },
  {
    question: 'Are exported screenshots watermarked?',
    answer:
      'Never. Both the Free version and Cropmark Pro export pristine, publication-grade PNG, JPEG, and PDF documents with zero branding watermarks.',
  },
  {
    question: 'What additional capabilities does Cropmark Pro provide?',
    answer:
      'Cropmark Free includes full region and window capture, annotations, arrows, numbered steps, destructive redaction, and single-image PDF export. Pro ($18.99 one-time or $9.99/year) adds multi-image project management, batch export across multiple captures, and merging several screenshots into a single paginated PDF document.',
  },
  {
    question: 'Does Cropmark require an internet connection or user account?',
    answer:
      'No. Cropmark is built as a local-first native Windows desktop application using Microsoft WinUI 3. It runs entirely offline, requires no login or cloud account, and transmits zero telemetry or user data.',
  },
  {
    question: 'What are the system requirements?',
    answer:
      'Cropmark requires a 64-bit PC running Windows 10 (version 2004 or higher) or Windows 11. It natively supports multi-monitor setups and dynamic high-DPI scaling.',
  },
];

export default function CropmarkPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Cropmark',
        alternateName: 'Cropmark – Screenshot Tool, Annotation & Secure Redaction',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Windows 10, Windows 11',
        description,
        url: 'https://apps.microsoft.com/detail/9NZR4D24CMM6',
        image: `${baseUrl}/cropmark/icon.png`,
        screenshot: ogImageUrl,
        publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier with zero watermarks + $18.99 one-time lifetime Pro upgrade',
        },
        featureList: [
          'Acropalypse-safe destructive pixel redaction',
          'Auto-incrementing numbered step badges',
          'Professional canvas padding and drop shadows',
          'Multi-page PDF export and batch processing',
          'Native WinUI 3 performance with zero telemetry',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Windows Apps', item: `${baseUrl}/apps/windows` },
          { '@type': 'ListItem', position: 3, name: 'Cropmark', item: pageUrl },
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
        name: 'Cropmark — Windows Screenshot Markup & Redaction Demonstration',
        description: 'See verified destructive pixel redaction, numbered step badges, and instant export in action.',
        thumbnailUrl: `${baseUrl}/cropmark/screenshot.png`,
        uploadDate: '2026-10-24T00:00:00Z',
        contentUrl: `${baseUrl}/cropmark/preview.mp4`,
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
        <span className="text-zinc-900 dark:text-zinc-100 font-medium">Cropmark</span>
      </nav>

      {/* Hero Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
            <EyeOff className="w-3.5 h-3.5" />
            <span>Acropalypse-Safe Destructive Redaction</span>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Native WinUI 3 Architecture</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <Image
            src="/cropmark/icon.png"
            alt="Cropmark App Icon"
            width={88}
            height={88}
            className="rounded-2xl shadow-sm border border-black/5 dark:border-white/10 shrink-0"
            priority
          />
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Cropmark
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl font-medium">
              The modern Windows screenshot tool built for technical writers, engineers, and privacy-conscious professionals.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="https://apps.microsoft.com/detail/9NZR4D24CMM6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <span>Get Free on Microsoft Store</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Free tier (Zero watermarks) · $18.99 lifetime Pro or $9.99/yr
          </span>
        </div>

        {/* Winget quick install */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300">
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>winget install 9NZR4D24CMM6</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60 text-xs font-medium">
            <span>🎁</span>
            <span>
              <strong>1-Month Launch Special:</strong> First 10 users get a free lifetime Pro code. Email{' '}
              <a href="mailto:support@tendercrafthq.com?subject=Cropmark%20Pro%20Free%20License%20Request" className="underline font-semibold">
                support@tendercrafthq.com
              </a>
            </span>
          </div>
        </div>
      </header>

      {/* App Screenshot */}
      <section className="space-y-3">
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md bg-zinc-950">
          <Image
            src="/cropmark/screenshot.png"
            alt="Cropmark screenshot markup editor showing numbered step badges and redaction blocks"
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
          />
        </div>
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          Coral markup palette: auto-incrementing step badges, true redaction, and drop-shadow styling.
        </p>
      </section>

      {/* Video Demonstration */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Watch Cropmark in Action
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            See verified destructive pixel redaction, numbered step badges, and instant export in action.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md bg-zinc-950">
          <video
            className="w-full h-auto aspect-video"
            controls
            preload="metadata"
            poster="/cropmark/screenshot.png"
            playsInline
            aria-label="Cropmark screenshot tool demonstration"
          >
            <source src="/cropmark/preview.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* The Acropalypse Problem vs. Cropmark Solution */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Why Superficial Redaction Fails
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 space-y-3">
            <h3 className="font-semibold text-red-900 dark:text-red-200 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>The Insecure Overlay Risk</span>
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Standard capture tools frequently leave original image data intact behind black rectangles, transparent alpha channels, or recoverable crop buffers (CVE-2023-28303 / Acropalypse). Adjusting exposure or reading raw bytes can expose confidential API keys, customer PII, and passwords.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>True Bitmap Pixel Erasing</span>
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Cropmark applies true destructive redaction. Covered pixels are zeroed out directly in the underlying memory bitmap buffer before compression or export. No tool, filter, or binary inspection can ever recover what was erased.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Deep-Dive Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Designed for Clarity and Precision
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <ShieldCheck className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Destructive Pixel Redaction</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Permanently zeroes out sensitive credentials, emails, and balances before file creation. The app verifies pixel destruction prior to saving.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Auto Numbered Step Badges</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Document bug repros and user guides with clean numbered callouts (1, 2, 3...) that increment automatically on click.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <FileText className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Multi-Page PDF Export</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Bundle multiple sequential screenshot steps into a single, clean paginated PDF document without leaving the application.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Palette className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Canvas Border & Shadow Styling</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Turn raw screen snippets into documentation-ready assets with optional canvas padding, rounded corners, and subtle elevation shadows.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Layers className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Multi-Image Projects & Batch Export</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Work on complex walkthroughs with multiple images simultaneously. Apply consistent style presets across all images in one click.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Lock className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Zero Cloud Dependencies</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              No mandatory cloud accounts, no auto-uploading to public URLs, no background telemetry. Everything remains local on your PC.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Cropmark vs. Common Windows Screenshot Tools
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Compare Cropmark against Snipping Tool, Snagit, ShareX, and Greenshot.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Capability</th>
                <th className="p-4 font-bold text-rose-600 dark:text-rose-400">Cropmark</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Snipping Tool</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Snagit</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">ShareX</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Greenshot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {comparisonData.map((row, i) => (
                <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40">
                  <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100">{row.feature}</td>
                  <td className="p-4 font-bold text-rose-600 dark:text-rose-400">
                    {typeof row.cropmark === 'boolean' ? (
                      row.cropmark ? <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.cropmark
                    )}
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">
                    {typeof row.snippingTool === 'boolean' ? (
                      row.snippingTool ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.snippingTool
                    )}
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">
                    {typeof row.snagit === 'boolean' ? (
                      row.snagit ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.snagit
                    )}
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">
                    {typeof row.sharex === 'boolean' ? (
                      row.sharex ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.sharex
                    )}
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">
                    {typeof row.greenshot === 'boolean' ? (
                      row.greenshot ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.greenshot
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

      {/* Guides & Resources */}
      <section className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Related Guides & In-Depth Walkthroughs
        </h3>
        <Link
          href="/apps/cropmark/how-to-permanently-redact-screenshots"
          className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/60 hover:border-rose-500 transition-colors text-xs font-semibold text-zinc-900 dark:text-zinc-100"
        >
          <span>How to Permanently Redact Screenshots on Windows (Acropalypse-Safe) →</span>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </Link>
      </section>

      {/* Technical Metadata & Directory Info */}
      <section className="p-6 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span><strong>Publisher:</strong> Tendercraft · <strong>Product ID:</strong> 9NZR4D24CMM6</span>
          <div className="flex items-center gap-4">
            <a href="https://tendercrafthq.com/cropmark/pad.xml" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5" />
              <span>PAD XML Manifest</span>
            </a>
            <Link href="/cropmark/privacy.html" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>
        <p>
          Native Windows app built with WinUI 3 and .NET 8. Exports clean PNG, JPEG, and PDF files directly to your storage without telemetry.
        </p>
      </section>

      {/* Mobile Reminder */}
      <MobileReminderCard
        appName="Cropmark"
        url="https://tendercrafthq.com/apps/cropmark"
        wingetCommand="winget install 9NZR4D24CMM6"
        tagline="Cropmark is a native Windows 11 & 10 desktop application."
      />

      {/* Bottom CTA Card */}
      <section className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-rose-600 to-red-700 text-white text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Capture, Redact, and Export with Confidence
        </h2>
        <p className="text-rose-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Download Cropmark free on the Microsoft Store. Never leak confidential credentials or send unverified screenshots again.
        </p>
        <div className="pt-2">
          <a
            href="https://apps.microsoft.com/detail/9NZR4D24CMM6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-zinc-100 text-rose-700 shadow-md transition-colors"
          >
            <span>Get Cropmark on Microsoft Store</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
