import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

export const Title = () => {
  return (
    <View style={styles.container}>
      <Text color={theme.color.gray900} presets={['heading2', 'bold']}>
        이제<Text color={theme.color.primary600}> 빵집</Text>과{'\n'}
        <Text color={theme.color.primary600}>먹은 빵</Text>에 대해 이야기해주세요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  titleText: {
    color: '#000000',
  },
  titleStressText: {
    color: theme.color.primary500,
  },
});
