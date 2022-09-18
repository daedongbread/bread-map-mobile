import React, { useEffect, useState } from 'react';
import { useGetBreads } from '@/apis/bread';
import { ReviewSelect } from '@/components/BakeryDetail/Review/ReviewWrite/ReviewSelect';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootStackScreenProps } from '@/pages/Stack';
import { resetSelectedBreads, updateAllSeletedBread } from '@/slices/reviewWrite';
import { useNavigation } from '@react-navigation/native';

const bakeryId = 30300001400004;

export const ReviewSelectContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<RootStackScreenProps<'ReviewWriteStack'>['navigation']>();

  const [searchValue, setSearchValue] = useState('');
  const selectedBread = useAppSelector(selector => selector.reviewWrite.selectedBreads);

  const { data: breads } = useGetBreads({
    bakeryId,
  });

  const onChangeSearchValue = (value: string) => setSearchValue(value);
  const onPressConfirmButton = () => {
    dispatch(updateAllSeletedBread(selectedBread));
    navigate('ReviewWriteStack', {
      screen: 'ReviewRating',
    });
  };

  const filteredBreads = breads ? breads?.filter(bread => bread.name.includes(searchValue)) : [];

  useEffect(() => {
    return () => {
      dispatch(resetSelectedBreads());
    };
  }, [dispatch]);

  return (
    <ReviewSelect
      breads={filteredBreads}
      searchValue={searchValue}
      onChangeSearchValue={onChangeSearchValue}
      selectedBreads={selectedBread}
      onPressConfirmButton={onPressConfirmButton}
    />
  );
};
