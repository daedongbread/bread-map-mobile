import React, { useCallback, useState } from 'react';
import { BakeryBottomSheet } from '@/components/Home/BakeryBottomSheet';
import { bakeryInfo, bakeryMenu, bakeryReviews } from '@/utils';
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
  //
  // const handleSheetChanges = useCallback((index: number) => {}, []);

  return (
    <BakeryBottomSheet
      // onChange={handleSheetChanges}
      onClickBakery={onClickBakery}
      activeTab={activeTab}
      onPressTab={onPressTab}
    />
  );
};

export { BakeryBottomSheetContainer };
