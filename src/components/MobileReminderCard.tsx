'use client';

import React, { useState } from 'react';
import { Smartphone, Mail, Copy, Check, Laptop } from 'lucide-react';

interface MobileReminderCardProps {
  appName: string;
  url: string;
  wingetCommand?: string;
  tagline?: string;
}

export function MobileReminderCard({
  appName,
  url,
  wingetCommand,
  tagline = 'These apps require a Windows 10/11 PC to run.',
}: MobileReminderCardProps) {
  const [copied, setCopied] = useState(false);

  const mailSubject = encodeURIComponent(`Reminder: Install ${appName} on Windows PC`);
  const mailBody = encodeURIComponent(
    `Hi,\n\nHere is the link to install ${appName} on your Windows PC:\n${url}\n\n${
      wingetCommand ? `Or install via Windows Terminal:\n${wingetCommand}\n\n` : ''
    }Sent from Tendercraft HQ`
  );
  const mailtoLink = `mailto:?subject=${mailSubject}&body=${mailBody}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/40 dark:from-blue-950/30 dark:via-zinc-900/40 dark:to-indigo-950/20 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
            <Smartphone className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">
                Browsing on your phone?
              </h3>
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-medium">
                <Laptop className="w-3 h-3" /> PC App
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
              {tagline} Email yourself the download link so it’s waiting on your desktop when you get back to your PC.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <a
            href={mailtoLink}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email me this link</span>
          </a>
          <button
            onClick={handleCopy}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl font-medium text-sm border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
            title="Copy link to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
