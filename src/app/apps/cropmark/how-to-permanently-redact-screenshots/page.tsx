import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { ChevronRight, ArrowUpRight, ShieldCheck, EyeOff, AlertTriangle, CheckCircle2 } from 'lucide-react';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}/apps/cropmark/how-to-permanently-redact-screenshots`;
const description =
  'Learn why drawing black bars on screenshots often leaks sensitive passwords and PII (Acropalypse flaw), and how to safely destroy underlying bitmap pixels on Windows.';

export const metadata: Metadata = {
  title: 'How to Permanently Redact Screenshots on Windows (Acropalypse-Safe)',
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'How to Permanently Redact Screenshots on Windows (Acropalypse-Safe)',
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
    headline: 'How to Permanently Redact Screenshots on Windows (Acropalypse-Safe)',
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
          Drawing black rectangles or using blur tools often fails to erase sensitive text. Here is how modern image formats leak confidential data, and how to verify that pixels are truly destroyed before export.
        </p>
      </header>

      {/* Content Body */}
      <div className="space-y-10 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Why Drawing Black Bars Isn't Safe
          </h2>
          <p>
            When sharing bug reports, API documentation, or customer receipts, team members routinely hide API tokens, email addresses, and credit card numbers. However, traditional methods frequently leave data vulnerable:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Alpha Transparency & Soft Edges:</strong> Markers and highlighter tools in standard markup software often use semi-transparent brushes. Anyone adjusting the exposure, contrast, or levels in an image viewer can easily read the text beneath.
            </li>
            <li>
              <strong>Recoverable PNG Buffers (Acropalypse):</strong> In CVE-2023-28303, cropped or edited PNGs saved by built-in operating system snipping tools left trailing uncompressed data at the end of the file. Attackers developed automated tools to reconstruct the cropped-out areas.
            </li>
            <li>
              <strong>Layered PDF Retaining Hidden Elements:</strong> Merging screenshots into PDFs often stores the black box as an editable vector shape floating over the raster image. Deleting the box in any PDF editor reveals the text below.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            True Destructive Redaction: Zeroing the Pixels
          </h2>
          <p>
            To be mathematically secure, an application must perform <strong>destructive in-memory pixel eradication</strong>. This means modifying the raw raster array in RAM by setting the red, green, blue, and alpha bytes of the covered coordinates to pure solid color (or 0x00) before any encoding, compression, or file writing takes place.
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
            Cropmark solid redaction blocks: pixels are permanently erased from memory before file output.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            How to Redact with Cropmark
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-sm">
            <li>
              <strong>Capture Any Window or Screen:</strong> Use your global keyboard shortcut or click the floating capture widget to select the desired region.
            </li>
            <li>
              <strong>Select the Redact Tool:</strong> Click the Redaction tool on the toolbar. Drag a box across the sensitive text, password field, or credentials.
            </li>
            <li>
              <strong>Export with Confidence:</strong> Save to PNG, JPEG, or multi-page PDF, or copy to your clipboard. Cropmark inspects the memory buffer prior to saving to guarantee zero pixel recovery.
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Zero Watermarks on Free & Pro
          </h2>
          <p>
            Unlike commercial tools that slap obnoxious trial watermarks across your images, Cropmark exports completely clean graphics on both the Free tier and Pro unlock.
          </p>
        </section>
      </div>

      {/* Call to Action Box */}
      <footer className="p-6 sm:p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
          Protect confidential data in every screenshot
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Download Cropmark free on the Microsoft Store and create safe, documentation-ready markup without data leaks.
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
