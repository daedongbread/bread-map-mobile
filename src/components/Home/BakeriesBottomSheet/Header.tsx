import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TabItem } from '@/containers/Home/BakeryBottomSheetContainer';

import { resizePixel } from '@/utils';

import { TabIcon } from './TabIcon';

type Props = {
  activeTab: TabItem;
  onPress: (tab: 'distance' | 'popularity') => void;
};

export const Header: React.FC<Props> = memo(({ activeTab, onPress }) => {
  const tabItems = [
    { value: 'distance' as const, label: '거리순' },
    { value: 'popularity' as const, label: '인기순' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 주변 빵집</Text>
      <View style={styles.iconsContainer}>
        {tabItems.map(({ value, label }) => (
          <TabIcon key={value} value={value} activeTab={activeTab} onPress={onPress}>
            {label}
          </TabIcon>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  title: {
    flex: 1,
    fontSize: resizePixel(18),
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
});