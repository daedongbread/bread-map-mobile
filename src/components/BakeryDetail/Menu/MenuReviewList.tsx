import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Reviews } from '@/components/Shared/Reviews';
import { BakeryDetailTabNavigationProps } from '@/router/types';
import { BakeryInfo, BakeryReview } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';
import { MenuItem } from './MenuList';

// 메뉴에 대한 정보가 있어야해서, 페이지가 있어야함
// 메뉴의 리뷰 상세페이지로 이동 가능 (ReviewDetail)
type Props = {
  info: BakeryInfo;
  menu: MenuItem;
  reviews: BakeryReview[];
};

// TODO: nested된 navigation의 타입을 입히기 어려워 Props로 대체함
const MenuReviewList: React.FC<Props> = ({ info, menu, reviews }) => {
  const navigation = useNavigation<BakeryDetailTabNavigationProps>();

  const onPress = (review: BakeryReview) => {
    navigation.push('BakeryDetailReview', { screen: 'BakeryDetail', params: { info, review } });
  };

  return (
    <View>
      <Text>{menu.name}</Text>
      <Text>{menu.price}원</Text>
      <View style={styles.container}>
        <Divider />
        <TabHeader title={'리뷰'} totalCount={reviews.length || 0} addBtnText={'리뷰 작성'} />
        <Reviews reviews={reviews} onPress={onPress} />
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
