import React, { useCallback } from 'react';

import { useGetBakeries } from '@/apis';

import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
import { BakeriesBottomSheet } from '@/components/Home/BakeriesBottomSheet';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { onChangeSort } from '@/slices/bakeryMap';
import { useNavigation } from '@react-navigation/native';

export type TabItem = 'distance' | 'popular';

export const BakeryBottomSheetContainer: React.VFC = () => {
  const dispatch = useAppDispatch();
  const { searchMapCameraLocation, selectedMarker, sort } = useAppSelector(select => select.bakeryMap);

  const { navigate } = useNavigation<HomeStackScreenProps<'Home'>['navigation']>();

  const onPressTab = useCallback(
    (tabItem: TabItem) => {
      dispatch(onChangeSort({ sort: tabItem }));
    },
    [dispatch]
  );

  // TODO: fix params, pass bakeryId not bakery data
  const onClickBakery = useCallback(
    (id: number) => {
      navigate('Bakery', {
        screen: 'BakeryDetailHome',
        params: {
          bakeryId: id,
        },
      });
    },
    [navigate]
  );

  const onPressIcon = (bakery: BakeryMapBakeryEntity) => {
    navigate('MainStack', {
      screen: 'BookmarkBottomSheet',
      params: {
        bakeryId: bakery.id,
        name: bakery.name,
      },
    });
  };

  const { bakeries } = useGetBakeries({
    sort,
    latitude: searchMapCameraLocation?.latitude,
    longitude: searchMapCameraLocation?.longitude,
    latitudeDelta: searchMapCameraLocation?.latitudeDelta,
    longitudeDelta: searchMapCameraLocation?.longitudeDelta,
  });

  return (
    <BakeriesBottomSheet
      onClickBakery={onClickBakery}
      activeTab={sort}
      onPressTab={onPressTab}
      bakeryList={selectedMarker ? [selectedMarker] : bakeries}
      onPressIcon={onPressIcon}
    />
  );
};
