import React, { useEffect, useState } from 'react';
import { useGetMenusForReview } from '@/apis/menu';
import { MenuForReviewEntity } from '@/apis/menu/type';
import { ReviewSelectComponent } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewSelect';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { ReviewWriteStackNavigationProps } from '@/pages/ReviewWriteStack/Stack';
import { RatedBread, resetSelectedBreads, updateAllSeletedBread } from '@/slices/reviewWrite';
import { useNavigation, useRoute } from '@react-navigation/native';

type Navigation = ReviewWriteStackNavigationProps<'ReviewSelect'>['navigation'];
type Route = ReviewWriteStackNavigationProps<'ReviewSelect'>['route'];

export const ReviewSelectContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { bakeryId } = route.params;
  const { selectedBreads, manualSelectedBreads } = useAppSelector(selector => selector.reviewWrite);

  const [searchValue, setSearchValue] = useState('');
  const [manualInputs, setManualInputs] = useState<RatedBread[]>([]);

  const { menus } = useGetMenusForReview({
    bakeryId,
  });

  const onChangeSearchValue = (value: string) => setSearchValue(value);
  const onPressConfirmButton = () => {
    dispatch(updateAllSeletedBread(selectedBreads));
    navigation.navigate('ReviewRating', {
      bakeryId,
    });
  };

  const isExistBread = (manualBreadName: string) => {
    const allBreads: MenuForReviewEntity[] = [...(menus || []), ...manualInputs];

    return Boolean(allBreads.find(bread => bread.name === manualBreadName));
  };

  const filteredBreads = menus ? menus?.filter(menu => menu.name.includes(searchValue)) : [];

  useEffect(() => {
    // unmount시 store값 초기화
    return () => {
      dispatch(resetSelectedBreads());
    };
  }, [dispatch]);

  return (
    <ReviewSelectComponent
      breads={filteredBreads}
      searchValue={searchValue}
      selectedBreads={selectedBreads}
      manualSelectedBreads={manualSelectedBreads}
      manualInputs={manualInputs}
      setManualInputs={setManualInputs}
      onChangeSearchValue={onChangeSearchValue}
      onPressConfirmButton={onPressConfirmButton}
      isExistBread={isExistBread}
    />
  );
};
