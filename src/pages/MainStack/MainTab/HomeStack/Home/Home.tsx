import React from 'react';

import { StyleSheet, View } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CurationContainer } from '@/containers/Home/CurationContainer';
import { HomeCommunityPartContainer } from '@/containers/Home/HomeCommunityPartContainer';

export const Home: React.FC = () => (
  <ScrollView style={styles.flex}>
    <SafeAreaView style={styles.flex} edges={['top']}>
      {/* 큐레이션 */}
      <CurationContainer />
      {/* 랭킹팀 파트 */}
      <View />
      {/* 커뮤니티 팀 파트 */}
      <HomeCommunityPartContainer />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
