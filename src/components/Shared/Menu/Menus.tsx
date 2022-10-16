import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BakeryMenuEntity, BakerySingleEntity } from '@/apis/bakery/types';
import { resizePixels } from '@/utils';
import { Button } from '../Button/Button';
import { Menu } from './Menu';

interface MenuProps {
  headerComponent?: React.ReactElement;
  bakery: BakerySingleEntity;
  onPress: (menu: BakeryMenuEntity) => void;
}

const Menus: React.FC<MenuProps> = ({ headerComponent, bakery, onPress }) => {
  const { menu } = bakery;

  return (
    <FlatList
      ListHeaderComponent={headerComponent}
      contentContainerStyle={styles.content}
      data={menu}
      keyExtractor={menu => menu.name}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPress(item)}>
          <Menu name={item.name} price={Number(item.price)} rating={item.rating} />
        </TouchableOpacity>
      )}
      ListFooterComponent={
        <Button size="large" appearance="terdary" style={{ marginHorizontal: 20, marginVertical: 24 }}>
          <Text style={styles.footerButtonText}>전체메뉴보기</Text>
        </Button>
      }
    />
  );
};

export { Menus };

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
