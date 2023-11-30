import React, { useCallback } from 'react';

import { FlatList, StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ReportBanner } from '@/components/Banners/ReportBanner';
import { BottomBanner } from '@/components/Home/HomeCommunityPart';
import { Search } from '@/components/Home/Search/Search';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { CurationContainer } from '@/containers/Home/CurationContainer';
import { HomeCommunityPartContainer } from '@/containers/Home/HomeCommunityPartContainer';
import { NewReportedBakeriesContainer } from '@/containers/Home/NewReportedBakeriesContainer';
import { WeekendBriefRankingContainer } from '@/containers/Home/WeekendBriefRankingContainer';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useNavigation } from '@react-navigation/native';

export const Home: React.FC = () => {
  const { navigate } = useNavigation<HomeStackScreenProps<'Home'>['navigation']>();
  const onPressSearch = useCallback(() => {
    navigate('SearchStack', {
      screen: 'Search',
    });
  }, [navigate]);

  return (
    <FlatList
      data={['']}
      renderItem={() => {
        return (
          <>
            <SafeAreaView style={styles.flex} edges={['top']}>
              <Search onPress={onPressSearch} />

              <CurationContainer />
              <SplitRow height={28} />

              <View style={styles.layout}>
                <WeekendBriefRankingContainer />

                <View style={styles.gap} />
                <ReportBanner />

                <View style={styles.gap} />
                <NewReportedBakeriesContainer />

                <View style={styles.gap} />
                <HomeCommunityPartContainer />
              </View>
            </SafeAreaView>

            <BottomBanner />
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  layout: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  gap: {
    marginBottom: 40,
  },
});
