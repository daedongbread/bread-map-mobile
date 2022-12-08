import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { ProfileContainer } from '@/containers/Profile';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../Stack';

const Profile = () => {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const onClickButton = () => {
    navigation.push('EditBakeryStack', {
      screen: 'EditBakery',
    });
  };
  return (
    <SafeAreaView>
      <Button title="임시 상세페이지 정보수정" onPress={onClickButton} />
      <ProfileContainer />
    </SafeAreaView>
  );
};

export { Profile };
