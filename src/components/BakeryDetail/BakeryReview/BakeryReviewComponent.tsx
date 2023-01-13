import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BakeryReviewEntity } from '@/apis/bakery/types';
import { Reviews } from '@/components/Shared/Reviews';
import { resizePixels } from '@/utils';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

type Props = {
  reviews: BakeryReviewEntity[];
  onPress: (review: BakeryReviewEntity) => void;
  onPressAddBtn: () => void;
};

export const BakeryReviewComponent = ({ reviews, onPress, onPressAddBtn }: Props) => {
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
      backgroundColor: 'white',
    },
  })
);
