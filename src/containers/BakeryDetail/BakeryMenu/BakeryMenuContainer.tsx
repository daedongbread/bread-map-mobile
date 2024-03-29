import React from 'react';
import { useGetMenus } from '@/apis/menu';
import { MenuEntity } from '@/apis/menu/type';
import { BakeryMenuComponent } from '@/components/BakeryDetail/BakeryMenu';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

export const BakeryMenuContainer = () => {
  const navigation = useNavigation<HomeStackScreenProps<'BakeryMenuDetail'>['navigation']>();
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailMenu'>['route']>();

  const { bakeryId, bakeryName } = route.params;
  const { menus = [] } = useGetMenus({ bakeryId });

  const onPress = (breads: MenuEntity) => {
    if (!breads) {
      return;
    }

    navigation.push('BakeryMenuDetail', {
      bakeryId,
      bakeryName,
      menu: breads,
    });
  };

  return <BakeryMenuComponent bakeryId={bakeryId} menus={menus} onPress={onPress} />;
};
