import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BakeryReviewEntity } from '@/apis/bakery/types';
import { useGetReviews } from '@/apis/review';
import { Divider } from '@/components/BakeryDetail/Divider';
import { TabHeader } from '@/components/BakeryDetail/TabHeader';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { Reviews } from '@shared/Reviews';

type Props = {
  bakeryId: number;
};

export const BakeryReviewContainer = ({ bakeryId }: Props) => {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();

  const { reviews } = useGetReviews({ bakeryId });

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
          params: {
            screen: 'BakeryReviewDetail',
            params: { reviewId: review.id },
          },
        },
      },
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

const styles = StyleSheet.create(
  resizePixels({
    container: {
      marginTop: 24,
      backgroundColor: 'white',
    },
  })
);
