import React from 'react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { getSiteUrl } from '@/lib/site';

const siteUrl = getSiteUrl();

export const metadata = {
  title: 'Privacy Notice',
  description: 'Tendercraft privacy and data handling practices.',
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: 'Privacy Notice — Tendercraft',
    description: 'Tendercraft privacy and data handling practices.',
    url: `${siteUrl}/privacy`,
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
              Last updated: November 15, 2026
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-8 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                1. Our Commitment
              </h2>
              <p>
                This website is operated by Tendercraft Technologies Limited (RC 10003239), a private company registered in Nigeria, which is the data controller for the information described here. We handle personal data in line with the Nigeria Data Protection Act 2023. We believe in minimal data collection: we do not use advertising networks or sell personal data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                2. Project Enquiries and Contact Information
              </h2>
              <p>
                When you submit a project enquiry through our contact form or contact us directly via email at <code className="text-blue-600 font-mono">hello@tendercrafthq.com</code> or <code className="text-blue-600 font-mono">yyautama@tendercrafthq.com</code>, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-zinc-600 dark:text-zinc-400">
                <li>Your name and business email address</li>
                <li>Project description, technical scope, and requirements you provide</li>
                <li>Anticipated budget range and target delivery timeline</li>
              </ul>
              <p>
                We use this information solely to evaluate project feasibility, prepare initial architecture and scoping notes, and correspond directly with you. We retain project enquiry records in our secured studio database only as long as necessary to manage our active correspondence and professional engagements. We never sell, rent, or distribute your enquiry data to third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                3. Cookies and Analytics
              </h2>
              <p>
                If you accept analytics cookies in the banner shown on your first visit, this website uses Microsoft Clarity to understand how pages are used so we can improve them. Nothing is loaded if you decline. Clarity sets cookies and records how visitors interact with the site, such as pages viewed, clicks, scrolling, device and browser type, and approximate location. This data is processed by Microsoft; see the{' '}
                <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft Privacy Statement</a>. To change your choice, clear this site&apos;s data in your browser and the banner will ask again, or block cookies and scripts from <code className="font-mono">clarity.ms</code>.
              </p>
              <p>
                We also use cookies for authenticated administrative sessions in the private studio portal (<code className="font-mono">/admin</code>). Our apps are separate from this website and have their own privacy policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                4. Third-Party Hosting and Infrastructure
              </h2>
              <p>
                This website is hosted on Vercel and secured with Cloudflare DNS and routing. These infrastructure providers may log standard network requests (e.g., client IP address, request method, user agent) to maintain uptime, protect against DDoS attacks, and enforce secure HTTPS connections.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                5. Questions and Contact
              </h2>
              <p>
                For any questions regarding this privacy notice or to access, correct or delete your personal data, please contact us directly at <a href="mailto:hello@tendercrafthq.com" className="text-blue-600 hover:underline font-mono tracking-tight font-semibold">hello@tendercrafthq.com</a>.
              </p>
            </section>
          </div>
        </article>
      </SectionWrapper>
    </div>
  );
}
