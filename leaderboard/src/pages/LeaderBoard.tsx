import { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../api/leaderboard';
import type { Player } from '../types/player';

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchLeaderboard();
        setPlayers(data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div className="p-4 text-gray-600">Loading leaderboard...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <ul className="divide-y divide-gray-700 bg-black rounded shadow">
        {players.map((player) => (
          <li key={player._id} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <img
                src={player.avatarId ? `/avatars/${player.avatarId}.png` : 'https://placehold.co/40'}
                alt={player.name}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <span className="text-white font-medium truncate">{player.name}</span>
            </div>
            <div className="text-cyan-400 font-bold text-right w-20">{player.score}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
