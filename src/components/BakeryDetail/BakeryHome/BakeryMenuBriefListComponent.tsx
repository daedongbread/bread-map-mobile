import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MenuEntity } from '@/apis/menu/type';
import { Menu } from '@/components/Shared/Menu';
import { ReportMenuButton } from '@/components/Shared/Menu/ReportMenuButton';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { resizePixels } from '@/utils';
import { Divider } from '../Divider';
import { NoData } from '../NoData';
import { TabHeader } from '../TabHeader';
import { MoreButton } from './MoreButton';

type Props = {
  briefMenu: MenuEntity[];
  totalCount: number;
  onPress: (menu: MenuEntity) => void;
  onPressMoreButton: () => void;
  onPressReportButton: () => void;
};

export const BakeryMenuBriefListComponent = ({
  briefMenu,
  totalCount,
  onPress,
  onPressMoreButton,
  onPressReportButton,
}: Props) => {
  return (
    <>
      <Divider />
      <View style={styles.container}>
        <TabHeader onPressAddBtn={() => {}} title={'메뉴'} totalCount={totalCount} />
        {briefMenu.length > 0 ? (
          briefMenu.map((menuData, idx) => (
            <TouchableOpacity key={idx} onPress={() => onPress(menuData)}>
              <Menu name={menuData.name} price={Number(menuData.price)} rating={menuData.rating} />
            </TouchableOpacity>
          ))
        ) : (
          <>
            <SplitRow height={44} />
            <NoData title="메뉴가 없어요" subTitle="메뉴를 제보해주세요." />
          </>
        )}
      </View>

      <SplitRow height={24} />

      {briefMenu.length > 0 ? (
        <MoreButton text="전체메뉴보기" onPress={onPressMoreButton} />
      ) : (
        <View style={styles.padding}>
          <ReportMenuButton onPress={onPressReportButton} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      backgroundColor: 'white',

      paddingHorizontal: 20,
    },
    padding: {
      paddingHorizontal: 20,
    },
  })
);
