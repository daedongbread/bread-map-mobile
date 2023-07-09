import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { TabItem } from '@/containers/Map';
import { Text } from '@shared/Text';
import { TabIcon } from './TabIcon';

type Props = {
  activeTab: TabItem;
  onPress: (tab: 'distance' | 'popular') => void;
};

export const Header: React.FC<Props> = memo(({ activeTab, onPress }) => {
  const tabItems = [
    { value: 'distance', label: '거리순' },
    { value: 'popular', label: '인기순' },
  ] as const;

  return (
    <View style={styles.container}>
      <Text presets={['subhead', 'bold']} style={styles.title}>
        내 주변 빵집
      </Text>
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
    color: 'black',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
});
