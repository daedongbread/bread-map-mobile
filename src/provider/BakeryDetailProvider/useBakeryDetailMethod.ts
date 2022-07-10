import React from 'react';
import { Bakery } from '@/types/bakery';

export const useBakeryDetailMethod = () => {
  const [bakery, setBakery] = React.useState<Bakery | null>(null);

  const updateBakery = (bakeryItem: Bakery) => {
    // TODO: 인자 이름 고민
    setBakery(bakeryItem);
  };

  return { bakery, updateBakery };
};
