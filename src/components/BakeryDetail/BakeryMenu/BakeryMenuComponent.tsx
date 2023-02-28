import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MenuEntity } from '@/apis/menu/type';
import { Menus } from '@/components/Shared/Menu';
import { ReportMenuButton } from '@/components/Shared/Menu/ReportMenuButton';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { MainStackParamList, MainStackScreenProps } from '@/pages/MainStack/Stack';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { Divider } from '../Divider';
import { NoData } from '../NoData';
import { TabHeader } from '../TabHeader';

type Props = {
  bakeryId: number;
  menus: MenuEntity[];
  onPress: (menu: MenuEntity) => void;
};

type Navigation = CompositeScreenProps<
  BakeryDetailTabScreenProps<'BakeryDetailMenu'>,
  MainStackScreenProps<keyof MainStackParamList>
>['navigation'];

export const BakeryMenuComponent = ({ bakeryId, menus, onPress }: Props) => {
  const navigate = useNavigation<Navigation>();

  const onPressAddButton = () => {
    navigate.navigate('ReportMenu', {
      bakeryId,
    });
  };

  return (
    <View style={styles.container}>
      <Divider />

      <View style={styles.padding}>
        <TabHeader onPressAddBtn={() => {}} title={'메뉴'} totalCount={menus.length} />
      </View>

      {menus && menus.length > 0 ? (
        <Menus menus={menus} onPress={onPress} />
      ) : (
        <View style={styles.noDataContainer}>
          <NoData title="메뉴가 없어요" subTitle="메뉴를 제보해주세요." />
          <View style={styles.padding}>
            <ReportMenuButton onPress={onPressAddButton} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 20,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
