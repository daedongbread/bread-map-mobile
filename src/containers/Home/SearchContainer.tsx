import React from 'react';
import { SearchComponent } from '@/components/Home/SearchComponent';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useNavigation } from '@react-navigation/native';

type Navigation = HomeStackScreenProps<'Home'>['navigation'];

export const SearchContainer = () => {
  const navigation = useNavigation<Navigation>();

  const onPress = () => {
    navigation.navigate('');
  };

  return <SearchComponent onPress={onPress} />;
};
