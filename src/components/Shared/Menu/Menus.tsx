import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MenuEntity } from '@/apis/menu/type';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { MainStackParamList, MainStackScreenProps } from '@/pages/MainStack/Stack';
import { resizePixels } from '@/utils';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { Button } from '../Button/Button';
import { PlusIcon } from '../Icons';
import { Menu } from './Menu';

interface MenuProps {
  headerComponent?: React.ReactElement;
  bakeryId: number;
  menus: MenuEntity[];
  onPress: (menu: MenuEntity) => void;
}

type Navigation = CompositeScreenProps<
  BakeryDetailTabScreenProps<'BakeryDetailMenu'>,
  MainStackScreenProps<keyof MainStackParamList>
>['navigation'];

const Menus: React.FC<MenuProps> = ({ headerComponent, bakeryId, menus, onPress }) => {
  const navigate = useNavigation<Navigation>();

  const onPressAddButton = () => {
    navigate.navigate('ReportMenu', {
      bakeryId,
    });
  };

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
      ListFooterComponent={
        <Button size="large" appearance="terdary" style={styles.footerButton} onPress={onPressAddButton}>
          <PlusIcon color={'#BDBDBD'} style={styles.footerIcon} />
          <Text style={styles.footerButtonText}>빵 메뉴 제보하기</Text>
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
    footerButton: {
      marginVertical: 24,
    },
    footerIcon: {
      marginRight: 8,
    },
    footerButtonText: {
      fontSize: 14,
      fontWeight: '700',
    },
  })
);
