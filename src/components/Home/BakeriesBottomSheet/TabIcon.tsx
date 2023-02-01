import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { TabItem } from '@/containers/Home';

import { theme } from '@/styles/theme';

import { Text } from '@shared/Text';

type TabIconProps = {
  value: TabItem;
  activeTab: TabItem;
  onPress: (item: TabItem) => void;
};

export const TabIcon: React.FC<TabIconProps> = ({ value, activeTab, onPress, children }) => {
  const isActive = activeTab === value;

  const handlePress = () => onPress(value);

  if (isActive) {
    return (
      <TouchableOpacity style={styles.iconWrapper} onPress={handlePress}>
        <View style={[styles.activeTab, styles.icon]} />
        <Text presets={['caption1', 'medium']} style={styles.activeText}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.iconWrapper} onPress={handlePress}>
      <View style={[styles.inactiveTab, styles.icon]} />
      <Text presets={['caption1', 'medium']} style={[styles.inactiveText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  icon: {
    width: 4,
    height: 4,
    borderRadius: 4,
    marginRight: 4,
  },
  activeTab: {
    backgroundColor: theme.color.primary500,
  },
  inactiveTab: {
    backgroundColor: theme.color.gray400,
  },
  activeText: {
    color: theme.color.gray900,
  },
  inactiveText: {
    color: theme.color.gray400,
  },
});
