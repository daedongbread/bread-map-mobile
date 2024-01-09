import React, { useState } from 'react';
import { useGetInfiniteReviews } from '@/apis/review';
import { MoreButton } from '@/components/BakeryDetail/BakeryHome';
import { BakeryReviewListComponent } from '@/components/BakeryDetail/BakeryReview';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/BakeryDetail';
import { useNavigation, useRoute } from '@react-navigation/native';

type Navigation = BakeryDetailTabScreenProps<'BakeryDetailHome'>['navigation'];
type Route = BakeryDetailTabScreenProps<'BakeryDetailHome'>['route'];

export const BakeryReviewBriefListContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const bakeryId = route.params.bakeryId;
  const [activeTab, setActiveTab] = useState<string>('latest');

  const { reviews = [], refetch: refetchReview } = useGetInfiniteReviews({ bakeryId });

  useDidMountEffect(() => {
    refetchReview();
  }, [activeTab]);

  const onPressTab = (tab: string) => {
    setActiveTab(tab);
  };

  const onPressMoreButton = () => {
    navigation.navigate('BakeryDetailReview', {
      bakeryId,
    });
  };

  const flatReviews = reviews && reviews.map(review => review.contents).flat();
  const briefReviews = flatReviews?.slice(0, 3) || [];

  return (
    <>
      <BakeryReviewListComponent
        bakeryId={bakeryId}
        reviews={briefReviews}
        reviewCount={reviews.length > 0 ? reviews[0].totalElements : 0}
        activeTab={activeTab}
        isBrief
        onPressTab={onPressTab}
      />
      {!!briefReviews.length && <MoreButton text="전체리뷰보기" onPress={onPressMoreButton} />}
    </>
  );
};
