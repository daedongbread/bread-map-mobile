import React from 'react';
import { useGetMenus } from '@/apis/menu';
import { MenuEntity } from '@/apis/menu/type';
import { BakeryMenuBriefListComponent } from '@/components/BakeryDetail/BakeryHome';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { HomeStackParamList, HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { MainStackParamList, MainStackScreenProps } from '@/pages/MainStack/Stack';
import { CompositeScreenProps, useNavigation, useRoute } from '@react-navigation/native';

type Navigation = CompositeScreenProps<
  BakeryDetailTabScreenProps<'BakeryDetailHome'>,
  CompositeScreenProps<HomeStackScreenProps<keyof HomeStackParamList>, MainStackScreenProps<keyof MainStackParamList>>
>['navigation'];

export const BakeryMenuBriefListContainer = () => {
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailHome'>['route']>();
  const navigation = useNavigation<Navigation>();

  const bakeryId = route.params.bakeryId;
  const { menus = [] } = useGetMenus({ bakeryId });

  const onPress = (menu: MenuEntity) => {
    if (!menu) {
      return;
    }
    navigation.push('BakeryMenuDetail', {
      bakeryId,
      menu,
    });
  };

  const onPressMoreButton = () => {
    //TODO  navigation 타입 정리 필요함
    (navigation as any).jumpTo('BakeryDetailMenu', { bakeryId });
  };

  const onPressReportButton = () => {
    navigation.navigate('ReportMenu', {
      bakeryId,
    });
  };

  if (!menus) {
    return <></>;
  }

  const briefMenu = menus.slice(0, 3);

  return (
    <BakeryMenuBriefListComponent
      briefMenu={briefMenu}
      totalCount={menus.length}
      onPress={onPress}
      onPressMoreButton={onPressMoreButton}
      onPressReportButton={onPressReportButton}
    />
  );
};
