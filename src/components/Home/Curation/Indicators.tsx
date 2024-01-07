import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { theme } from '@/styles/theme';

type Props = {
  totalIndex: number;
  currentIndex: number;
};

export const Indicators = ({ currentIndex, totalIndex }: Props) => {
  const array = Array.from({ length: totalIndex }, (v, i) => i + 1);

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      keyExtractor={item => item.toString()}
      data={array}
      renderItem={({ item }) => (
        <View style={[styles.indicator, currentIndex === item - 1 && styles.activeIndicator]} />
      )}
      ItemSeparatorComponent={() => <SplitColumn width={4} />}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: theme.color.gray200,
  },
  activeIndicator: {
    backgroundColor: theme.color.primary600,
  },
});
