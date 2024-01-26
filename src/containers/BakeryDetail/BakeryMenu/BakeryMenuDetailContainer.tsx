import React, { useState } from 'react';
import { useGetInfiniteMenuReviews } from '@/apis/review';
import { BakeryMenuDetailComponent } from '@/components/BakeryDetail/BakeryMenu';
import { BakeryReviewListComponent } from '@/components/BakeryDetail/BakeryReview';
import { ScrollView } from '@/components/Shared/View';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useRoute } from '@react-navigation/native';

type Route = MainStackScreenProps<'BakeryMenuDetail'>['route'];

export const BakeryMenuDetailContainer = () => {
  const route = useRoute<Route>();

  const { bakeryId, bakeryName, menu } = route.params;
  const [activeTab, setActiveTab] = useState<string>('latest');

  const {
    reviews = [],
    hasNextPage,
    fetchNextPage,
    refetch,
    remove,
  } = useGetInfiniteMenuReviews({
    bakeryId,
    productId: menu.id,
    sortBy: activeTab,
  });
  const flatReviews = reviews && reviews.map(review => review.contents).flat();

  useDidMountEffect(() => {
    remove();
    refetch();
  }, [activeTab]);

  const onPressTab = (tab: string) => {
    setActiveTab(tab);
  };

  const onScrollEnd = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <ScrollView onScrollEnd={onScrollEnd}>
      <BakeryMenuDetailComponent bakeryName={bakeryName} menu={menu} />
      <BakeryReviewListComponent
        bakeryId={bakeryId}
        bakeryName={bakeryName}
        reviews={flatReviews}
        reviewCount={reviews.length > 0 ? reviews[0].totalElements : 0}
        activeTab={activeTab}
        onPressTab={onPressTab}
      />
    </ScrollView>
  );
};
