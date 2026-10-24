import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import {
  ShieldCheck,
  Cpu,
  Volume2,
  Sparkles,
  BookOpen,
  Sliders,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ChevronRight,
  Clock,
  Lock,
  Download,
  FileText,
  FileCode,
} from 'lucide-react';

const baseUrl = getSiteUrl();
const pageUrl = `${baseUrl}/apps/vox-reader`;
const ogImageUrl = `${baseUrl}/vox-reader/screenshot.png`;
const description =
  'Listen to EPUB, PDF, Word documents (DOCX), and articles in natural neural voices completely offline on Windows 11 & 10. Fast on-device synthesis with zero cloud uploads and no subscriptions.';

export const metadata: Metadata = {
  title: 'Vox Reader — Offline Text to Speech & Audiobook Player for Windows',
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Vox Reader — Offline Text to Speech & Audiobook Player for Windows',
    description,
    url: pageUrl,
    type: 'website',
    images: [{ url: ogImageUrl, width: 1200, height: 675, alt: 'Vox Reader offline text-to-speech reader interface' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vox Reader — Offline Text to Speech for Windows',
    description,
    images: [ogImageUrl],
  },
};

const comparisonData = [
  { feature: 'Runs 100% Offline', vox: true, speechify: false, naturalReader: false, browserExt: false },
  { feature: 'Personal Documents Never Uploaded', vox: true, speechify: false, naturalReader: false, browserExt: false },
  { feature: 'No Account or Registration Required', vox: true, speechify: false, naturalReader: false, browserExt: true },
  { feature: 'One-Time Payment Option ($18.99 Lifetime)', vox: true, speechify: false, naturalReader: false, browserExt: false },
  { feature: 'Annual Cost', vox: '$0 (or $18.99 once)', speechify: '$139.00 / year', naturalReader: '$119.88 / year', browserExt: '$0 - $49 / yr' },
  { feature: 'EPUB, TXT, PDF, & DOCX Support', vox: true, speechify: true, naturalReader: true, browserExt: false },
  { feature: 'Synchronized Sentence Highlighting', vox: true, speechify: true, naturalReader: true, browserExt: true },
  { feature: 'Zero Telemetry & Zero Ads', vox: true, speechify: false, naturalReader: false, browserExt: false },
];

const faqs = [
  {
    question: 'Does Vox Reader work completely without an internet connection?',
    answer:
      'Yes. High-quality neural voice synthesis runs 100% locally on your computer’s CPU/GPU using packaged on-device neural models. Once installed from the Microsoft Store, you can use Vox Reader completely offline on flights, commutes, or in air-gapped environments.',
  },
  {
    question: 'How does the free tier work?',
    answer:
      'Vox Reader provides a generous free tier that gives you 3 hours of natural neural voice playback every single week, resetting automatically every Monday. You can read, search, bookmark, and organize your entire EPUB and TXT library without ever paying. The optional Pro upgrade ($18.99 one-time) unlocks permanent unlimited listening, all 11 English voices, custom pronunciations, and PDF/DOCX import.',
  },
  {
    question: 'Is there a recurring monthly or yearly subscription?',
    answer:
      'No. There is zero subscription fatigue. Unlike cloud services that charge $10 to $15 every month forever, Vox Reader Pro is a single one-time lifetime license fulfilled securely through the Microsoft Store.',
  },
  {
    question: 'Are my books or personal documents uploaded to any remote server?',
    answer:
      'Never. Vox Reader has no cloud servers, no account registration, no document upload endpoints, and zero telemetry. All text processing and audio generation happens exclusively in local device memory.',
  },
  {
    question: 'What document formats can I listen to?',
    answer:
      'The free tier supports DRM-free EPUB ebooks, plain text files (.txt), and text pasted directly from the clipboard. The Pro tier adds support for text-based PDF documents and Microsoft Word (.docx) files.',
  },
  {
    question: 'What are the system requirements?',
    answer:
      'A 64-bit PC running Windows 10 (version 2004 or later) or Windows 11. Speech runs natively on your CPU, so no specialized discrete GPU is mandatory.',
  },
];

export default function VoxReaderPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Vox Reader',
        alternateName: 'Vox Reader – Offline Text to Speech & Audiobook Player',
        applicationCategory: 'AudioApplication',
        operatingSystem: 'Windows 10, Windows 11',
        description,
        url: 'https://apps.microsoft.com/detail/9PCVQB5H684W',
        image: `${baseUrl}/vox-reader/icon.png`,
        screenshot: ogImageUrl,
        publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier with 3 hours/week + $18.99 one-time lifetime Pro upgrade',
        },
        featureList: [
          'On-device neural speech synthesis',
          'Synchronized real-time sentence tracking',
          'EPUB, TXT, PDF, and DOCX playback',
          '0.5x to 3.0x speed adjustment and sleep timer',
          'Zero cloud telemetry and air-gapped privacy',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Windows Apps', item: `${baseUrl}/apps/windows` },
          { '@type': 'ListItem', position: 3, name: 'Vox Reader', item: pageUrl },
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
        name: 'Vox Reader — Offline Text-to-Speech Demonstration',
        description: 'Watch offline neural text-to-speech reading on Windows with synchronized sentence tracking.',
        thumbnailUrl: `${baseUrl}/vox-reader/screenshot.png`,
        uploadDate: '2026-10-24T00:00:00Z',
        contentUrl: `${baseUrl}/vox-reader/preview.mp4`,
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
        <span className="text-zinc-900 dark:text-zinc-100 font-medium">Vox Reader</span>
      </nav>

      {/* Hero Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
            <Cpu className="w-3.5 h-3.5" />
            <span>100% Offline Neural Voice Synthesis</span>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Windows 11 & 10 Native</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <Image
            src="/vox-reader/icon.png"
            alt="Vox Reader App Icon"
            width={88}
            height={88}
            className="rounded-2xl shadow-sm border border-black/5 dark:border-white/10 shrink-0"
            priority
          />
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Vox Reader
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl font-medium">
              Listen to books and documents in natural neural voices without sending a single sentence to the cloud.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="https://apps.microsoft.com/detail/9PCVQB5H684W"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <span>Get Free on Microsoft Store</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Free tier (3 hrs/wk) · Optional $18.99 lifetime Pro (no subscriptions)
          </span>
        </div>

        {/* Winget quick install */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300">
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          <span>winget install 9PCVQB5H684W</span>
        </div>
      </header>

      {/* App Screenshot */}
      <section className="space-y-3">
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md bg-zinc-950">
          <Image
            src="/vox-reader/screenshot.png"
            alt="Vox Reader interface showing synchronized sentence highlighting and book library"
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
          />
        </div>
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          Dark mode reader view with real-time sentence illumination, audio waveform, and precision playback controls.
        </p>
      </section>

      {/* Video Demonstration */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Watch Vox Reader in Action
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            See synchronized sentence tracking and neural voice playback in a real reading session.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md bg-zinc-950">
          <video
            className="w-full h-auto aspect-video"
            controls
            preload="metadata"
            poster="/vox-reader/screenshot.png"
            playsInline
            aria-label="Vox Reader offline neural text-to-speech demonstration"
          >
            <source src="/vox-reader/preview.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Why Vox Reader — Problem vs Solution */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Why an Offline Neural Reader?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 space-y-3">
            <h3 className="font-semibold text-red-900 dark:text-red-200 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>The Cloud TTS Problem</span>
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Mainstream reading apps charge $10 to $15 every month ($120+ annually) and require constant internet connectivity. Every book chapter, personal document, or work contract you read aloud is transmitted to their remote servers for voice processing.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>The Vox Reader Difference</span>
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Vox Reader runs modern lightweight neural TTS models directly on your Windows PC. Voice synthesis happens instantaneously without cloud lag, works completely offline, protects your confidential documents, and offers an honest lifetime purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Deep-Dive Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Key Features Built for Readers
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">On-Device Neural Synthesis</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              High-fidelity English voices running natively on your CPU. Natural inflection and cadence without robotic mechanical tones.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Synchronized Highlighting</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Follow along effortlessly. Sentences illuminate in real time as the audio voice speaks, supporting reading focus and ADHD comprehension.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Format Freedom</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Import DRM-free EPUB ebooks and TXT files free. Pro unlocks text-based PDF documents and Microsoft Word (.docx) files.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Playback & Speed Controls</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Fine-tune reading speed from 0.5× up to 3.0×, set automatic sleep timers, skip 15 seconds backward or forward, and save bookmarks.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">100% Air-Gapped Privacy</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Zero cloud telemetry, no analytics, no accounts. Documents, bookmarks, and reading history remain entirely on your local machine.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Volume2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Custom Pronunciation Editor</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Easily customize how fictional names, acronyms, technical terms, or medical jargon are spoken across your library.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Vox Reader vs. Mainstream Alternatives
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            How Vox Reader stacks up against popular cloud text-to-speech services.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Capability</th>
                <th className="p-4 font-bold text-blue-600 dark:text-blue-400">Vox Reader</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Speechify</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">NaturalReader</th>
                <th className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Browser Extensions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {comparisonData.map((row, i) => (
                <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40">
                  <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100">{row.feature}</td>
                  <td className="p-4 font-bold text-blue-600 dark:text-blue-400">
                    {typeof row.vox === 'boolean' ? (
                      row.vox ? <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.vox
                    )}
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">
                    {typeof row.speechify === 'boolean' ? (
                      row.speechify ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.speechify
                    )}
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">
                    {typeof row.naturalReader === 'boolean' ? (
                      row.naturalReader ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.naturalReader
                    )}
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">
                    {typeof row.browserExt === 'boolean' ? (
                      row.browserExt ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      row.browserExt
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
          href="/apps/vox-reader/listen-to-books-offline-windows"
          className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors text-xs font-semibold text-zinc-900 dark:text-zinc-100"
        >
          <span>How to Listen to EPUB & PDF Books Offline on Windows 11 & 10 →</span>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </Link>
      </section>

      {/* Technical Metadata & Directory Info */}
      <section className="p-6 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span><strong>Publisher:</strong> Tendercraft · <strong>Product ID:</strong> 9PCVQB5H684W</span>
          <div className="flex items-center gap-4">
            <a href="https://tendercrafthq.com/vox-reader/pad.xml" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5" />
              <span>PAD XML Manifest</span>
            </a>
            <Link href="/vox-reader/privacy.html" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>
        <p>
          Offline voice synthesis models are bundled with the software and execute on-device. No network connectivity is initiated during voice generation.
        </p>
      </section>

      {/* Bottom CTA Card */}
      <section className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-blue-600 to-indigo-700 text-white text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Start Listening on Your Windows PC
        </h2>
        <p className="text-blue-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Download Vox Reader free from the Microsoft Store today. 3 hours of listening included every week with zero subscriptions.
        </p>
        <div className="pt-2">
          <a
            href="https://apps.microsoft.com/detail/9PCVQB5H684W"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-zinc-100 text-blue-700 shadow-md transition-colors"
          >
            <span>Get Vox Reader on Microsoft Store</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
