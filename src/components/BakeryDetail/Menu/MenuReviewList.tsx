import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Reviews } from '@/components/Shared/Reviews';
import { BakeryMenuStackParamList } from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';
import { BakeryReview } from '@/utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

type Props = NativeStackScreenProps<BakeryMenuStackParamList, 'BakeryMenuReviews'>;

const MenuReviewList: React.FC<Props> = ({ navigation, route }) => {
  const {
    params: { info, menu, reviews },
  } = route;

  const onPress = (review: BakeryReview) => {
    navigation.push('BakeryDetailReview', { screen: 'BakeryReviewDetail', params: { info, review } });
  }; // 왜 안되는거지

  return (
    <View>
      <Text>{menu.name}</Text>
      <Text>{menu.price}원</Text>
      <View style={styles.container}>
        <Divider />
        <Reviews
          headerComponent={<TabHeader title={'리뷰'} totalCount={reviews.length || 0} addBtnText={'리뷰 작성'} />}
          reviews={reviews}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export { MenuReviewList };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
});
