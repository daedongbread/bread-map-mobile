import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { ProfileInfo } from '@/components/Profile/ProfileInfo';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';

interface ProfileProps {
  navigation: MainStackScreenProps<'Profile'>;
}

const Profile = ({ navigation }: ProfileProps) => {
  // bottom tab에서 프로필 페이지에 접근한 경우, navigation 객체에 jumpTo property가 존재하므로 jumpTo로 backButton을 보여줄 것인지 트리거
  // @ts-ignore
  const isTabNavigated = navigation.jumpTo === undefined;

  return (
    <SafeAreaView>
      <View style={styles.layout}>
        <ProfileHeader showBackButton={isTabNavigated} />

        <ProfileInfo isTabNavigated={isTabNavigated} />
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
