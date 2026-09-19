"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { loginAdminAction } from '../actions';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Validate returnUrl: strictly require relative /admin path, rejecting open redirects
  const rawReturnUrl = searchParams.get('returnUrl') || '';
  const safeReturnUrl =
    rawReturnUrl.startsWith('/admin') &&
    !rawReturnUrl.startsWith('//') &&
    !rawReturnUrl.includes('://')
      ? rawReturnUrl
      : '/admin';

  const initialErrorParam = searchParams.get('error');
  let initialErrorMessage: string | null = null;
  if (initialErrorParam === 'unauthorized') {
    initialErrorMessage = 'Access denied: Your account is not on the authorized administrator allowlist.';
  } else if (initialErrorParam === 'unconfigured') {
    initialErrorMessage = 'Authentication backend is not yet configured in this environment.';
  } else if (initialErrorParam === 'auth_failed') {
    initialErrorMessage = 'Your session has expired. Please log in again to continue.';
  }

  const [error, setError] = useState<string | null>(initialErrorMessage);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await loginAdminAction(formData);
      if (res.success) {
        router.push(safeReturnUrl);
        router.refresh();
      } else {
        setError(res.error || 'Authentication failed.');
      }
    } catch {
      setError('An unexpected error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#111726] p-8 sm:p-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl">
      <div className="text-center space-y-3">
        <div className="inline-flex relative h-8 w-44 mx-auto mb-2">
          <Image
            src="/brand/tendercraft-logo-light.svg"
            alt="Tendercraft"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src="/brand/tendercraft-logo-dark.svg"
            alt="Tendercraft"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Private Administration
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Authorized studio management interface. Public sign-up is disabled.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-xs text-red-700 dark:text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            Administrator Email
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="yyautama@tendercrafthq.com"
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
            <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-zinc-50 dark:bg-[#161F33] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
            <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <span>Verifying Credentials...</span>
          ) : (
            <>
              <span>Sign In to Studio Backend</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center gap-2 text-[11px] text-zinc-400">
        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
        <span>Strict Server-Enforced RBAC & Allowlist Verification</span>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <Suspense fallback={<div className="text-sm text-zinc-500">Loading admin login...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
