export interface Player {
  _id: string;
  name: string;
  score: number;
  lastUpdated: string;
  avatarId?: string;
}

export type CreatePlayerDto = Omit<Player, '_id' | 'lastUpdated'>;
