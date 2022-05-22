import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { BakeryDetailTabScreenProps } from '@/router';
import { BakeryDetailTabNavigationProps } from '@/router/types';
import { BakeryReview } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { Reviews } from '@shared/Reviews';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

const ReviewList: React.FC<BakeryDetailTabScreenProps<'BakeryDetailReview'>> = () => {
  const { bakery } = useBakeryDetail();

  const navigation = useNavigation<BakeryDetailTabNavigationProps>();

  const onPress = (review: BakeryReview) => {
    if (!bakery) {
      return;
    }
    navigation.push('BakeryDetailReview', { screen: 'BakeryDetail', params: { info: bakery.bakeryInfo, review } });
  };

  return (
    <View style={styles.container}>
      <Divider />
      <TabHeader title={'리뷰'} totalCount={bakery?.bakeryReviews.length || 0} addBtnText={'리뷰 작성'} />
      <Reviews reviews={bakery?.bakeryReviews!} onPress={onPress} />
    </View>
  );
};
export { ReviewList };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
