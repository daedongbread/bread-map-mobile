import React from 'react';
import { BakerySingleEntity } from '@/apis/bakery/types';

export const useBakeryDetailMethod = () => {
  const [bakery, setBakery] = React.useState<BakerySingleEntity | null>(null);

  const updateBakery = (bakeryItem: BakerySingleEntity) => {
    // TODO: 인자 이름 고민
    setBakery(bakeryItem);
  };

  return { bakery, updateBakery };
};
