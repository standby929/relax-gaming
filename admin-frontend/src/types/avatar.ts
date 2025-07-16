export interface Avatar {
  id: string;
  label: string;
  url: string;
}

export interface AvatarPickerProps {
  value: Avatar | null;
  onChange: (avatar: Avatar) => void;
}
