import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from '@/components/BakeryDetail/Divider';
import { HistoryItem } from '@/components/Search/HistoryItem';
import { theme } from '@/styles/theme';

export const SearchingComponent = ({ searchValue }) => {
  return (
    <View>
      <HistoryItem name={'소금빵'} onPress={() => {}} searchValue={searchValue} />
      <Divider style={styles.divider} />
      <HistoryItem name={'소금집'} onPress={() => {}} searchValue={searchValue} />
      <Divider style={styles.divider} />
      <HistoryItem name={'소라빵'} onPress={() => {}} searchValue={searchValue} />
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: theme.color.gray300,
  },
});
