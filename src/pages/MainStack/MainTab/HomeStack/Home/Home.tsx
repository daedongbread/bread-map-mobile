import React from 'react';

import { FlatList, StyleSheet } from 'react-native';

export const Home: React.FC = () => (
  <FlatList
    data={['']}
    renderItem={() => {
      return (
        <>
          {/* <SafeAreaView style={styles.flex} edges={['top']}>
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

          <BottomBanner /> */}
        </>
      );
    }}
  />
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
