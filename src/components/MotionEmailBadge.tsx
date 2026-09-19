'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';

interface MotionEmailBadgeProps {
  email: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showCopyButton?: boolean;
  variant?: 'default' | 'dark' | 'glass';
}

export function MotionEmailBadge({
  email,
  className = '',
  size = 'md',
  showCopyButton = true,
  variant = 'default',
}: MotionEmailBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const containerClasses = {
    default:
      'bg-zinc-100/90 dark:bg-white/[0.05] border-black/[0.08] dark:border-white/[0.1] hover:border-black/[0.15] dark:hover:border-white/[0.2]',
    dark: 'bg-white/10 border-white/15 hover:border-white/30 text-white',
    glass:
      'bg-white/70 dark:bg-white/[0.04] backdrop-blur-md border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.18]',
  }[variant];

  const linkTextClasses = {
    default:
      'text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400',
    dark: 'text-white hover:text-blue-300',
    glass:
      'text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400',
  }[variant];

  const buttonClasses = {
    default:
      'text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-white dark:bg-[#111726] border-black/[0.06] dark:border-white/[0.08]',
    dark: 'text-zinc-200 hover:text-white bg-white/10 border-white/15 hover:bg-white/20',
    glass:
      'text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-white/80 dark:bg-white/10 border-black/[0.06] dark:border-white/[0.08]',
  }[variant];

  return (
    <div
      className={`inline-flex items-center gap-2 p-1 sm:p-1.5 rounded-2xl border transition-all ${containerClasses} ${className}`}
    >
      <a
        href={`mailto:${email}`}
        aria-label={`Send email to ${email}`}
        className={`inline-flex items-center gap-2 min-h-[44px] px-3.5 py-1.5 rounded-xl font-mono tracking-tight font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${linkTextClasses}`}
      >
        <Mail
          className={`shrink-0 ${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${
            variant === 'dark'
              ? 'text-blue-400'
              : 'text-blue-600 dark:text-blue-400'
          }`}
          aria-hidden="true"
        />
        <span
          className={
            isLarge
              ? 'text-base sm:text-lg font-bold'
              : isSmall
              ? 'text-xs'
              : 'text-xs sm:text-sm'
          }
        >
          {email}
        </span>
        <ArrowUpRight
          className="w-3.5 h-3.5 opacity-60 hover:opacity-100 shrink-0"
          aria-hidden="true"
        />
      </a>

      {showCopyButton && (
        <motion.button
          type="button"
          onClick={handleCopy}
          whileTap={{ scale: 0.92 }}
          aria-label={`Copy ${email} to clipboard`}
          className={`relative inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3 py-1.5 rounded-xl text-xs font-medium border shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${buttonClasses}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-sans font-medium"
              >
                <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                <span className="text-[11px] hidden sm:inline">Copied</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px] hidden sm:inline">Copy</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </div>
  );
}
