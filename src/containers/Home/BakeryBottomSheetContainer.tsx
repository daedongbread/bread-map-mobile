import React, { useCallback, useState } from 'react';

import { BakeryEntity } from '@/apis';

import { BakeriesBottomSheet } from '@/components/Home/BakeriesBottomSheet';

import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { bakeryInfo, bakeryMenu, bakeryReviews, bakeryList } from '@/utils';
import { useNavigation } from '@react-navigation/native';

const bakeryData = { bakeryMenu, bakeryReviews, bakeryInfo };

export type TabItem = 'distance' | 'popularity';

export const BakeryBottomSheetContainer: React.VFC = () => {
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
