import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { ShieldCheck, Layers, FileText, Palette, CheckCircle2, XCircle, ArrowUpRight, ChevronRight, Lock, Download, FileCode, Sparkles, EyeOff } from 'lucide-react';
import { MobileReminderCard } from '@/components/MobileReminderCard';
import { WindowsComparisonLinks } from '@/components/WindowsComparison';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}/apps/cropmark`;
const ogImageUrl = `${baseUrl}/cropmark/screenshot.png`;
const description =
  'Capture and annotate screenshots on Windows. Replace covered pixels with solid redaction, add numbered steps, and export without watermarks. Pro adds batch export.';

export const metadata: Metadata = {
  title: 'Cropmark — Screenshot Redaction & PDF Export for Windows',
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Cropmark — Screenshot Redaction & PDF Export for Windows',
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


const faqs = [
  {
    question: 'How is Cropmark redaction different from standard screenshot markup tools?',
    answer:
      'Cropmark replaces the covered pixels with a solid color in exported images and checks the result before saving. Use the solid redaction tool, cover the entire sensitive area, and review the exported file before sharing. Original captures and editable projects may still contain the original content; share the redacted export.',
  },
  {
    question: 'Are exported screenshots watermarked?',
    answer:
      'Never. Both the Free version and Cropmark Pro export pristine, publication-grade PNG, JPEG, and PDF documents with zero branding watermarks.',
  },
  {
    question: 'What additional capabilities does Cropmark Pro provide?',
    answer:
      'Cropmark Free includes region and full-screen capture, arrows, text, numbered steps, solid redaction, and single-image PDF export. Pro adds multi-image projects, batch export, saved styles, and merging screenshots into one PDF. One-time and yearly Pro options are available; the Microsoft Store shows the current price for your region.',
  },
  {
    question: 'Does Cropmark require an internet connection or user account?',
    answer:
      'No. Cropmark is built as a local-first native Windows desktop application using Microsoft WinUI 3. It runs entirely offline, requires no login or cloud account, and transmits zero telemetry or user data.',
  },
  {
    question: 'What are the system requirements?',
    answer:
      'The current Microsoft Store package requires a 64-bit PC running Windows 11 (build 22000 or later). It natively supports multi-monitor setups and dynamic high-DPI scaling.',
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
        operatingSystem: 'Windows 11',
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
          'Solid pixel-replacing redaction on export',
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
            <span>Solid Screenshot Redaction</span>
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
              Cropmark — Screenshot, Annotate & Redact on Windows 11
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
              <strong>Launch offer until 25 November 2026:</strong> the first 10 people who ask get a free Cropmark Pro code, redeemed in the Microsoft Store. Email{' '}
              <a href="mailto:hello@tendercrafthq.com?subject=Cropmark%20Pro%20Free%20License%20Request" className="underline font-semibold">
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
              A translucent marker or editable overlay can leave the original content visible or accessible. A solid, flattened replacement of the covered pixels serves a different purpose. Review the exported file and avoid sharing editable projects containing sensitive originals.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>True Bitmap Pixel Erasing</span>
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Cropmark replaces pixels within the redaction area before export and checks the output before saving. This applies to the exported result, not to separate original files, backups, or editable projects.
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

      {/* Free and Pro capabilities */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Cropmark Free and Pro</h2>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Features available in Cropmark Free and Pro</caption>
            <thead className="bg-zinc-50 dark:bg-zinc-900/80">
              <tr><th scope="col" className="p-4">Feature</th><th scope="col" className="p-4">Free</th><th scope="col" className="p-4 text-rose-600 dark:text-rose-400">Pro</th></tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr><th scope="row" className="p-4 font-medium">Region and full-screen capture</th><td className="p-4">Included</td><td className="p-4">Included</td></tr>
              <tr><th scope="row" className="p-4 font-medium">Arrows, text, numbered steps, and redaction</th><td className="p-4">Included</td><td className="p-4">Included</td></tr>
              <tr><th scope="row" className="p-4 font-medium">PNG, JPEG, and single-image PDF export</th><td className="p-4">Included, no watermark</td><td className="p-4">Included, no watermark</td></tr>
              <tr><th scope="row" className="p-4 font-medium">Single-image projects</th><td className="p-4">Included</td><td className="p-4">Included</td></tr>
              <tr><th scope="row" className="p-4 font-medium">Multi-image projects and batch export</th><td className="p-4">Requires Pro</td><td className="p-4">Included</td></tr>
              <tr><th scope="row" className="p-4 font-medium">Merge images into one PDF; saved styles</th><td className="p-4">Requires Pro</td><td className="p-4">Included</td></tr>
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
          <span>How to Permanently Redact Screenshots on Windows →</span>
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

      <WindowsComparisonLinks app="cropmark" />

      {/* Mobile Reminder */}
      <MobileReminderCard
        appName="Cropmark"
        url="https://tendercrafthq.com/apps/cropmark"
        wingetCommand="winget install 9NZR4D24CMM6"
        tagline="Cropmark requires a 64-bit PC running Windows 11 (build 22000 or later)."
      />

      {/* Bottom CTA Card */}
      <section className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-rose-600 to-red-700 text-white text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Capture, Redact, and Export with Confidence
        </h2>
        <p className="text-rose-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Download Cropmark free on the Microsoft Store. Add clear instructions, cover sensitive details, and review the exported file before sharing. Original captures and editable projects may still contain the original content.
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
