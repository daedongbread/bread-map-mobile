import React from 'react';
import { useGetBakery } from '@/apis/bakery';
import { BakeryMenuEntity } from '@/apis/bakery/types';
import { BakeryMenuComponent } from '@/components/BakeryDetail/BakeryMenu';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

export const BakeryMenuContainer = () => {
  const navigation = useNavigation<HomeStackScreenProps<'BakeryMenuReviews'>['navigation']>();
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailMenu'>['route']>();

  const bakeryId = route.params.bakeryId;
  const { bakery } = useGetBakery({ bakeryId });

  const onPress = (menu: BakeryMenuEntity) => {
    if (!bakery) {
      return;
    }

    navigation.push('BakeryMenuReviews', {
      bakeryId,
      menu,
    });
  };

  return <BakeryMenuComponent bakeryId={bakeryId} bakery={bakery} onPress={onPress} />;
};
