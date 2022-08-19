import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReviewSelect } from '@/components/BakeryDetail/Review/ReviewWrite/ReviewSelect';
import { RootStackScreenProps } from '@/pages/Stack';
import { updateSeletedBakerys } from '@/slices/review';
import { useNavigation } from '@react-navigation/native';

// export interface BakeryType {
//   bakeryName: string;
//   bakeryPrice: number;
//   imagePath: string;
// }

export interface BakeryType {
  id?: number;
  imageUrl?: string;
  name: string;
  rating?: number;
  reviewNum?: number;
  price?: number;
}

export const ReviewSelectContainer: React.FC = () => {
  const bakerys: BakeryType[] = [
    {
      id: 1,
      name: '딸기 마카롱',
      imageUrl: '../../components/Shared/Images/bread.png',
      reviewNum: 1,
      price: 3000,
    },
    {
      id: 2,
      name: '오리지날 크루아상',
      imageUrl: '../../components/Shared/Images/bread.png',
      reviewNum: 1,
      price: 4200,
    },
  ];
  const dispatch = useDispatch();
  const { navigate } = useNavigation<RootStackScreenProps<'ReviewWriteStack'>['navigation']>();

  const [searchValue, setSearchValue] = useState('');
  const [selectedBakery, setSelectedBakery] = useState<BakeryType[]>([]);

  const onChnageSearchValue = (value: string) => setSearchValue(value);
  const onChangeSeledtedBakery = (bakery: BakeryType, value: boolean = false) => {
    value
      ? setSelectedBakery([...selectedBakery, bakery])
      : setSelectedBakery(_selectedBakery => _selectedBakery.filter(_bakery => _bakery.id !== bakery.id));
  };
  const onPressConfirmButton = () => {
    // store 저장
    dispatch(updateSeletedBakerys(selectedBakery));
    navigate('ReviewWriteStack', {
      screen: 'ReviewRating',
    });
  };

  const filteredBakery = bakerys.filter(bakery => bakery.name.includes(searchValue));

  return (
    <ReviewSelect
      bakerys={filteredBakery}
      searchValue={searchValue}
      onChnageSearchValue={onChnageSearchValue}
      selectedBakery={selectedBakery}
      onChangeSeledtedBakery={onChangeSeledtedBakery}
      onPressConfirmButton={onPressConfirmButton}
    />
  );
};
