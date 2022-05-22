import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Menus } from '@/components/Shared/Menu';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { BakeryDetailTabScreenProps } from '@/router';
import { BakeryDetailTabNavigationProps } from '@/router/types';
import { BakeryReview } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

export type MenuItem = {
  name: string;
  price: number;
  rating: number;
};

const MenuList: React.FC<BakeryDetailTabScreenProps<'BakeryDetailMenu'>> = () => {
  const { bakery } = useBakeryDetail();

  const navigation = useNavigation<BakeryDetailTabNavigationProps>();

  const onPress = (menu: MenuItem, reviews: BakeryReview[]) => {
    if (!bakery) {
      return;
    }

    navigation.push('BakeryDetailMenu', {
      screen: 'BakeryMenuReviews',
      params: {
        info: bakery.bakeryInfo,
        menu,
        reviews,
      },
    });
  };

  return (
    bakery && (
      <View style={styles.container}>
        <Divider />
        <TabHeader title={'메뉴'} totalCount={bakery.bakeryMenu.length || 0} addBtnText={'메뉴 입력'} />
        <View style={styles.content}>
          <Menus bakery={bakery} onPress={onPress} />
        </View>
      </View>
    )
  );
};

export { MenuList };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
});
