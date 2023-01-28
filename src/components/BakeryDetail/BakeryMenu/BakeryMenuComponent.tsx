import React from 'react';
import { View } from 'react-native';
import { BakeryMenuEntity, BakerySingleEntity } from '@/apis/bakery/types';
import { Menus } from '@/components/Shared/Menu';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

type Props = {
  bakeryId: number;
  bakery?: BakerySingleEntity;
  onPress: (menu: BakeryMenuEntity) => void;
};

export const BakeryMenuComponent = ({ bakeryId, bakery, onPress }: Props) => {
  return (
    <View>
      <Divider />

      {bakery && bakery.menu.length > 0 && (
        <Menus
          headerComponent={<TabHeader onPressAddBtn={() => {}} title={'메뉴'} totalCount={bakery?.menu.length || 0} />}
          bakery={bakery}
          bakeryId={bakeryId}
          onPress={onPress}
        />
      )}
    </View>
  );
};
