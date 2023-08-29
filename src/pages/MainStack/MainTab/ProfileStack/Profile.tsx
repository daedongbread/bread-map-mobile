import React from 'react';
import { SafeAreaView } from 'react-native';
import { ProfileContainer } from '@/containers/Profile';

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileContainer />
    </SafeAreaView>
  );
};

export { Profile };
