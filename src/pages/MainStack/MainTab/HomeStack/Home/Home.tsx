import React from 'react';

import { StyleSheet, View } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeCommunityPartContainer } from '@/containers/Home/HomeCommunityPartContainer';
import { WeekendBriefRankingContainer } from '@/containers/Home/WeekendBriefRankingContainer';

export const Home: React.FC = () => (
  <ScrollView style={styles.flex}>
    <SafeAreaView style={[styles.flex, styles.layout]} edges={['top']}>
      <WeekendBriefRankingContainer />
      {/* 랭킹팀 파트 */}
      <View style={styles.gap} />
      {/* 커뮤니티 팀 파트 */}
      <HomeCommunityPartContainer />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  layout: {
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  gap: {
    marginBottom: 40,
  },
});
