import React from 'react';
import { PopularSearchComponent } from '@/components/Search';

export const PopularSearchContainer = () => {
  const popularSearchList = [
    { name: '소금빵', id: 0 },
    { name: '치아바타', id: 1 },
    { name: '크루아상', id: 2 },
    { name: '베이글', id: 3 },
    { name: '피자빵', id: 4 },
    { name: '마늘빵', id: 5 },
  ];

  if (!popularSearchList?.length) {
    return null;
  }

  return <PopularSearchComponent popularSearchList={popularSearchList} />;
};
