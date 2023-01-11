import React, { useEffect, useState } from 'react';
import { BreadEntity, useGetBreads } from '@/apis/bread';
import { ReviewSelect } from '@/components/BakeryDetail/Review/ReviewWrite/ReviewSelect';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { RatedBread, resetSelectedBreads, updateAllSeletedBread } from '@/slices/reviewWrite';
import { useNavigation } from '@react-navigation/native';

const bakeryId = 30300001400004;

export const ReviewSelectContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainStackScreenProps<'ReviewWriteStack'>['navigation']>();

  const [searchValue, setSearchValue] = useState('');
  const { selectedBreads, manualSelectedBreads } = useAppSelector(selector => selector.reviewWrite);
  const [manualInputs, setManualInputs] = useState<RatedBread[]>([]);

  const { data: breads } = useGetBreads({
    bakeryId,
  });

  const onChangeSearchValue = (value: string) => setSearchValue(value);
  const onPressConfirmButton = () => {
    dispatch(updateAllSeletedBread(selectedBreads));
    navigation.push('ReviewWriteStack', {
      screen: 'ReviewRating',
    });
  };

  const isExistBread = (manualBreadName: string) => {
    const allBreads: BreadEntity[] = [...(breads || []), ...manualInputs];

    return Boolean(allBreads.find(bread => bread.name === manualBreadName));
  };

  //react-navigation 에서 현재 stack 자체를 pop 할 수 없는 방법이 없어 동적으로 .pop(number)에 값을 줘서 해결
  const closePage = () => {
    navigation.pop(1);
  };

  const filteredBreads = breads ? breads?.filter(bread => bread.name.includes(searchValue)) : [];

  useEffect(() => {
    // unmount시 store값 초기화
    return () => {
      dispatch(resetSelectedBreads());
    };
  }, [dispatch]);

  return (
    <ReviewSelect
      breads={filteredBreads}
      searchValue={searchValue}
      selectedBreads={selectedBreads}
      manualSelectedBreads={manualSelectedBreads}
      manualInputs={manualInputs}
      setManualInputs={setManualInputs}
      onChangeSearchValue={onChangeSearchValue}
      onPressConfirmButton={onPressConfirmButton}
      isExistBread={isExistBread}
      closePage={closePage}
    />
  );
};
