import React from 'react';
import { useGetBakery } from '@/apis/bakery';
import { BakeryMenuEntity } from '@/apis/bakery/types';
import { BakeryMenuBriefListComponent } from '@/components/BakeryDetail/BakeryHome';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

export const BakeryMenuBriefListContainer = () => {
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailHome'>['route']>();

  const bakeryId = route.params.bakeryId;
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

  const onPressMoreButton = () => {
    //TODO  navigation 타입 정리 필요함
    (navigation as any).jumpTo('BakeryDetailMenu', { bakeryId });
  };

  if (!bakery) {
    return <></>;
  }

  const { menu } = bakery;
  const briefMenu = menu.slice(0, 3);

  return (
    <BakeryMenuBriefListComponent
      bakery={bakery}
      briefMenu={briefMenu}
      onPress={onPress}
      onPressMoreButton={onPressMoreButton}
    />
  );
};
