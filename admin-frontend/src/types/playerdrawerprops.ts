export interface PlayerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (player: { name: string; score: number; avatarId?: string }) => void;
  existingPlayer?: { name: string; score: number; avatarId?: string };
  isLoading?: boolean;
}
