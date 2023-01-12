import React from 'react';
import { BakeryMenuListContainer } from '@/containers/BakeryDetail/BakeryMenuListContainer';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/BakeryDetailTopTab';

export type MenuItem = {
  name: string;
  price: number;
  rating: number;
};

const MenuList: React.FC<BakeryDetailTabScreenProps<'BakeryDetailMenu'>> = ({ route }) => {
  const { bakeryId } = route.params;
  return <BakeryMenuListContainer bakeryId={bakeryId} />;
};

export { MenuList };
