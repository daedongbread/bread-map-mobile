import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Reviews } from '@/components/Shared/Reviews';
import { BakeryMenuStackNavigationProps } from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

const MenuReviewList: React.FC<BakeryMenuStackNavigationProps<'BakeryMenuReviews'>> = ({ navigation, route }) => {
  const {
    params: { info, menu, reviews },
  } = route;

  const onPress = (review: unknown) => {
    navigation.push('BakeryMenuReviews', { screen: 'BakeryReviewDetail', params: { info, review } });
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
