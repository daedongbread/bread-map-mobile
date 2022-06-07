import React, { useCallback, useState } from 'react';

import { BakeryEntity } from '@/apis';

import { BakeriesBottomSheet } from '@/components/Home/BakeriesBottomSheet';

import { HomeStackScreenProps } from '@/router/types';
import { bakeryInfo, bakeryMenu, bakeryReviews, bakeryList } from '@/utils';
import { useNavigation } from '@react-navigation/native';

const bakeryData = { bakeryMenu, bakeryReviews, bakeryInfo };

export type TabItem = 'distance' | 'popularity';

export const BakeryBottomSheetContainer: React.VFC = () => {
  const [activeTab, setActiveTab] = useState<TabItem>('distance');

  const { navigate, push } = useNavigation<HomeStackScreenProps<'Home'>['navigation']>();

  const onPressTab = useCallback((tabItem: TabItem) => {
    setActiveTab(tabItem);
  }, []);

  // TODO: fix params, pass bakeryId not bakery data
  const onClickBakery = useCallback(() => {
    navigate('BakeryDetail', {
      screen: 'BakeryDetailHome',
      params: {
        ...bakeryData,
      },
    });
  }, [navigate]);

  const onPressIcon = (bakery: BakeryEntity) => {
    push('BookmarkBottomSheet', {
      bakeryId: bakery.bakeryId,
      name: bakery.bakeryName,
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
