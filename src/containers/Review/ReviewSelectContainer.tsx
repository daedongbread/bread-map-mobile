import React, { useEffect, useState } from 'react';
import { useGetBreads } from '@/apis/bread';
import { ReviewSelect } from '@/components/BakeryDetail/Review/ReviewWrite/ReviewSelect';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { resetSelectedBreads, updateAllSeletedBread } from '@/slices/reviewWrite';
import { useNavigation } from '@react-navigation/native';

const bakeryId = 30300001400004;

export const ReviewSelectContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainStackScreenProps<'ReviewWriteStack'>['navigation']>();

  const [searchValue, setSearchValue] = useState('');
  const selectedBread = useAppSelector(selector => selector.reviewWrite.selectedBreads);

  const { data: breads } = useGetBreads({
    bakeryId,
  });

  const onChangeSearchValue = (value: string) => setSearchValue(value);
  const onPressConfirmButton = () => {
    dispatch(updateAllSeletedBread(selectedBread));
    navigation.push('ReviewWriteStack', {
      screen: 'ReviewRating',
    });
  };

  //react-navigation 에서 현재 stack 자체를 pop 할 수 없는 방법이 없어 동적으로 .pop(number)에 값을 줘서 해결
  const closePage = () => {
    navigation.pop(1);
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
      selectedBreads={selectedBread}
      onChangeSearchValue={onChangeSearchValue}
      onPressConfirmButton={onPressConfirmButton}
      closePage={closePage}
    />
  );
};
