'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';

/** Framed hero screenshot that tilts upright and scales in as it scrolls into view. */
export function CaseVisual({ src, alt, label, glow }: { src: string; alt: string; label: string; glow: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [18, 0]), { stiffness: 120, damping: 24 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.92, 1]), { stiffness: 120, damping: 24 });

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1600 }}
      className="relative mt-14 sm:mt-20"
    >
      <motion.div style={reduce ? undefined : { rotateX, scale, transformOrigin: 'center top' }} className="relative">
        <div aria-hidden="true" className="absolute -inset-x-8 -bottom-8 top-1/3 -z-10 rounded-[3rem] blur-3xl" style={{ background: glow }} />
        <div className="glass rounded-[1.6rem] p-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-1.5 px-3 pb-2 pt-1">
            <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFC857]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
            <span className="ml-3 hidden sm:inline font-mono text-[11px] text-zinc-500">{label}</span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem] bg-ink-2">
            <Image src={src} alt={alt} fill priority sizes="(max-width: 1200px) 100vw, 1100px" className="object-cover object-top" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
