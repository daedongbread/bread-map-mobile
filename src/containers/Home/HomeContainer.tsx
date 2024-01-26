import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommunityLoading } from '@/components/Shared/Loading';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useNavigation } from '@react-navigation/native';
import { SplitRow } from '../../components/Shared/SplitSpace';

type Navigation = HomeStackScreenProps<'Home'>['navigation'];

export const HomeContainer = () => {
  const navigation = useNavigation<Navigation>();
  const { top } = useSafeAreaInsets();

  const onPressNotification = () => {
    navigation.navigate('Notification');
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
              {/* <Header onPressRightButton={onPressNotification} />

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

              <SplitRow height={40} /> */}
            </>
          )}
        />
      )}
    </>
  );
};
