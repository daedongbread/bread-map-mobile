import React from 'react';
import { Text } from '@/components/Shared/Text';
import { RootRouteProps } from '@/pages/MainStack/SearchStack/Stack';
import { useRoute } from '@react-navigation/native';

export const SearchCompleteContainer = () => {
  const route = useRoute<RootRouteProps<'SearchComplete'>>();

  console.log('route.params.keyword', route.params.keyword);
  console.log('route.params.keyword', route.params.longitude);
  console.log('route.params.keyword', route.params.latitude);
  return <Text>SearchCompleteContainer</Text>;

  //   return <SearchBakeryList />;
};
