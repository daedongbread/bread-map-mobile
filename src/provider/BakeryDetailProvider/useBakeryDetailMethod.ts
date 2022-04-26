import React from 'react';
import { Bakery } from '@/router/types';

export const useBakeryDetailMethod = () => {
  const [bakery, setBakery] = React.useState<Bakery | null>(null);

  const updateBakery = (bakeryItem: Bakery) => {
    // TODO: 인자 이름 고민
    setBakery(bakeryItem);
  };

  return { bakery, updateBakery };
};
