import React, { useCallback, useState } from 'react';
import { BakeryBottomSheet } from '@/components/Home/BakeryBottomSheet';
import { bakeryInfo, bakeryMenu, bakeryReviews, bakeryList } from '@/utils';
import { useNavigation } from '@react-navigation/native';

const bakeryData = { bakeryMenu, bakeryReviews, bakeryInfo };

export type TabItem = 'distance' | 'popularity';

const BakeryBottomSheetContainer: React.VFC = () => {
  const { navigate } = useNavigation();

  const [activeTab, setActiveTab] = useState<TabItem>('distance');

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

  return (
    <BakeryBottomSheet
      onClickBakery={onClickBakery}
      activeTab={activeTab}
      onPressTab={onPressTab}
      bakeryList={bakeryList}
    />
  );
};

export { BakeryBottomSheetContainer };
