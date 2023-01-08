import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AlertIcon } from '../Icons/AlertIcon';

type Props = {
  isValid: boolean;
};

export const ValidateErrorText: React.FC<Props> = ({ isValid, children }) => {
  return (
    <View style={styles.container}>
      {isValid ? (
        <Text style={styles.text}> </Text>
      ) : (
        <>
          <AlertIcon />
          <Text style={styles.text}>{children}</Text>
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
    paddingLeft: 4,
    fontSize: 12,
    fontWeight: '400',
  },
});
