import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { resizePixels } from '@/utils';

import { Text } from '@shared/Text';

type Props = {
  name: string;
};

export const Header: React.FC<Props> = memo(({ name }) => {
  return (
    <View style={styles.container}>
      <Text presets={['number1', 'medium']}>{name}</Text>
    </View>
  );
});

const styles = StyleSheet.create(
  resizePixels({
    container: {
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
  })
);
