import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MenuEntity } from '@/apis/menu/type';
import { Menus } from '@/components/Shared/Menu';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

type Props = {
  bakeryId: number;
  menus: MenuEntity[];
  onPress: (menu: MenuEntity) => void;
};

export const BakeryMenuComponent = ({ bakeryId, menus, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Divider />

      <View style={styles.header}>
        <TabHeader onPressAddBtn={() => {}} title={'메뉴'} totalCount={menus.length} />
      </View>

      {menus && menus.length > 0 && <Menus bakeryId={bakeryId} menus={menus} onPress={onPress} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
  },
});
