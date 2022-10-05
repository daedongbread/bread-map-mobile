import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BakeryReviewStackNavigationProps } from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';

import { BakeryReview, resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { Reviews } from '@shared/Reviews';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

const ReviewList: React.FC = () => {
  const { bakery } = useBakeryDetail();

  const navigation = useNavigation<BakeryReviewStackNavigationProps>();

  const onPress = (review: BakeryReview) => {
    if (!bakery) {
      return;
    }
    navigation.push('BakeryReviewDetail', { info: bakery.bakeryInfo, review });
  };

  return (
    <View style={styles.container}>
      <Divider />
      <Reviews
        headerComponent={
          <TabHeader title={'리뷰'} totalCount={bakery?.bakeryReviews.length || 0} addBtnText={'리뷰 작성'} />
        }
        reviews={bakery?.bakeryReviews!}
        onPress={onPress}
      />
    </View>
  );
};
export { ReviewList };

const styles = StyleSheet.create(
  resizePixels({
    container: {
      marginTop: 32,
      backgroundColor: 'white',
    },
  })
);
