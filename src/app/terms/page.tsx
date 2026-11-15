import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/SectionWrapper';
import { getSiteUrl } from '@/lib/site';

const siteUrl = getSiteUrl();
const SUPPORT = 'hello@tendercrafthq.com';

export const metadata = {
  title: 'Terms',
  description: 'Terms of sale and use for Tendercraft apps and this website, including refunds.',
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
};

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: '1. Who we are',
    body: (
      <p>
        Tendercraft is a trading name of Tendercraft Technologies Limited (RC 10003239), a private company registered in
        Nigeria. These terms cover this website and the apps we publish.
      </p>
    ),
  },
  {
    title: '2. Apps bought through an app store',
    body: (
      <p>
        Our Windows apps are sold through the Microsoft Store and our Fire tablet apps through the Amazon Appstore.
        Payment, billing and refunds for those purchases are handled by that store under its own terms. If something is
        wrong with an app, email us and we will help.
      </p>
    ),
  },
  {
    title: '3. Template Delivery Kit and refunds',
    body: (
      <p>
        Template Delivery Kit is sold directly, with payment processed by Lemon Squeezy as merchant of record. If it is
        not right for you, email <a href={`mailto:${SUPPORT}`} className="text-blue-600 hover:underline font-mono">{SUPPORT}</a>{' '}
        within 14 days of purchase for a full refund.
      </p>
    ),
  },
  {
    title: '4. Licence',
    body: (
      <p>
        When you buy or download one of our apps you get a licence to use it, for personal or business use. You may not
        resell, redistribute or reverse engineer the app, except where the law allows it.
      </p>
    ),
  },
  {
    title: '5. Warranty and liability',
    body: (
      <p>
        We work hard to make our apps reliable, but they are provided as they are, without a guarantee that they will be
        error-free or fit a particular purpose. To the extent the law allows, our liability for any claim is limited to
        the amount you paid for the app. Nothing in these terms removes rights you have under consumer law.
      </p>
    ),
  },
  {
    title: '6. Governing law',
    body: <p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>,
  },
  {
    title: '7. Contact',
    body: (
      <p>
        Questions about these terms? Email{' '}
        <a href={`mailto:${SUPPORT}`} className="text-blue-600 hover:underline font-mono">{SUPPORT}</a>. See also our{' '}
        <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Notice</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24 pb-24">
      <SectionWrapper size="md">
        <article className="space-y-10">
          <div className="space-y-4 pb-8 border-b border-black/[0.08] dark:border-white/[0.08]">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Terms
            </h1>
            <p className="text-sm text-zinc-500 font-mono">Last updated: November 15, 2026</p>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {sections.map((s) => (
              <section key={s.title} className="space-y-3">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{s.title}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </article>
      </SectionWrapper>
    </div>
  );
}
