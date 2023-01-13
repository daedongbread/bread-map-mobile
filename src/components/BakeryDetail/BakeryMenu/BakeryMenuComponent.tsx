import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={styles.container}>
      <Divider />

      {bakery && bakery.menu.length > 0 && (
        <Menus
          headerComponent={<TabHeader onPressAddBtn={() => {}} title={'메뉴'} totalCount={bakery?.menu.length || 0} />}
          bakery={bakery}
          bakeryId={bakeryId}
          onPress={onPress}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
