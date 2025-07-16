import type { FC } from 'react';
import clsx from 'clsx';

import type { SpinnerProps, SpinnerSize } from '../types/spinner';

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const Spinner: FC<SpinnerProps> = ({
  size = 'md',
  color = 'text-emerald-500',
  className,
}) => {
  return (
    <svg
      className={clsx('animate-spin', sizeClasses[size], color, className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
};

export default Spinner;
