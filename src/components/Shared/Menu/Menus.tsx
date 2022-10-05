import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MenuItem } from '@/components/BakeryDetail/Menu/MenuList';
import { Bakery } from '@/types/bakery';
import { BakeryReview, resizePixels } from '@/utils';
import { Menu } from './Menu';
import { Button } from '../Button/Button';

interface MenuProps {
  headerComponent?: React.ReactElement;
  bakery: Bakery;
  onPress: (menu: MenuItem, reviews: BakeryReview[]) => void;
}

const Menus: React.FC<MenuProps> = ({ headerComponent, bakery, onPress }) => {
  // TODO: id로 가져올 수 있도록 변경 필요

  const { bakeryMenu, bakeryReviews } = bakery;
  const filteredReviews = (menuName: string) => {
    return bakeryReviews.filter(review => review.menuName === menuName);
  };

  return (
    <FlatList
      ListHeaderComponent={headerComponent}
      contentContainerStyle={styles.content}
      data={bakeryMenu}
      keyExtractor={menu => menu.name}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPress(item, filteredReviews(item.name))}>
          <Menu name={item.name} price={item.price} rating={item.rating} />
        </TouchableOpacity>
      )}
      ListFooterComponent={
        <Button size="large" appearance="terdary" style={{ marginHorizontal: 20, marginBottom: 32 }}>
          <Text style={styles.footerButtonText}>전체메뉴보기</Text>
        </Button>
      }
    />
  );
};

export { Menus };

// menus는 항상 링크를 달고있다?
// link는 선택적으로?

const styles = StyleSheet.create(
  resizePixels({
    content: {
      paddingHorizontal: 20,
    },
    footerButtonText: {
      fontSize: 14,
      fontWeight: '700',
    },
  })
);
