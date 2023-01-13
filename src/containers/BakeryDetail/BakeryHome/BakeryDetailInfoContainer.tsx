import React from 'react';
import { useGetBakery } from '@/apis/bakery';
import { BakeryDetailInfoComponent } from '@/components/BakeryDetail/BakeryHome';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { useRoute } from '@react-navigation/native';

export const BakeryDetailInfoContainer = () => {
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailHome'>['route']>();

  const bakeryId = route.params.bakeryId;
  const { bakery } = useGetBakery({ bakeryId });

  return <BakeryDetailInfoComponent bakeryId={bakeryId} bakeryInfo={bakery} />;
};
