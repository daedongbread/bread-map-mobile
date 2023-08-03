import React from 'react';

import { StyleSheet, View } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReportBanner } from '@/components/Banners/ReportBanner';
import { BottomBanner } from '@/components/Home/HomeCommunityPart';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { CurationContainer } from '@/containers/Home/CurationContainer';
import { HomeCommunityPartContainer } from '@/containers/Home/HomeCommunityPartContainer';
import { NewReportedBakeriesContainer } from '@/containers/Home/NewReportedBakeriesContainer';
import { WeekendBriefRankingContainer } from '@/containers/Home/WeekendBriefRankingContainer';

export const Home: React.FC = () => (
  <ScrollView style={styles.flex}>
    <SafeAreaView style={styles.flex} edges={['top']}>
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
  </ScrollView>
);

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
