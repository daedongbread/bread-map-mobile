import React, { useCallback, useState } from 'react';

import { useGetBakeries } from '@/apis';

import { BakeriesBottomSheet } from '@/components/Home/BakeriesBottomSheet';

import { useGeolocation } from '@/hooks/useGeolocation';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { bakeryInfo, bakeryMenu, bakeryReviews, bakeryList } from '@/utils';
import { useNavigation } from '@react-navigation/native';

const bakeryData = { bakeryMenu, bakeryReviews, bakeryInfo };

export type TabItem = 'distance' | 'popularity';

export const BakeryBottomSheetContainer: React.VFC = () => {
  const { currentPosition } = useGeolocation();

  const [activeTab, setActiveTab] = useState<TabItem>('distance');

  const { navigate } = useNavigation<HomeStackScreenProps<'Home'>['navigation']>();

  const onPressTab = useCallback((tabItem: TabItem) => {
    setActiveTab(tabItem);
  }, []);

  // TODO: fix params, pass bakeryId not bakery data
  const onClickBakery = useCallback(
    (id: number) => {
      navigate('Bakery', {
        screen: 'BakeryDetailHome',
        params: {
          ...bakeryData,
        },
      });
    },
    [navigate]
  );

  const onPressIcon = (bakery: BakeryEntity) => {
    navigate('MainStack', {
      screen: 'BookmarkBottomSheet',
      params: {
        bakeryId: bakery.bakeryId,
        name: bakery.bakeryName,
      },
    });
  };

  const { bakeries } = useGetBakeries({
    sort: 'distance',
    latitude: currentPosition?.latitude,
    longitude: currentPosition?.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.02,
  });

  return (
    <BakeriesBottomSheet
      onClickBakery={onClickBakery}
      activeTab={activeTab}
      onPressTab={onPressTab}
      bakeryList={bakeryList}
      onPressIcon={onPressIcon}
    />
  );
};
