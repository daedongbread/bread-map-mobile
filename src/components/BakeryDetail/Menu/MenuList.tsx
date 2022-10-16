import React from 'react';
import { BakeryMenuListContainer } from '@/containers/BakeryDetail/BakeryMenuListContainer';
import { BakeryMenuStackNavigationProps } from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';

export type MenuItem = {
  name: string;
  price: number;
  rating: number;
};

// 다른부분들도 헤더탭부분 렌더링 변경하기
const MenuList: React.FC<BakeryMenuStackNavigationProps<'BakeryMenus'>> = ({ route }) => {
  const bakeryId = route.params.bakeryId;

  return <BakeryMenuListContainer bakeryId={bakeryId} />;
};

export { MenuList };
