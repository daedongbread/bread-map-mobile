import React from 'react';
import { PopularSearchComponent } from '@/components/Search';

export const PopularSearchContainer = () => {
  const popularSearchList = [
    { name: '소금빵' },
    { name: '치아바타' },
    { name: '크루아상' },
    { name: '베이글' },
    { name: '피자빵' },
    { name: '마늘빵' },
  ];

  if (!popularSearchList?.length) {
    return null;
  }

  return <PopularSearchComponent popularSearchList={popularSearchList} />;
};
