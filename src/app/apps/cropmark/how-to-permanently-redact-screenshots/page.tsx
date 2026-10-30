import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { ChevronRight, ArrowUpRight, EyeOff } from 'lucide-react';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}/apps/cropmark/how-to-permanently-redact-screenshots`;
const description =
  'Redact screenshots on Windows with solid pixel replacement. Learn when overlays can expose content, review the exported file, and keep sensitive originals private.';

export const metadata: Metadata = {
  title: 'How to Permanently Redact Screenshots on Windows',
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'How to Permanently Redact Screenshots on Windows',
    description,
    url: pageUrl,
    type: 'article',
    images: [{ url: `${baseUrl}/cropmark/screenshot.png`, width: 1200, height: 675, alt: 'Cropmark secure screenshot redaction interface' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Permanently Redact Screenshots on Windows',
    description,
    images: [`${baseUrl}/cropmark/screenshot.png`],
  },
};

export default function HowToRedactScreenshotsGuide() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Permanently Redact Screenshots on Windows',
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
        <Link href="/apps/cropmark" className="hover:underline">Cropmark</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-medium text-zinc-900 dark:text-zinc-100">Redaction Security Guide</span>
      </nav>

      {/* Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
          <EyeOff className="w-3.5 h-3.5" />
          <span>Security & Privacy Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          How to Permanently Redact Screenshots on Windows
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Use solid redaction to replace sensitive pixels, then review the exported image. Translucent markers and editable overlays can leave content accessible; a fully opaque, flattened replacement does not have that same overlay risk.
        </p>
      </header>

      {/* Content Body */}
      <div className="space-y-10 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            When Markup Leaves Sensitive Content Accessible
          </h2>
          <p>
            When sharing bug reports, API documentation, or customer receipts, team members routinely hide API tokens, email addresses, and credit card numbers. However, traditional methods frequently leave data vulnerable:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Alpha Transparency & Soft Edges:</strong> A semi-transparent brush can leave text visible beneath the mark. Use a solid, opaque replacement and cover the full area, including edges.
            </li>
            <li>
              <strong>Keep capture tools updated:</strong> Export behavior depends on the tool and file format. Use a current version and inspect the exported result rather than assuming an editable project is safe to share.
            </li>
            <li>
              <strong>Editable layers:</strong> An overlay in an editable image or PDF may be removable. Share an export where the sensitive image pixels have been replaced, and keep the editable source private.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Replace Pixels in the Exported Image
          </h2>
          <p>
            A redaction export should replace the covered image pixels with a solid color before encoding the output. <strong>Cropmark replaces the covered pixels and checks the result before saving.</strong> This does not remove information from separate originals, backups, or editable project files.
          </p>
          <p>
            <strong>Cropmark</strong> was built specifically to solve this problem for developers, engineers, and support teams.
          </p>

          <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm mt-6">
            <Image
              src="/cropmark/screenshot.png"
              alt="Cropmark solid destructive redaction blocks on Windows 11"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs text-center text-zinc-500">
            Cropmark solid redaction blocks replace covered pixels in the exported image.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            How to Redact with Cropmark
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-sm">
            <li>
              <strong>Capture a Region or Full Screen:</strong> Use your global keyboard shortcut or click the floating capture widget to select the desired region.
            </li>
            <li>
              <strong>Select the Redact Tool:</strong> Click the Redaction tool on the toolbar. Drag a box across the sensitive text, password field, or credentials.
            </li>
            <li>
              <strong>Review the Export:</strong> Export PNG, JPEG, or a single-image PDF; Pro can merge multiple images into a PDF. Open the exported file, zoom in, and check that every sensitive area is covered. Share this output rather than the editable project or original capture.
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Zero Watermarks on Free & Pro
          </h2>
          <p>
            Cropmark exports images without watermarks in both Free and Pro.
          </p>
        </section>
      </div>

      {/* Call to Action Box */}
      <footer className="p-6 sm:p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
          Protect confidential data in every screenshot
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Download Cropmark free on the Microsoft Store to capture, annotate, and redact screenshots on your PC.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="https://apps.microsoft.com/detail/9NZR4D24CMM6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors"
          >
            <span>Get Cropmark Free</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <Link href="/apps/cropmark" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:underline">
            View full technical specifications →
          </Link>
        </div>
      </footer>
    </article>
  );
}
