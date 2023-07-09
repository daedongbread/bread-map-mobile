import React, { useCallback, useEffect } from 'react';

import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
import { useGetBakeriesFilter } from '@/apis/bakery/useGetBakeriesFilter';

import { BakeriesBottomSheet } from '@/components/Map/BakeriesBottomSheet';
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
    (bakery: BakeryMapBakeryEntity) => {
      navigate('Bakery', {
        screen: 'BakeryDetailHome',
        params: {
          bakeryId: bakery.id,
          bakeryName: bakery.name,
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

  const { bakeries, refetch } = useGetBakeriesFilter({
    sort,
    latitude: searchMapCameraLocation?.latitude,
    longitude: searchMapCameraLocation?.longitude,
    latitudeDelta: searchMapCameraLocation?.latitudeDelta,
    longitudeDelta: searchMapCameraLocation?.longitudeDelta,
  });

  useEffect(() => {
    if (
      searchMapCameraLocation?.latitude &&
      searchMapCameraLocation?.longitude &&
      searchMapCameraLocation?.latitudeDelta &&
      searchMapCameraLocation?.longitudeDelta
    ) {
      refetch();
    }
  }, [
    refetch,
    searchMapCameraLocation?.latitude,
    searchMapCameraLocation?.latitudeDelta,
    searchMapCameraLocation?.longitude,
    searchMapCameraLocation?.longitudeDelta,
  ]);

  return (
    <BakeriesBottomSheet
      onClickBakery={onClickBakery}
      activeTab={sort}
      onPressTab={onPressTab}
      bakeryList={selectedMarker ? [selectedMarker] : bakeries}
      hasSelected={!!selectedMarker}
      onPressIcon={onPressIcon}
    />
  );
};
