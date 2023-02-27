import React, { useState } from 'react';
import { useGetReviews } from '@/apis/review';
import { MoreButton } from '@/components/BakeryDetail/BakeryHome';
import { BakeryReviewListComponent } from '@/components/BakeryDetail/BakeryReview';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { MainStackParamList, MainStackScreenProps } from '@/pages/MainStack/Stack';
import { CompositeScreenProps, useNavigation, useRoute } from '@react-navigation/native';

type Navigation = CompositeScreenProps<
  BakeryDetailTabScreenProps<'BakeryDetailHome'>,
  MainStackScreenProps<keyof MainStackParamList>
>['navigation'];
type Route = BakeryDetailTabScreenProps<'BakeryDetailHome'>['route'];

export const BakeryReviewBriefListContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const bakeryId = route.params.bakeryId;
  const [activeTab, setActiveTab] = useState<string>('latest');

  const { reviews, refetch: refetchReview } = useGetReviews({ bakeryId });

  useDidMountEffect(() => {
    refetchReview({});
  }, [activeTab]);

  const onPressTab = (tab: string) => {
    setActiveTab(tab);
  };

  const onPressMoreButton = () => {
    navigation.navigate('BakeryDetailReview', {
      bakeryId,
    });
  };

  const briefReviews = reviews?.contents.slice(0, 3) || [];

  return (
    <>
      <BakeryReviewListComponent
        reviews={briefReviews}
        reviewCount={reviews?.contents.length}
        activeTab={activeTab}
        isBrief
        onPressTab={onPressTab}
        refetchReview={refetchReview}
      />
      {!!briefReviews.length && <MoreButton text="전체리뷰보기" onPress={onPressMoreButton} />}
    </>
  );
};
