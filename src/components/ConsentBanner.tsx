"use client";

import { useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';

const KEY = 'tc-consent';
const CLARITY_ID = 'z2ykutmshc';

function loadClarity() {
  if (document.getElementById('clarity-tag')) return;
  const w = window as unknown as { clarity?: { (...args: unknown[]): void; q?: unknown[] } };
  w.clarity =
    w.clarity ||
    function (...args: unknown[]) {
      (w.clarity!.q = w.clarity!.q || []).push(args);
    };
  const s = document.createElement('script');
  s.id = 'clarity-tag';
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${CLARITY_ID}?ref=bwt`;
  document.head.appendChild(s);
}

// In-memory fallback so the banner still closes when storage is blocked.
let memo: string | null = null;

function read(): string | null {
  try {
    return localStorage.getItem(KEY) ?? memo;
  } catch {
    return memo;
  }
}

const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

/** Loads Microsoft Clarity only after the visitor accepts analytics cookies. */
export function ConsentBanner() {
  // 'ssr' on the server so nothing renders until the browser's stored choice is known.
  const choice = useSyncExternalStore(subscribe, read, () => 'ssr');

  useEffect(() => {
    if (choice === 'yes') loadClarity();
  }, [choice]);

  const choose = (value: 'yes' | 'no') => {
    memo = value;
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    listeners.forEach((fn) => fn());
  };

  if (choice !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-white/10 bg-zinc-900/95 p-5 text-sm text-zinc-200 shadow-2xl backdrop-blur sm:inset-x-6 sm:bottom-6"
    >
      <p className="leading-relaxed">
        We&apos;d like to use Microsoft Clarity analytics cookies to see how pages are used, so we can improve them.
        See our{' '}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-white">
          Privacy Notice
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose('yes')}
          className="min-h-[44px] rounded-full bg-white px-5 font-semibold text-zinc-900 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose('no')}
          className="min-h-[44px] rounded-full border border-white/20 px-5 font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
