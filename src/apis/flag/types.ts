export type FlagColor =
  | 'GRAY'
  | 'ORANGE'
  | 'GREEN'
  | 'YELLOW'
  | 'CYAN'
  | 'BLUE'
  | 'SKY'
  | 'NAVY'
  | 'PURPLE'
  | 'RED'
  | 'PINK';

export type Flag = {
  flagInfo: {
    id: number;
    name: string;
    color: FlagColor;
    icon: 'HEART' | 'FLAG';
  };
  bakeryImageList?: string[];
};
