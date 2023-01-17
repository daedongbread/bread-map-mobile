import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { ProfileContainer } from '@/containers/Profile';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { MainStackScreenProps } from '../Stack';

const Profile = () => {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const NavigationKey = useNavigationState(state => state);
  const onClickButton = () => {
    navigation.push('EditBakeryStack', {
      screen: 'EditBakery',
      params: {
        bakeryId: 30000000000003,
        NavigationKey: NavigationKey.routes[0].key,
      },
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="임시 상세페이지 정보수정" onPress={onClickButton} />
      <ProfileContainer />
    </SafeAreaView>
  );
};

export { Profile };
