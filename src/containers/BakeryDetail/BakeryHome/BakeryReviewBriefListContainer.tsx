import React from 'react';
import { BakeryReviewEntity } from '@/apis/bakery/types';
import { useGetReviews } from '@/apis/review';
import { BakeryReviewBriefListComponent } from '@/components/BakeryDetail/BakeryHome';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

export const BakeryReviewBriefListContainer = () => {
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailHome'>['route']>();

  const bakeryId = route.params.bakeryId;
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();

  const { reviews } = useGetReviews({ bakeryId });

  const onPressMoreButton = () => {
    //TODO  navigation 타입 정리 필요함
    (navigation as any).jumpTo('BakeryDetailReview', { bakeryId });
  };

  const onPress = (review: BakeryReviewEntity) => {
    if (!review) {
      return;
    }

    navigation.push('MainTab', {
      screen: 'HomeStack',
      params: {
        screen: 'Bakery',
        params: {
          screen: 'BakeryDetailReview',
          params: { bakeryId: bakeryId },
        },
      },
    });
  };

  const onPressAddBtn = () => {
    navigation.push('ReviewWriteStack', {
      screen: 'ReviewSelect',
    });
  };
  const briefReviews = reviews?.slice(0, 3) || [];
  return (
    <BakeryReviewBriefListComponent
      reviews={reviews!}
      briefReviews={briefReviews}
      onPress={onPress}
      onPressAddBtn={onPressAddBtn}
      onPressMoreButton={onPressMoreButton}
    />
  );
};
