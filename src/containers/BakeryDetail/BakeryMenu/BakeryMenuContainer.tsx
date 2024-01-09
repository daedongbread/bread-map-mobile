import React from 'react';
import { useGetBakery } from '@/apis/bakery';
import { useGetMenus } from '@/apis/menu';
import { MenuEntity } from '@/apis/menu/type';
import { BakeryMenuComponent } from '@/components/BakeryDetail/BakeryMenu';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/BakeryDetail';
import { useNavigation, useRoute } from '@react-navigation/native';

export const BakeryMenuContainer = () => {
  const navigation = useNavigation<BakeryDetailTabScreenProps<'BakeryDetailMenu'>['navigation']>();
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailMenu'>['route']>();

  const { bakeryId } = route.params;

  const { bakery } = useGetBakery({ bakeryId });
  const { menus = [] } = useGetMenus({ bakeryId });

  const onPress = (menu: MenuEntity) => {
    if (!menu) {
      return;
    }

    navigation.push('MainStack', {
      screen: 'BakeryMenuDetail',
      params: {
        bakeryId,
        bakeryName: bakery?.bakeryInfo.name || '',
        menu,
      },
    });
  };

  return <BakeryMenuComponent bakeryId={bakeryId} menus={menus} onPress={onPress} />;
};
