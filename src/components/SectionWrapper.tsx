import React from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article' | 'main';
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

export function SectionWrapper({
  as: Component = 'section',
  size = 'md',
  className,
  children,
  ...props
}: SectionWrapperProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    full: 'max-w-7xl',
  };

  return (
    <Component
      className={cn('w-full px-5 sm:px-8 mx-auto', sizeClasses[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
