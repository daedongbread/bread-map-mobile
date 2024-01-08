import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomerServiceBanner, ReportBanner } from '@/components/Home';
import { CommunityLoading } from '@/components/Shared/Loading';
import { Header } from '../../components/Home/Header';
import { SplitRow } from '../../components/Shared/SplitSpace';
import { Spacer } from '../../components/Shared/SplitSpace/Spacer';
import { CommunityHotPostContainer } from './CommunityHotPostContainer';
import { CurationBannerContainer } from './CurationBannerContainer';
import { MenuContainer } from './MenuContainer';
import { NewBakeryContainer } from './NewBakeryContainer';
import { SearchContainer } from './SearchContainer';

// type Navigation = HomeStackScreenProps<'Home'>['navigation'];

export const HomeContainer = () => {
  // const navigation = useNavigation<Navigation>();
  const { top } = useSafeAreaInsets();

  const onPressNotification = () => {
    // navigation.navigate('')
  };

  return (
    <>
      {false ? (
        <CommunityLoading />
      ) : (
        <FlatList
          listKey="HomeRootFlatList"
          data={['']}
          ListHeaderComponent={<SplitRow height={top} />}
          renderItem={() => (
            <>
              <Header onPressRightButton={onPressNotification} />

              <SplitRow height={8} />

              <SearchContainer />

              <SplitRow height={16} />
              <CurationBannerContainer />

              <SplitRow height={20} />

              <MenuContainer />

              <SplitRow height={30} />
              <Spacer height={12} />
              <SplitRow height={30} />

              <CommunityHotPostContainer />

              <SplitRow height={40} />
              <ReportBanner />

              <SplitRow height={30} />

              <NewBakeryContainer />
              <SplitRow height={40} />

              <CustomerServiceBanner />

              <SplitRow height={40} />
            </>
          )}
        />
      )}
    </>
  );
};
