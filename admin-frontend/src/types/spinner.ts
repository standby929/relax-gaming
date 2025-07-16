export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string; // Tailwind színosztály, pl: "text-emerald-500"
  className?: string;
}
