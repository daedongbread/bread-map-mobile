import React, { useState } from 'react';
import { useGetMenuReviews } from '@/apis/review';
import { BakeryMenuDetailComponent } from '@/components/BakeryDetail/BakeryMenu';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useRoute } from '@react-navigation/native';

export const BakeryMenuDetailContainer = () => {
  const route = useRoute<HomeStackScreenProps<'BakeryMenuDetail'>['route']>();

  const { bakeryId, menu } = route.params;
  const [activeTab, setActiveTab] = useState<string>('latest');

  const { reviews, refetch } = useGetMenuReviews({ bakeryId, productId: menu.id, sortBy: activeTab });

  useDidMountEffect(() => {
    refetch();
  }, [activeTab]);

  const onPressTab = (tab: string) => {
    setActiveTab(tab);
  };

  return <BakeryMenuDetailComponent menu={menu} reviews={reviews} activeTab={activeTab} onPressTab={onPressTab} />;
};
