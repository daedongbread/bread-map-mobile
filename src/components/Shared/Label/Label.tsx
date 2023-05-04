import React, { memo } from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import { Text } from '@shared/Text';

type Props = {
  isRequire?: boolean;
  defaultContainerStyleEnabeld?: boolean;
  style?: StyleProp<any>;
};

export const Label: React.FC<Props> = memo(
  ({ isRequire = false, defaultContainerStyleEnabeld = true, children, style }) => {
    const containerStyle = [styles.row, defaultContainerStyleEnabeld ? styles.container : null];
    const textStyle = style ? style : styles.text;

    return (
      <View style={containerStyle}>
        <Text style={textStyle} presets={['body1', 'bold']}>
          {children}
        </Text>
        {isRequire ? <View style={styles.require} /> : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    marginBottom: 12,
  },
  require: {
    marginLeft: 2,
    width: 4,
    height: 4,
    backgroundColor: '#FF6E40',
    borderRadius: 4,
  },
  text: {
    color: '#424242',
  },
});
