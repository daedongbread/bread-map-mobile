import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

const FollowInfo = () => {
  return (
    <View style={styles.followWrapper}>
      <Text style={styles.followText}>팔로잉</Text>
      <Text style={styles.count}>0</Text>

      <View style={styles.divider} />

      <Text style={styles.followText}>팔로워</Text>
      <Text style={styles.count}>100</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  followWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followText: {
    fontSize: 12,
    lineHeight: 12,
    color: theme.color.gray500,
    marginRight: 2,
    fontWeight: '400',
  },
  count: {
    fontSize: 12,
    color: theme.color.gray700,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 8,
    backgroundColor: theme.color.gray300,
    marginHorizontal: 8,
  },
});

export { FollowInfo };
