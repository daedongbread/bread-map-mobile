import React from 'react';
import { useGetMenus } from '@/apis/menu';
import { MenuEntity } from '@/apis/menu/type';
import { BakeryMenuBriefListComponent } from '@/components/BakeryDetail/BakeryHome';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

export const BakeryMenuBriefListContainer = () => {
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailHome'>['route']>();
  const navigation = useNavigation<HomeStackScreenProps<'BakeryMenuReviews'>['navigation']>();

  const bakeryId = route.params.bakeryId;
  const { menus = [] } = useGetMenus({ bakeryId });

  const onPress = (menu: MenuEntity) => {
    if (!menu) {
      return;
    }
    navigation.push('BakeryMenuReviews', {
      bakeryId,
      menu,
    });
  };

  const onPressMoreButton = () => {
    //TODO  navigation 타입 정리 필요함
    (navigation as any).jumpTo('BakeryDetailMenu', { bakeryId });
  };

  if (!menus) {
    return <></>;
  }

  const briefMenu = menus.slice(0, 3);

  return (
    <BakeryMenuBriefListComponent
      briefMenu={briefMenu}
      totalCount={menus.length}
      onPress={onPress}
      onPressMoreButton={onPressMoreButton}
    />
  );
};
