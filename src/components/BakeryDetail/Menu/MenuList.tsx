import React from 'react';
import { BakeryMenuListContainer } from '@/containers/BakeryDetail/BakeryMenuListContainer';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';

export type MenuItem = {
  name: string;
  price: number;
  rating: number;
};

const MenuList: React.FC<BakeryDetailTabScreenProps<'BakeryDetailMenu'>> = ({ route, navigation }) => {
  const { bakeryId } = route.params;
  return <BakeryMenuListContainer bakeryId={30300001400004} />;
};

export { MenuList };
