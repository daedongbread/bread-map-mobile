import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BreadCry } from '@/components/Shared/Icons/BreadCry';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

export const NoDataRow = () => {
  return (
    <View style={styles.container}>
      {/* <Image source={require('@/components/Shared/Images/nodata.png')} /> */}
      <BreadCry />
      <SplitRow height={16} />
      <Text style={styles.text} presets={['body2', 'bold']}>
        검색결과가 없어요
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 27,
  },
  text: {
    color: theme.color.gray500,
  },
});
