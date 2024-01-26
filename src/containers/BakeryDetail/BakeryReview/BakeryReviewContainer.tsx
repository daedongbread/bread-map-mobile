import React, { useEffect, useState } from 'react';
import { useGetBakery } from '@/apis/bakery';
import { useGetInfiniteReviews } from '@/apis/review';
import { BakeryReviewListComponent } from '@/components/BakeryDetail/BakeryReview';
import { ScrollView } from '@/components/Shared/View';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { BakeryReviewStackScreenProps } from '@/pages/MainStack/BakeryDetail/Tab/BakeryReview/Stack';
import { useRoute } from '@react-navigation/native';

export const BakeryReviewContainer = () => {
  const route = useRoute<BakeryReviewStackScreenProps<'BakeryReview'>['route']>();

  const bakeryId = route.params.bakeryId;
  const [activeTab, setActiveTab] = useState<string>('latest');

  const { bakery } = useGetBakery({ bakeryId });
  const {
    reviews = [],
    hasNextPage,
    fetchNextPage,
    refetch,
    remove,
  } = useGetInfiniteReviews({ bakeryId, sortBy: activeTab });

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

  // unmount시 쿼리 초기화
  useEffect(() => {
    return () => {
      remove();
    };
  }, [remove]);

  if (!bakery) {
    return null;
  }

  return (
    <ScrollView onScrollEnd={onScrollEnd}>
      <BakeryReviewListComponent
        bakeryId={bakeryId}
        bakeryName={bakery.bakeryInfo.name}
        reviews={flatReviews}
        reviewCount={reviews.length > 0 ? reviews[0].totalElements : 0}
        activeTab={activeTab}
        onPressTab={onPressTab}
      />
    </ScrollView>
  );
};
