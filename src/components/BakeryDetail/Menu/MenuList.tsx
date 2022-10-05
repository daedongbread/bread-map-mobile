import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Menus } from '@/components/Shared/Menu';
import { BakeryMenuStackNavigationProps } from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { BakeryReview } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

export type MenuItem = {
  name: string;
  price: number;
  rating: number;
};
// 다른부분들도 헤더탭부분 렌더링 변경하기
const MenuList = () => {
  const { bakery } = useBakeryDetail();

  const navigation = useNavigation<BakeryMenuStackNavigationProps>();

  const onPress = (menu: MenuItem, reviews: BakeryReview[]) => {
    if (!bakery) {
      return;
    }

    navigation.push('BakeryMenuReviews', {
      info: bakery.bakeryInfo,
      menu,
      reviews,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Divider />

      {bakery && bakery.bakeryMenu.length > 0 && (
        <Menus
          headerComponent={<TabHeader title={'메뉴'} totalCount={bakery?.bakeryMenu.length || 0} />}
          bakery={bakery!}
          onPress={onPress}
        />
      )}
    </SafeAreaView>
  );
};

export { MenuList };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 32,
  },
});
