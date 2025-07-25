import { useState } from 'react';
import { useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as VirtualList } from 'react-window';

import type { FC } from 'react';
import type { Player } from '../types/player';
import type { PlayerListProps } from '../types/playerlist';
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { AVATARS } from '../api/avatars';

export const PlayerList: FC<PlayerListProps> = ({ players, onEdit, onDelete }) => {
  return (
    <div className="h-full w-full">
      <AutoSizer>
        {({ height, width }) => (
          <VirtualList
            height={height}
            width={width}
            itemCount={players.length}
            itemSize={80}
          >
            {({ index, style }) => (
              <div style={style}>
                <PlayerRow
                  key={players[index]._id}
                  player={players[index]}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  index={index}
                />
              </div>
            )}
          </VirtualList>
        )}
      </AutoSizer>
    </div>
  );
};

const PlayerRow: FC<{
  player: Player;
  onEdit: (player: Player) => void;
  onDelete: (player: Player) => void;
  index: number;
}> = ({ player, onEdit, onDelete, index }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const avatar = AVATARS.find(a => a.id === player.avatarId);
  const avatarUrl = avatar?.url || 'https://placehold.co/40'; // Fallback if no avatar is set just for the simplicity

  // Close menu on outside click
  useOutsideClick(menuRef, () => setMenuOpen(false), menuOpen);

  return (
    <div
      className={`flex justify-between items-center p-4 border-b border-gray-200 relative ${
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
      } hover:bg-gray-100`}
    >
      {/* Left: avatar + name + date */}
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={player.name}
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
        <div>
          <div className="font-semibold">{player.name}</div>
          <div className="text-sm text-gray-500">
            {new Date(player.lastUpdated).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Right: score + menu */}
      <div className="flex items-center gap-4">
        <div className="font-bold text-lg">{player.score}</div>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute right-12 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded px-2 py-1 shadow flex gap-2 z-10"
        >
          <button
            onClick={() => {
              onEdit(player);
              setMenuOpen(false);
            }}
            className="hover:text-emerald-600"
            title="Edit"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              onDelete(player);
              setMenuOpen(false);
            }}
            className="hover:text-red-600"
            title="Delete"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};
