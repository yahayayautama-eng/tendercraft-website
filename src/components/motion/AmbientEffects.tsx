'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Site-wide ambient motion layer:
 * - tri-color scroll progress bar pinned to the top of the viewport
 * - soft cursor glow that trails the pointer (fine pointers only)
 * - pointer tracking for every `.spotlight` element (sets --mx / --my)
 */
export function AmbientEffects() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const glowOn = finePointer && !reduceMotion;
    let frame = 0;
    let running = false;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let gx = x;
    let gy = y;
    let spot: { el: HTMLElement; cx: number; cy: number } | null = null;

    // One rAF loop that only runs while something is moving, then sleeps.
    const tick = () => {
      if (spot) {
        const r = spot.el.getBoundingClientRect();
        spot.el.style.setProperty('--mx', `${spot.cx - r.left}px`);
        spot.el.style.setProperty('--my', `${spot.cy - r.top}px`);
        spot = null;
      }
      let moving = false;
      if (glowOn) {
        gx += (x - gx) * 0.14;
        gy += (y - gy) * 0.14;
        moving = Math.abs(x - gx) > 0.4 || Math.abs(y - gy) > 0.4;
        if (glowRef.current) glowRef.current.style.transform = `translate3d(${gx - 300}px, ${gy - 300}px, 0)`;
      }
      if (moving) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const wake = () => {
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target instanceof Element ? e.target.closest<HTMLElement>('.spotlight') : null;
      if (target) spot = { el: target, cx: e.clientX, cy: e.clientY };
      if (glowOn || target) wake();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left bg-gradient-to-r from-violet via-mint to-coral"
      />
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 -z-10 hidden h-[600px] w-[600px] rounded-full opacity-70 will-change-transform [@media(pointer:fine)]:block motion-reduce:!hidden"
        style={{
          background:
            'radial-gradient(circle at center, rgba(124,92,255,0.16), rgba(61,242,192,0.06) 45%, transparent 70%)',
        }}
      />
    </>
  );
}
