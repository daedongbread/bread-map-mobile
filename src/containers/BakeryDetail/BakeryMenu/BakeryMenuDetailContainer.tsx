import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetMenuReviews } from '@/apis/review';
import { BakeryMenuDetailComponent } from '@/components/BakeryDetail/BakeryMenu';
import { BakeryReviewListComponent } from '@/components/BakeryDetail/BakeryReview';
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
    <ScrollView>
      <BakeryMenuDetailComponent menu={menu} />
      <BakeryReviewListComponent
        reviews={reviews?.contents}
        reviewCount={reviews?.contents.length}
        activeTab={activeTab}
        onPressTab={onPressTab}
        refetchReview={refetchReview}
      />
    </ScrollView>
  );
};
