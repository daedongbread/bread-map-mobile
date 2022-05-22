import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Reviews } from '@/components/Shared/Reviews';
import { BakeryDetailTabNavigationProps, BakeryMenuStackParamList } from '@/router/types';
import { BakeryReview } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

// 메뉴에 대한 정보가 있어야해서, 페이지가 있어야함
// 메뉴의 리뷰 상세페이지로 이동 가능 (ReviewDetail)
// type Props = {
//   info: BakeryInfo;
//   menu: MenuItem;
//   reviews: BakeryReview[];
// };

type Props = NativeStackScreenProps<BakeryMenuStackParamList, 'BakeryMenuReviews'>;

// TODO: nested된 navigation의 타입을 입히기 어려워 Props로 대체함
const MenuReviewList: React.FC<Props> = ({ route }) => {
  const {
    params: { info, menu, reviews },
  } = route;

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
