import React, { memo } from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import { Text } from '@shared/Text';

type Props = {
  isRequire?: boolean;
  style?: StyleProp<any>;
};

export const Label: React.FC<Props> = memo(({ isRequire = false, children, style }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text} presets={['body1', 'bold']}>
        {children}
      </Text>
      {isRequire ? <View style={styles.require} /> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
  },
  require: {
    marginLeft: 2,
    width: 4,
    height: 4,
    backgroundColor: '#FF6E40',
    borderRadius: 4,
  },
  Text: {
    color: '#424242',
  },
});
