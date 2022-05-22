import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';

const Divider: React.FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 9,
    backgroundColor: theme.color.gray100,
  },
});

export { Divider };
