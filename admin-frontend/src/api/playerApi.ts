import axios from 'axios';
import type { CreatePlayerDto, Player } from '../types/player';

// Set the JWT token in the Authorization header for all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('google_jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchPlayers = async (): Promise<Player[]> => {
  const response = await axios.get<Player[]>('/api/players');
  return response.data;
};

export const fetchPlayerById = async (playerId: string): Promise<Player> => {
  const response = await axios.get<Player>(`/api/players/${playerId}`);
  return response.data;
};

export const createPlayer = async (player: CreatePlayerDto): Promise<Player> => {
  const response = await axios.post<Player>('/api/players', player);
  return response.data;
};

export const updatePlayer = async (player: Player): Promise<Player> => {
  const response = await axios.put<Player>(`/api/players/${player._id}`, player);
  return response.data;
};

export const deletePlayer = async (playerId: string): Promise<void> => {
  await axios.delete(`/api/players/${playerId}`);
};
