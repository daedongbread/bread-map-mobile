import React from 'react';

import { StyleSheet } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RankingBakeryOfTheWeekContainer } from '@/containers/RankingBakeryOfTheWeek/RankingBakeryOfTheWeekContainer';
import { Header } from '@shared/Header';

export const RankingBakeryOfTheWeek: React.FC = () => (
  <SafeAreaView style={[styles.flex]} edges={['top']}>
    <ScrollView style={styles.flex}>
      <Header title={'이번주 인기 빵집'} isPrevButtonShown />
      <RankingBakeryOfTheWeekContainer />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  layout: {
    paddingHorizontal: 20,
  },
  gap: {
    marginBottom: 40,
  },
});
