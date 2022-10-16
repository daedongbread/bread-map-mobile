import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useGetBakery } from '@/apis/bakery';
import { BakeryMenuEntity } from '@/apis/bakery/types';
import { Divider } from '@/components/BakeryDetail/Divider';
import { TabHeader } from '@/components/BakeryDetail/TabHeader';

import { Menus } from '@shared/Menu';

type Props = {
  bakeryId: number;
};

export const BakeryMenuListContainer = ({ bakeryId }: Props) => {
  const { bakery } = useGetBakery({ bakeryId });

  const onPress = (_menu: BakeryMenuEntity) => {
    if (!bakery) {
      return;
    }

    // navigation.push('BakeryMenuReviews', {
    //   info: bakery.info,
    //   menu,
    //   reviews,
    // });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Divider />

      {bakery && bakery.menu.length > 0 && (
        <Menus
          headerComponent={<TabHeader onPressAddBtn={() => {}} title={'메뉴'} totalCount={bakery?.menu.length || 0} />}
          bakery={bakery}
          onPress={onPress}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 32,
  },
});
