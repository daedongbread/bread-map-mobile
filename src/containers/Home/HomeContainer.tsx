import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { Header } from '../../components/Home/Header';
import { SplitRow } from '../../components/Shared/SplitSpace';
import { Spacer } from '../../components/Shared/SplitSpace/Spacer';
import { CurationBannerContainer } from './CurationBannerContainer';
import { SearchContainer } from './SearchContainer';

type Navigation = HomeStackScreenProps<'Home'>['navigation'];

export const HomeContainer = () => {
  // const navigation = useNavigation<Navigation>();

  const onPressNotification = () => {
    console.log('navigate notification');
    // navigation.navigate('')
  };

  return (
    <SafeAreaView>
      <Header onPressRightButton={onPressNotification} />

      <SplitRow height={8} />

      <SearchContainer />

      <SplitRow height={16} />

      <CurationBannerContainer />

      {/* <CurationContainer /> */}

      {/* <MenuContainer /> */}

      <SplitRow height={20} />

      {/* <CommunityHotPostContainer /> */}
      <SplitRow height={30} />
      <Spacer height={12} />

      {/* <ReportBannerContainer /> */}

      {/* <NewBakeryContainer /> */}

      {/* <CustomerServiceBannerContainer /> */}
    </SafeAreaView>
  );
};
