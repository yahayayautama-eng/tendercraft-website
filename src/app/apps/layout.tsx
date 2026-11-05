import React from 'react';
import { AutoReveal } from '@/components/motion/AutoReveal';

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[720px] overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-40 left-[6%] h-[667px] w-[667px] orb bg-violet/30 animate-aurora" />
        <div
          className="absolute -top-10 right-[6%] h-[580px] w-[580px] orb bg-mint/20 animate-aurora"
          style={{ animationDelay: '-7s' }}
        />
        <div
          className="absolute top-60 left-[40%] h-[464px] w-[464px] orb bg-coral/15 animate-aurora"
          style={{ animationDelay: '-12s' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-ink" />
      </div>
      <AutoReveal>{children}</AutoReveal>
    </div>
  );
}
