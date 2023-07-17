import React from 'react';
import { HomeCommunityPartComponent } from '@/components/Home/HomeCommunityPart';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useNavigation } from '@react-navigation/native';

type Navigation = HomeStackScreenProps<'Home'>;

export const HomeCommunityPartContainer = () => {
  const navigation = useNavigation<Navigation['navigation']>();
  const onPressMore = () => {
    navigation.navigate('Community');
  };

  return <HomeCommunityPartComponent onPressMore={onPressMore} />;
};
