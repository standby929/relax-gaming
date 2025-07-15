import type { Player } from './player';

export interface PlayerListProps {
  players: Player[];
  onEdit: (player: Player) => void;
  onDelete: (player: Player) => void;
}