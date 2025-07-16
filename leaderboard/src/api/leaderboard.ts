import axios from 'axios';
import type { Player } from '../types/player';

export const fetchLeaderboard = async (): Promise<Player[]> => {
  const response = await axios.get<Player[]>('/api/leaderboard');
  return response.data;
};
