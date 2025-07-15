import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function NoResult({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
      <MagnifyingGlassIcon className="w-12 h-12 mb-4" />
      <p className="text-center text-lg">{message || 'No results found.'}</p>
    </div>
  );
}
