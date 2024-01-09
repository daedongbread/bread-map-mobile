import React from 'react';
import { useGetBakery } from '@/apis/bakery';
import { BakeryRatingComponent } from '@/components/BakeryDetail/BakeryHome';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/BakeryDetail';
import { useRoute } from '@react-navigation/native';

export const BakeryRatingContainer = () => {
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailHome'>['route']>();

  const bakeryId = route.params.bakeryId;
  const { bakery } = useGetBakery({ bakeryId });

  return <BakeryRatingComponent bakery={bakery!} />;
};
