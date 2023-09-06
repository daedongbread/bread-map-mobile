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
      <Text color="#424242" presets={['body2', 'semibold']}>
        {name}
      </Text>
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
