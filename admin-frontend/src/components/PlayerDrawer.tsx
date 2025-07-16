import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import type { PlayerDrawerProps } from '../types/playerdrawerprops';
import type { Avatar } from '../types/avatar';
import Spinner from './Spinner';
import AvatarPicker from './AvatarPicker';
import { AVATARS } from '../api/avatars';

export default function PlayerDrawer({ isOpen, onClose, onSave, existingPlayer, isLoading }: PlayerDrawerProps) {
  const [name, setName] = useState('');
  const [score, setScore] = useState<number | ''>('');
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  useEffect(() => {
    if (existingPlayer) {
      setName(existingPlayer.name);
      setScore(existingPlayer.score);
      const match = AVATARS.find((a) => a.id === existingPlayer.avatarId);
      setSelectedAvatar(match || null);
    } else {
      setName('');
      setScore('');
      setSelectedAvatar(null);
    }
  }, [existingPlayer, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || score === '' || !selectedAvatar) return;

    onSave({
      name: name.trim(),
      score: Number(score),
      avatarId: selectedAvatar.id,
    });

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
      {isLoading ? (
        <div className="flex items-center justify-center h-full py-10 text-gray-400">
          <Spinner size="lg" color="blue" />
        </div>
      ) : (
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

          <AvatarPicker
            value={selectedAvatar}
            onChange={(avatar) => setSelectedAvatar(avatar)}
          />

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-white rounded bg-teal-400 hover:bg-teal-500 transition-colors"
            >
              {existingPlayer ? 'Modify' : 'Save'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
