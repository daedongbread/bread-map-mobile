import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BakeryReviewEntity } from '@/apis/bakery/types';
import { useGetReviews } from '@/apis/review';
import {
  BakeryMenuStackParamList,
  BakeryReviewStackParamList,
} from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';
import { MainStackParamList } from '@/pages/MainStack/Stack';

import { resizePixels } from '@/utils';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Reviews } from '@shared/Reviews';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

type Navigation = CompositeScreenProps<
  StackScreenProps<BakeryMenuStackParamList, 'BakeryMenus'>,
  CompositeScreenProps<StackScreenProps<MainStackParamList>, StackScreenProps<BakeryReviewStackParamList>>
>;

const ReviewList: React.FC = () => {
  const { reviews } = useGetReviews({ bakeryId: 30300001400004 });

  const navigation = useNavigation<Navigation['navigation']>();

  const onPress = (review: BakeryReviewEntity) => {
    if (!reviews) {
      return;
    }

    navigation.push('BakeryReviewDetail', {
      reviewId: review.id,
    });
  };

  const onPressAddBtn = () => {
    navigation.push('ReviewWriteStack', {
      screen: 'ReviewSelect',
    });
  };

  return (
    <View style={styles.container}>
      <Divider />
      <Reviews
        headerComponent={
          <TabHeader
            title={'리뷰'}
            totalCount={reviews?.length || 0}
            addBtnText={'리뷰 작성'}
            onPressAddBtn={onPressAddBtn}
          />
        }
        reviews={reviews!}
        onPress={onPress}
      />
    </View>
  );
};
export { ReviewList };

const styles = StyleSheet.create(
  resizePixels({
    container: {
      backgroundColor: 'white',
    },
  })
);
