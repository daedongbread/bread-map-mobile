import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MenuEntity } from '@/apis/menu/type';
import { Menu } from '@/components/Shared/Menu';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { resizePixels } from '@/utils';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';
import { MoreButton } from './MoreButton';

type Props = {
  briefMenu: MenuEntity[];
  totalCount: number;
  onPress: (menu: MenuEntity) => void;
  onPressMoreButton: () => void;
};

export const BakeryMenuBriefListComponent = ({ briefMenu, totalCount, onPress, onPressMoreButton }: Props) => {
  return (
    <>
      <Divider />
      <View style={styles.container}>
        <TabHeader onPressAddBtn={() => {}} title={'메뉴'} totalCount={totalCount} />
        {briefMenu.length > 0 &&
          briefMenu.map((menuData, idx) => (
            <TouchableOpacity key={idx} onPress={() => onPress(menuData)}>
              <Menu name={menuData.name} price={Number(menuData.price)} rating={menuData.rating} />
            </TouchableOpacity>
          ))}
      </View>

      <SplitRow height={24} />
      <MoreButton text="전체메뉴보기" onPress={onPressMoreButton} />
    </>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      backgroundColor: 'white',

      paddingHorizontal: 20,
    },
  })
);
