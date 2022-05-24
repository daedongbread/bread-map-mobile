import React, { useCallback, useState } from 'react';

import { BakeryEntity } from '@/apis';

import { BakeriesBottomSheet } from '@/components/Home/BakeriesBottomSheet';
import { BakeryBookmarksBottomSheet } from '@/components/Home/BakeryBookmarksBottomSheet';

import { bakeryInfo, bakeryMenu, bakeryReviews, bakeryList } from '@/utils';

import { useNavigation } from '@react-navigation/native';

import { CircleFlag, HeartIcon } from '@shared/Icons';

const bakeryData = { bakeryMenu, bakeryReviews, bakeryInfo };

export type TabItem = 'distance' | 'popularity';

export const BakeryBottomSheetContainer: React.VFC = () => {
  const { navigate } = useNavigation();

  const [activeTab, setActiveTab] = useState<TabItem>('distance');

  const [selectBakery, setSelectBakery] = useState<BakeryEntity | null>();

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

  const onClose = () => {
    setSelectBakery(null);
  };

  const onPressSave = (bakery: BakeryEntity) => {
    setSelectBakery(bakery);
  };

  const onPressNewStore = () => {
    const bakeryId = selectBakery?.bakeryId;
    if (bakeryId) {
      onClose();
      navigate('StoreBakery', { bakeryId });
    }
  };

  const list = [
    { id: 1, icon: CircleFlag, text: '가고싶어요', isSelect: true },
    { id: 2, icon: HeartIcon, text: '가봤어요', isSelect: false },
  ];

  return (
    <>
      <BakeriesBottomSheet
        onClickBakery={onClickBakery}
        activeTab={activeTab}
        onPressTab={onPressTab}
        bakeryList={bakeryList}
        onPressSave={onPressSave}
      />

      {selectBakery ? (
        <BakeryBookmarksBottomSheet
          list={list}
          bakery={selectBakery}
          onPressNewList={onPressNewStore}
          onClose={onClose}
          onSave={() => {}}
        />
      ) : null}
    </>
  );
};
