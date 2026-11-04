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
    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let gx = x;
    let gy = y;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      const target = e.target instanceof Element ? e.target.closest<HTMLElement>('.spotlight') : null;
      if (target) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        target.style.setProperty('--my', `${e.clientY - rect.top}px`);
      }
    };

    const tick = () => {
      gx += (x - gx) * 0.12;
      gy += (y - gy) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${gx - 300}px, ${gy - 300}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    if (finePointer && !reduceMotion) frame = requestAnimationFrame(tick);

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
        className="pointer-events-none fixed top-0 left-0 -z-10 hidden h-[600px] w-[600px] rounded-full opacity-60 blur-3xl [@media(pointer:fine)]:block motion-reduce:!hidden"
        style={{
          background:
            'radial-gradient(circle at center, rgba(124,92,255,0.16), rgba(61,242,192,0.06) 45%, transparent 70%)',
        }}
      />
    </>
  );
}
