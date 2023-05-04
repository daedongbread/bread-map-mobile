import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { theme } from '@/styles/theme';

const Divider: React.FC<Pick<ViewProps, 'style'>> = ({ style }) => {
  return <View style={[styles.container, style]} />;
};

const styles = StyleSheet.create({
  container: {
    height: 9,
    backgroundColor: theme.color.gray100,
  },
});

export { Divider };
