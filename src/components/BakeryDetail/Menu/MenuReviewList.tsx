import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useGetMenuReviews } from '@/apis/review/useGetMenuReviews';
import { Reviews } from '@/components/Shared/Reviews';
import { BakeryMenuStackNavigationProps } from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

const MenuReviewList: React.FC<BakeryMenuStackNavigationProps<'BakeryMenuReviews'>> = ({ route }) => {
  const {
    params: { menu, bakeryId },
  } = route;

  const { data } = useGetMenuReviews({ bakeryId, productName: menu.name });
  const onPress = () => {
    // navigation.push('BakeryMenuReviews', { screen: 'BakeryReviewDetail', params: { info, review } });
  };
  if (!data) {
    return <></>;
  }

  return (
    <View>
      <Text>{menu.name}</Text>
      <Text>{menu.price}원</Text>
      <View style={styles.container}>
        <Divider />
        <Reviews
          headerComponent={
            <TabHeader onPressAddBtn={() => {}} title={'리뷰'} totalCount={data.length || 0} addBtnText={'리뷰 작성'} />
          }
          reviews={data}
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
