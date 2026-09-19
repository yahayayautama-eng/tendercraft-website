import React from 'react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ContactForm } from '@/components/ContactForm';
import { MotionEmailBadge } from '@/components/MotionEmailBadge';
import { getSiteUrl } from '@/lib/site';
import { Mail, Clock, ShieldCheck, MessageSquare } from 'lucide-react';

const siteUrl = getSiteUrl();

export const metadata = {
  title: 'Contact',
  description:
    'Direct enquiry and project scoping contact options for Tendercraft.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact — Tendercraft',
    description:
      'Direct enquiry and project scoping contact options for Tendercraft.',
    url: `${siteUrl}/contact`,
    siteName: 'Tendercraft',
    type: 'website',
    images: [
      {
        url: '/brand/tendercraft-og.png',
        width: 1200,
        height: 630,
        alt: 'Contact Tendercraft',
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24 space-y-16 sm:space-y-20 pb-24">
      <SectionWrapper size="lg">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
            Get in Touch
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.08]">
            Let&apos;s build something focused.
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Whether you have a specific workflow bottleneck or need a specialized business tool built from the ground up, we are ready to discuss your project.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="mt-12 max-w-4xl">
          <ContactForm />
        </div>

        {/* Direct Email Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {/* Card 1: General Studio */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#111726] border border-black/[0.08] dark:border-white/[0.08] shadow-sm flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Project Enquiries
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                For new project briefs, product design, browser tool development, or architecture consultations.
              </p>
            </div>

            <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06] space-y-3">
              <span className="block text-xs uppercase font-mono text-zinc-400">
                Studio Inbox
              </span>
              <div>
                <MotionEmailBadge email="hello@tendercrafthq.com" size="lg" />
              </div>
            </div>
          </div>

          {/* Card 2: Founder Direct */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#111726] border border-black/[0.08] dark:border-white/[0.08] shadow-sm flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Founder & Direct Line
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                For strategic engagements, architecture inquiries, or direct confidential discussions.
              </p>
            </div>

            <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06] space-y-3">
              <span className="block text-xs uppercase font-mono text-zinc-400">
                Direct Line
              </span>
              <div>
                <MotionEmailBadge email="yyautama@tendercrafthq.com" size="lg" />
              </div>
            </div>
          </div>
        </div>

        {/* What to Expect Callout */}
        <div className="mt-14 p-8 rounded-3xl bg-zinc-50 dark:bg-[#111726] border border-black/[0.06] dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl">
          <div className="flex items-start gap-4">
            <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Rapid Response
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                We review all enquiries personally and respond within 1 to 2 business days.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Clear Feasibility
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                We provide honest technical feedback on feasibility, scope, and engineering timelines.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Direct Communication
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                No intermediaries. Every conversation is with the founder and engineer designing and building your tools.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
