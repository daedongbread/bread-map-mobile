import React from 'react';
import { HomeCommunityPartComponent } from '@/components/Home/HomeCommunityPart';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

type Navigation = MainStackScreenProps<'Community'>;

export const HomeCommunityPartContainer = () => {
  const navigation = useNavigation<Navigation['navigation']>();
  const onPressMore = () => {
    navigation.navigate('Community');
  };

  return <HomeCommunityPartComponent onPressMore={onPressMore} />;
};
