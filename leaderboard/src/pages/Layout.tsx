import type { ReactNode } from 'react';
import RelaxLogo from '../assets/logo-relax-gaming.svg';
import PixiTitle from './PixiTitle';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8">
      <img
        src={RelaxLogo}
        alt="Relax Gaming Logo"
        className="w-48 mb-8"
      />
      <PixiTitle />
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  );
}
