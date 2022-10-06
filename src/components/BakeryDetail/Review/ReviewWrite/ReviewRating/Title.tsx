import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

export const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        <Text style={styles.titleStressText}>어떤 빵</Text>을{'\n'}먹었나요?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingLeft: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
  },
  titleStressText: {
    fontSize: 24,
    color: theme.color.primary500,
  },
});
