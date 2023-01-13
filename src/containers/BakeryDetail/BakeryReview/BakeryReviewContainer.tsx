import React from 'react';
import { BakeryReviewEntity } from '@/apis/bakery/types';
import { useGetReviews } from '@/apis/review';
import { BakeryReviewComponent } from '@/components/BakeryDetail/BakeryReview';
import { BakeryReviewStackParamList } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const BakeryReviewContainer = () => {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const route = useRoute<NativeStackScreenProps<BakeryReviewStackParamList, 'BakeryReviews'>['route']>();

  const bakeryId = route.params.bakeryId;
  const { reviews } = useGetReviews({ bakeryId });

  const onPress = (review: BakeryReviewEntity) => {
    if (!review) {
      return;
    }
  };

  const onPressAddBtn = () => {
    navigation.push('ReviewWriteStack', {
      screen: 'ReviewSelect',
    });
  };

  return <BakeryReviewComponent reviews={reviews!} onPress={onPress} onPressAddBtn={onPressAddBtn} />;
};
