'use client';

import React, { useState } from 'react';

let hasNavigated = false;

/**
 * Re-mounts on every route change. The first page load renders without an
 * entrance (so content paints immediately); later client navigations get a
 * soft fade-up transition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => {
    if (typeof window === 'undefined') return false;
    const was = hasNavigated;
    hasNavigated = true;
    return was;
  });

  return <div className={animate ? 'page-enter' : undefined}>{children}</div>;
}
