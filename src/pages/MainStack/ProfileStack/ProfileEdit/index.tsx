import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const ProfileEdit = () => {
  return (
    <SafeAreaView>
      <View style={styles.layout}>
        <View />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
});

export { ProfileEdit };
