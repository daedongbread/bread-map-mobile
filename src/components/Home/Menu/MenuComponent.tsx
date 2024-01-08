import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { HomeMenu } from '@/containers/Home/MenuContainer';
import { Menu } from './Menu';

type Props = {
  menuList: HomeMenu[];
};

export const MenuComponent = ({ menuList }: Props) => (
  <FlatList
    keyExtractor={item => item.title}
    contentContainerStyle={styles.contentContainer}
    columnWrapperStyle={styles.columnWrapperStyle}
    data={menuList}
    renderItem={({ item }) => (
      <Pressable onPress={item.onPress}>
        <Menu menu={item} />
      </Pressable>
    )}
    ItemSeparatorComponent={() => <SplitRow height={16} />}
    numColumns={4}
  />
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 35,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
});
