import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AlertIcon } from '../Icons/AlertIcon';
import { SplitColumn } from '../SplitSpace';
import { Text } from './Text';

type Props = {
  isValid: boolean;
};

export const ValidateErrorText: React.FC<Props> = ({ isValid, children }) => {
  return (
    <View style={styles.container}>
      {isValid ? (
        <Text />
      ) : (
        <>
          <AlertIcon />
          <SplitColumn width={2} />
          <Text presets={['caption2', 'medium']} style={styles.text}>
            {children}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#F3213B',
  },
});
