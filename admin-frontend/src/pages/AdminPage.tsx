import { useEffect, useState, useRef } from 'react';
import { fetchPlayers } from '../api/playerApi';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Player } from '../types/player';
import Profile from '../components/Profile';

export default function AdminPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPlayers = async () => {
      const data = await fetchPlayers();
      setPlayers(data);
    };
    loadPlayers();
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: players.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
  });

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-4 pb-8">
      {/* Header and profile */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Player List</h1>
        <Profile />
      </div>

      {/* Scrollable list container */}
      <div
        ref={parentRef}
        className="overflow-auto max-h-[calc(100vh-140px)] border border-gray-200 rounded bg-white shadow"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const player = players[virtualRow.index];
            const isStriped = virtualRow.index % 2 === 1;
            return (
              <div
                key={player._id}
                className={`absolute top-0 left-0 w-full px-4 py-3 border-b text-sm transition-colors duration-150 ${
                  isStriped ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100 border-gray-200`}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  height: `${virtualRow.size}px`,
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{player.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(player.lastUpdated).toLocaleString()}
                    </p>
                  </div>
                  <div className="font-semibold text-gray-700 text-base">
                    {player.score}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}