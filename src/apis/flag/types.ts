export type FlagColor = 'ORANGE' | 'GREEN' | 'YELLOW' | 'CYAN' | 'BLUE' | 'SKY' | 'NAVY' | 'PURPLE' | 'RED' | 'PINK';

export type Flag = {
  flagId: number;
  name: string;
  color: FlagColor;
  bakeryImageList?: string[];
};
