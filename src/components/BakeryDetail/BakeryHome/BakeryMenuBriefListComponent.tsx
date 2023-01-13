import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BakeryMenuEntity, BakerySingleEntity } from '@/apis/bakery/types';
import { Button } from '@/components/Shared/Button/Button';
import { Menu } from '@/components/Shared/Menu';
import { Text } from '@/components/Shared/Text';
import { resizePixels } from '@/utils';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

type Props = {
  bakery: BakerySingleEntity;
  briefMenu: BakerySingleEntity['menu'];
  onPress: (menu: BakeryMenuEntity) => void;
  onPressMoreButton: () => void;
};

export const BakeryMenuBriefListComponent = ({ bakery, briefMenu, onPress, onPressMoreButton }: Props) => {
  return (
    <>
      <Divider />
      <View style={styles.container}>
        <TabHeader onPressAddBtn={() => {}} title={'메뉴'} totalCount={bakery?.menu.length || 0} />
        {bakery &&
          bakery.menu.length > 0 &&
          briefMenu.map((menuData, idx) => (
            <TouchableOpacity key={idx} onPress={() => onPress(menuData)}>
              <Menu name={menuData.name} price={Number(menuData.price)} rating={menuData.rating} />
            </TouchableOpacity>
          ))}
      </View>
      <Button
        onPress={onPressMoreButton}
        size="large"
        appearance="terdary"
        style={{ marginHorizontal: 20, marginVertical: 24 }}
      >
        <Text style={styles.footerButtonText}>전체메뉴보기</Text>
      </Button>
    </>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      backgroundColor: 'white',

      paddingHorizontal: 20,
    },
    footerButtonText: {
      fontSize: 14,
      fontWeight: '700',
    },
  })
);
