import { StyleSheet, View } from 'react-native';
import { Notification } from '@shared/Icons';
import React from 'react';

const PlainHeader = () => {
  return (
    <View style={styles.header}>
      <Notification />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 52,
  },
});

export { PlainHeader };
