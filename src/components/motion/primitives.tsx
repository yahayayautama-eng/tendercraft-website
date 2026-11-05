'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  animate,
  type HTMLMotionProps,
} from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------
   FadeIn — CSS-only entrance for above-the-fold content.
   Paints immediately with the HTML; never waits for JavaScript.
------------------------------------------------------------------- */
export function FadeIn({
  delay = 0,
  y = 18,
  as: Tag = 'div',
  className,
  style,
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement> & { delay?: number; y?: number; as?: 'div' | 'span' | 'p' }) {
  return (
    <Tag
      className={cn('fade-in', className)}
      style={{ ...style, ['--d' as string]: `${delay}s`, ['--y' as string]: `${y}px` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Reveal — rise into view once (below-the-fold content).
   Marked data-reveal so it stays visible when JavaScript is off.
------------------------------------------------------------------- */
interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
}

export function Reveal({ delay = 0, y = 28, className, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal=""
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   SplitWords — kinetic headline, each word slides up from a mask.
   CSS-driven: `immediate` headlines animate on first paint; others
   start when scrolled into view. Real text is exposed to screen
   readers and crawlers via an sr-only copy.
------------------------------------------------------------------- */
interface SplitWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate on first paint (hero) instead of when scrolled into view */
  immediate?: boolean;
}

export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: SplitWordsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    if (immediate || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return (
    <span ref={ref} className={cn('split inline', (immediate || inView) && 'in', className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
          <span
            className={cn('split-word', wordClassName)}
            style={{ ['--d' as string]: `${(delay + i * stagger).toFixed(2)}s` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------
   Magnetic — element is gently pulled toward the pointer
------------------------------------------------------------------- */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn('inline-flex', className)}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Tilt — 3D perspective tilt following the pointer
------------------------------------------------------------------- */
export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------
   CountUp — animates a number when it scrolls into view
------------------------------------------------------------------- */
export function CountUp({ to, suffix = '', className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px 10% 0px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------
   Marquee — infinite horizontal ticker (CSS driven, pauses on hover)
------------------------------------------------------------------- */
export function Marquee({
  children,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('group relative flex overflow-hidden mask-fade-x', className)}>
      <div
        className={cn(
          'flex w-max shrink-0 items-center group-hover:[animation-play-state:paused]',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   RotatingWord — cycles through words with a vertical flip
------------------------------------------------------------------- */
export function RotatingWord({
  words,
  className,
  wordClassName,
  interval = 2400,
}: {
  words: string[];
  className?: string;
  wordClassName?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <span className={cn('relative inline-grid overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]', className)}>
      {/* Invisible sizer keeps the line width stable */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {longest}
      </span>
      {words.map((word, i) => (
        <motion.span
          key={word}
          className={cn('col-start-1 row-start-1', wordClassName)}
          initial={false}
          animate={
            i === index
              ? { y: '0%', opacity: 1 }
              : { y: i === (index - 1 + words.length) % words.length ? '-100%' : '100%', opacity: 0 }
          }
          transition={{ duration: 0.7, ease: EASE }}
          aria-hidden={i !== index}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
