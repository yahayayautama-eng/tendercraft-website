/* ========================================
   CARD - TYPES
   ======================================== */

import type { HTMLAttributes } from 'react';
import type { HTMLMotionProps } from 'framer-motion';

export type CardVariant = 'elevated' | 'glass' | 'outlined' | 'flat';

export interface CardProps extends HTMLMotionProps<'div'> {
    variant?: CardVariant;
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export type CardContentProps = HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;