import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useGetBakery } from '@/apis/bakery';
import { BakeryMenuEntity } from '@/apis/bakery/types';
import { Divider } from '@/components/BakeryDetail/Divider';
import { TabHeader } from '@/components/BakeryDetail/TabHeader';
import { Button } from '@/components/Shared/Button/Button';
import { Menu } from '@/components/Shared/Menu';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';

type Props = {
  bakeryId: number;
};

export const BakeryMenuBriefListContainer = ({ bakeryId }: Props) => {
  const { bakery } = useGetBakery({ bakeryId });
  const navigation = useNavigation<HomeStackScreenProps<'BakeryMenuReviews'>['navigation']>();
  const onPress = (menu: BakeryMenuEntity) => {
    if (!bakery) {
      return;
    }
    navigation.push('BakeryMenuReviews', {
      bakeryId,
      menu,
    });
  };

  if (!bakery) {
    return <></>;
  }

  const { menu } = bakery;
  const briefMenu = menu.slice(0, 5);

  return (
    <>
      <Divider />
      <View style={styles.container}>
        <TabHeader onPressAddBtn={() => {}} title={'메뉴'} totalCount={bakery?.menu.length || 0} />
        {bakery &&
          bakery.menu.length > 0 &&
          briefMenu.map(menuData => (
            <TouchableOpacity onPress={() => onPress(menuData)}>
              <Menu name={menuData.name} price={Number(menuData.price)} rating={menuData.rating} />
            </TouchableOpacity>
          ))}
      </View>
      <Button size="large" appearance="terdary" style={{ marginHorizontal: 20, marginVertical: 24 }}>
        <Text style={styles.footerButtonText}>전체메뉴보기</Text>
      </Button>
    </>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      backgroundColor: 'white',

      paddingHorizontal: 20,
    },
    footerButtonText: {
      fontSize: 14,
      fontWeight: '700',
    },
  })
);
