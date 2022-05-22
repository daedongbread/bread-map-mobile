import React from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MenuItem } from '@/components/BakeryDetail/Menu/MenuList';
import { Bakery } from '@/router/types';
import { BakeryReview } from '@/utils';
import { Menu } from './Menu';

interface MenuProps {
  bakery: Bakery;
  onPress: (menu: MenuItem, reviews: BakeryReview[]) => void;
}

const Menus: React.FC<MenuProps> = ({ bakery, onPress }) => {
  // TODO: id로 가져올 수 있도록 변경 필요

  const { bakeryMenu, bakeryReviews, bakeryInfo } = bakery;
  const filteredReviews = (menuName: string) => {
    return bakeryReviews.filter(review => review.menuName === menuName);
  };

  return (
    <FlatList
      data={bakeryMenu}
      keyExtractor={menu => menu.name}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPress(item, filteredReviews(item.name))}>
          <Menu name={item.name} price={item.price} rating={item.rating} />
        </TouchableOpacity>
      )}
    />
  );
};

export { Menus };

// menus는 항상 링크를 달고있다?
// link는 선택적으로?
