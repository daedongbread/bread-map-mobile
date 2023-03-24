import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MenuEntity } from '@/apis/menu/type';
import { resizePixels } from '@/utils';
import { Menu } from './Menu';
import { ReportMenuButton } from './ReportMenuButton';

interface MenuProps {
  headerComponent?: React.ReactElement;
  menus: MenuEntity[];
  onPress: (menu: MenuEntity) => void;
  onPressAddButton: () => void;
}

const Menus: React.FC<MenuProps> = ({ headerComponent, menus, onPress, onPressAddButton }) => {
  return (
    <FlatList
      ListHeaderComponent={headerComponent}
      contentContainerStyle={styles.content}
      data={menus}
      keyExtractor={menu => menu.name}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPress(item)}>
          <Menu name={item.name} price={Number(item.price)} rating={item.rating} />
        </TouchableOpacity>
      )}
      ListFooterComponent={<ReportMenuButton onPress={onPressAddButton} />}
    />
  );
};

export { Menus };

const styles = StyleSheet.create(
  resizePixels({
    content: {
      paddingHorizontal: 20,
    },
  })
);
