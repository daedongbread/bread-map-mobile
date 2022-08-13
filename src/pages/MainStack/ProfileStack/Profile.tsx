import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { Text } from '@shared/Text';

const Profile = () => {
  return (
    <SafeAreaView>
      <View style={styles.layout}>
        <ProfileHeader />
        <Text>Profile</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 20,
  },
});

export { Profile };
