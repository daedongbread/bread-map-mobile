import React from 'react';
import { View } from 'react-native';
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
    <View>
      <Divider />

      {menus && menus.length > 0 && (
        <Menus
          headerComponent={<TabHeader onPressAddBtn={() => {}} title={'메뉴'} totalCount={menus.length || 0} />}
          bakeryId={bakeryId}
          menus={menus}
          onPress={onPress}
        />
      )}
    </View>
  );
};
