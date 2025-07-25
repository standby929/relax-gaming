import { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-end items-center gap-2 w-full sm:w-auto"
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search players..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 text-sm"
        />
        <MagnifyingGlassIcon
          className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 cursor-pointer"
          onClick={handleSubmit}
        />
        {inputValue && (
          <XMarkIcon
            className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 cursor-pointer hover:text-red-500"
            onClick={handleClear}
          />
        )}
      </div>
    </form>
  );
}
