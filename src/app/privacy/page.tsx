import React from 'react';
import { SectionWrapper } from '@/components/SectionWrapper';

export const metadata = {
  title: 'Privacy Notice',
  description: 'Tendercraft privacy and data handling practices.',
  alternates: {
    canonical: 'https://tendercrafthq.com/privacy',
  },
  openGraph: {
    title: 'Privacy Notice — Tendercraft',
    description: 'Tendercraft privacy and data handling practices.',
    url: 'https://tendercrafthq.com/privacy',
    siteName: 'Tendercraft',
    type: 'website',
    images: [
      {
        url: '/brand/tendercraft-og.png',
        width: 1200,
        height: 630,
        alt: 'Tendercraft Privacy Notice',
      },
    ],
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24 pb-24">
      <SectionWrapper size="md">
        <article className="space-y-10">
          <div className="space-y-4 pb-8 border-b border-black/[0.08] dark:border-white/[0.08]">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              Transparency
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Privacy Notice
            </h1>
            <p className="text-sm text-zinc-500 font-mono">
              Last updated: September 19, 2026
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-8 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                1. Our Commitment
              </h2>
              <p>
                Tendercraft believes in minimal data collection and respectful software design. We do not track you across the web, use behavioral advertising networks, or monetize personal data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                2. Information We Receive
              </h2>
              <p>
                When you contact us directly via email at <code className="text-blue-600 font-mono">hello@tendercrafthq.com</code> or <code className="text-blue-600 font-mono">yyautama@tendercrafthq.com</code>, we receive your email address, name, and whatever project context you choose to share. We use this information solely to review your inquiry and respond to your message.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                3. Cookies and Session Storage
              </h2>
              <p>
                Public visitors to <code className="font-mono">tendercrafthq.com</code> receive no tracking cookies. Cookies are strictly utilized for authenticated sessions in the private studio administration portal (<code className="font-mono">/admin</code>).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                4. Third-Party Hosting and Infrastructure
              </h2>
              <p>
                This website is hosted on Vercel and secured with Cloudflare DNS and routing. These infrastructure providers may log standard network requests (e.g. IP address, user agent) to maintain uptime, protect against DDoS attacks, and provision secure HTTPS connections.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                5. Questions and Contact
              </h2>
              <p>
                For questions regarding this privacy notice, contact us directly at <a href="mailto:hello@tendercrafthq.com" className="text-blue-600 hover:underline">hello@tendercrafthq.com</a>.
              </p>
            </section>
          </div>
        </article>
      </SectionWrapper>
    </div>
  );
}
