import React, { useState } from 'react';
import { useGetReviews } from '@/apis/review';
import { BakeryReviewComponent } from '@/components/BakeryDetail/BakeryReview';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { BakeryReviewStackParamList } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const BakeryReviewContainer = () => {
  const route = useRoute<NativeStackScreenProps<BakeryReviewStackParamList, 'BakeryReviews'>['route']>();

  const bakeryId = route.params.bakeryId;
  const [activeTab, setActiveTab] = useState<string>('latest');

  const { reviews, refetch } = useGetReviews({ bakeryId, sortBy: activeTab });

  useDidMountEffect(() => {
    refetch();
  }, [activeTab]);

  const onPressTab = (tab: string) => {
    setActiveTab(tab);
  };

  return <BakeryReviewComponent reviews={reviews} activeTab={activeTab} onPressTab={onPressTab} />;
};
