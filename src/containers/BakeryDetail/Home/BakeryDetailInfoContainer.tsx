import React from 'react';
import { useGetBakery } from '@/apis/bakery';
import { BakeryDetailInfoComponent } from '@/components/BakeryDetail/Home';

type Props = {
  bakeryId: number;
};

export const BakeryDetailInfoContainer = ({ bakeryId }: Props) => {
  const { bakery } = useGetBakery({ bakeryId });

  return <BakeryDetailInfoComponent bakeryInfo={bakery} />;
};
