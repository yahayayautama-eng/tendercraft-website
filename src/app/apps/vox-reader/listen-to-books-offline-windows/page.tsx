import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { ChevronRight, ArrowUpRight, Cpu } from 'lucide-react';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}/apps/vox-reader/listen-to-books-offline-windows`;
const description =
  'A complete guide to turning EPUB ebooks, text-based PDFs, and articles into natural speech on Windows 11 & 10 completely offline. No subscriptions, no cloud uploads.';

export const metadata: Metadata = {
  title: 'How to Listen to EPUB & PDF Books Offline on Windows',
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'How to Listen to EPUB & PDF Books Offline on Windows',
    description,
    url: pageUrl,
    type: 'article',
    images: [{ url: `${baseUrl}/vox-reader/screenshot.png`, width: 1200, height: 675, alt: 'Vox Reader offline audio playback interface' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Listen to EPUB & PDF Books Offline on Windows',
    description,
    images: [`${baseUrl}/vox-reader/screenshot.png`],
  },
};

export default function ListenToBooksOfflineGuide() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Listen to EPUB & PDF Books Offline on Windows 11 & 10',
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
        <Link href="/apps/vox-reader" className="hover:underline">Vox Reader</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-medium text-zinc-900 dark:text-zinc-100">Offline Reading Guide</span>
      </nav>

      {/* Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
          <Cpu className="w-3.5 h-3.5" />
          <span>Windows Desktop Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          How to Listen to EPUB & PDF Books Offline on Windows
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Listen to DRM-free EPUB and TXT books using English voices generated on your PC. Vox Reader reads aloud offline after installation; Pro adds text-based PDF and Word import.
        </p>
      </header>

      {/* Content Body */}
      <div className="space-y-10 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Choose a Reader for Your Documents and Connection
          </h2>
          <p>
            Before choosing a reader, check how it handles your documents and what remains available without an internet connection:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Pricing:</strong> Check the free allowance and whether paid access is a subscription or a one-time purchase.</li>
            <li><strong>Document handling:</strong> Check whether speech is generated on your PC and whether documents are uploaded.</li>
            <li><strong>Offline use:</strong> Verify that reading aloud works with your connection disabled after installation.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            The Solution: On-Device Neural Synthesis
          </h2>
          <p>
            Vox Reader uses packaged English voice models to generate speech on your CPU. Your documents stay on your PC. Loading a voice can take several seconds, and performance depends on the computer.
          </p>
          <p>
            By bundling optimized ONNX voice models directly inside the application installer, <strong>Vox Reader</strong> performs all phoneme processing and audio rendering entirely on your PC.
          </p>

          <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm mt-6">
            <Image
              src="/vox-reader/screenshot.png"
              alt="Vox Reader interface with synchronized sentence illumination"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs text-center text-zinc-500">
            Vox Reader illuminated reading canvas: sentences highlight in real time as local neural voices speak.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Step-by-Step: Listening to Books with Vox Reader
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-sm">
            <li>
              <strong>Install Vox Reader:</strong> Download the app directly from the{' '}
              <a href="https://apps.microsoft.com/detail/9PCVQB5H684W" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-medium">
                Microsoft Store
              </a>{' '}
              or via command line using <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs">winget install --id 9PCVQB5H684W --exact --source msstore</code>.
            </li>
            <li>
              <strong>Import Your DRM-Free EPUB or TXT:</strong> Drag and drop any .epub or .txt file directly into the Vox Reader library window.
            </li>
            <li>
              <strong>Select a Neural Voice:</strong> Choose an English voice with a US or UK accent and adjust the playback rate. Higher speeds can pause while your CPU generates more speech.
            </li>
            <li>
              <strong>Press Play:</strong> Listen aloud as the current sentence illuminates on-screen in real time. Your progress, chapters, and bookmarks are automatically saved to your local drive.
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Honest Pricing: Free Allowance & Lifetime Unlock
          </h2>
          <p>
            Vox Reader Free includes 3 hours of listening each week, resetting on Monday. Pro is a one-time purchase that adds unlimited listening, all 11 English voices, custom pronunciations, and text-based PDF/Word import. The Microsoft Store shows the current regional price. Buying or refreshing Pro requires an internet connection; reading aloud works offline.
          </p>
        </section>
      </div>

      {/* Call to Action Box */}
      <footer className="p-6 sm:p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
          Ready to experience offline reading?
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Download Vox Reader on the Microsoft Store and listen to your books anywhere without cloud subscriptions.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="https://apps.microsoft.com/detail/9PCVQB5H684W"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
          >
            <span>Get Vox Reader Free</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <Link href="/apps/vox-reader" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:underline">
            View full technical specifications →
          </Link>
        </div>
      </footer>
    </article>
  );
}
