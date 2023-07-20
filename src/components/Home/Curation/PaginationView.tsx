import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Shared/Text';

type Props = {
  activeIndex: number;
  totalPageSize: number;
};

export const PaginationView: React.FC<Props> = ({ activeIndex, totalPageSize }) => {
  return (
    <View style={styles.container}>
      <Text presets={['caption2']} color="white">
        {`${activeIndex + 1} / ${totalPageSize}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 26,
    backgroundColor: 'rgba(34, 34, 34, 0.3)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
