import React, { useState } from 'react';
import { useGetMenuReviews } from '@/apis/review';
import { BakeryMenuDetailComponent } from '@/components/BakeryDetail/BakeryMenu';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useRoute } from '@react-navigation/native';

type Route = HomeStackScreenProps<'BakeryMenuDetail'>['route'];

export const BakeryMenuDetailContainer = () => {
  const route = useRoute<Route>();

  const { bakeryId, menu } = route.params;
  const [activeTab, setActiveTab] = useState<string>('latest');

  const { reviews, refetch: refetchReview } = useGetMenuReviews({ bakeryId, productId: menu.id, sortBy: activeTab });

  useDidMountEffect(() => {
    refetchReview();
  }, [activeTab]);

  const onPressTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <BakeryMenuDetailComponent
      menu={menu}
      reviews={reviews}
      activeTab={activeTab}
      onPressTab={onPressTab}
      refetchReview={refetchReview}
    />
  );
};
