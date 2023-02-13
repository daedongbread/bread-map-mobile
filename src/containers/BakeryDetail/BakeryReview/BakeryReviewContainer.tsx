import React, { useState } from 'react';
import { useGetReviews } from '@/apis/review';
import { BakeryReviewListComponent } from '@/components/BakeryDetail/BakeryReview';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { BakeryReviewStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview/Stack';
import { useRoute } from '@react-navigation/native';

export const BakeryReviewContainer = () => {
  const route = useRoute<BakeryReviewStackScreenProps<'BakeryReview'>['route']>();

  const bakeryId = route.params.bakeryId;
  const [activeTab, setActiveTab] = useState<string>('latest');

  const { reviews, refetch } = useGetReviews({ bakeryId, sortBy: activeTab });

  useDidMountEffect(() => {
    refetch();
  }, [activeTab]);

  const onPressTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <BakeryReviewListComponent
      reviews={reviews?.contents}
      reviewCount={reviews?.contents.length}
      activeTab={activeTab}
      onPressTab={onPressTab}
      refetchReview={refetch}
    />
  );
};
