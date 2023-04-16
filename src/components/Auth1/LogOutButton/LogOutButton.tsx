import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { bindHook } from '@/utils';
import { useLogOutButton } from './useLogOutButton';

const LogOutButton = bindHook(useLogOutButton, ({ logOut }) => (
  <View style={styles.container}>
    <Button title="로그아웃" onPress={logOut} />
  </View>
));

export { LogOutButton };

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
