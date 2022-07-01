import React, { useState } from 'react';
import { ReviewWriteView } from '@/components/BakeryDetail/ReviewSection/ReviewWrite/ReviewWriteView';

export interface BakeryType {
  bakeryName: string;
  bakeryPrice: number;
  imagePath: string;
}

export const ReviewWriteContainer: React.FC = () => {
  const bakerys: BakeryType[] = [
    {
      bakeryName: '오리지날 크루아상',
      bakeryPrice: 5000,
      imagePath: '../../components/Shared/Images/bread.png',
    },
    {
      bakeryName: '딸기 마카롱',
      bakeryPrice: 4200,
      imagePath: '../../components/Shared/Images/bread.png',
    },
    {
      bakeryName: '초코 마카롱',
      bakeryPrice: 6200,
      imagePath: '../../components/Shared/Images/bread.png',
    },
    {
      bakeryName: '앙버터 마카롱',
      bakeryPrice: 6200,
      imagePath: '../../components/Shared/Images/bread.png',
    },
    {
      bakeryName: '민트초코 마카롱',
      bakeryPrice: 6200,
      imagePath: '../../components/Shared/Images/bread.png',
    },
    {
      bakeryName: '모카번',
      bakeryPrice: 6200,
      imagePath: '../../components/Shared/Images/bread.png',
    },
  ];
  const [searchValue, setSearchValue] = useState('');
  const [selectedBakery, setSelectedBakery] = useState<BakeryType[]>([]);
  const onChnageSearchValue = (value: string) => setSearchValue(value);
  const onChangeSeledtedBakery = (bakery: BakeryType, value: boolean) => {
    value ? setSelectedBakery([...selectedBakery, bakery]) : setSelectedBakery([]);
  };
  const filteredBakery = bakerys.filter(bakery => bakery.bakeryName.includes(searchValue));

  return (
    <ReviewWriteView
      bakerys={filteredBakery}
      searchValue={searchValue}
      onChnageSearchValue={onChnageSearchValue}
      selectedBakery={selectedBakery}
      onChangeSeledtedBakery={onChangeSeledtedBakery}
    />
  );
};
