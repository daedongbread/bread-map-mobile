import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/Shared/Text';

type Props = {};

export const PostDetailComponent = ({}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>sss</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});
