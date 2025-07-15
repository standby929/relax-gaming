import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface PlayerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (player: { name: string; score: number }) => void;
  existingPlayer?: { name: string; score: number };
}

export default function PlayerDrawer({ isOpen, onClose, onSave, existingPlayer }: PlayerDrawerProps) {
  const [name, setName] = useState('');
  const [score, setScore] = useState<number | ''>('');

  useEffect(() => {
    if (existingPlayer) {
      setName(existingPlayer.name);
      setScore(existingPlayer.score);
    } else {
      setName('');
      setScore('');
    }
  }, [existingPlayer, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || score === '') return;
    onSave({ name: name.trim(), score: Number(score) });
    onClose();
  };

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 h-full z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto border-l border-gray-200',
        'w-full sm:w-1/2 lg:w-1/3',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">
          {existingPlayer ? 'Modify Player' : 'Add New Player'}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Score</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value === '' ? '' : Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {existingPlayer ? 'Modify' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
