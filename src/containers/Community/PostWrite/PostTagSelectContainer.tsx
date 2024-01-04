import React from 'react';
import { PostTagSelectComponent } from '@/components/Community/PostWrite/PostTagSelectComponent';
import { PostWriteStackNavigationProps } from '@/pages/MainStack/Community/PostWriteStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

type Navigation = PostWriteStackNavigationProps<'PostTagSelect'>['navigation'];
type Route = PostWriteStackNavigationProps<'PostTagSelect'>['route'];

export const PostTagSelectContainer = () => {
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Route>();
  const { listToggleTopic } = params;

  const onPressSubmit = () => {
    // logic..

    goNavPostWrite();
  };

  const goNavPostWrite = () => {
    navigation.push('PostWrite', {
      listToggleTopic,
    });
  };

  return <PostTagSelectComponent onPressSubmit={onPressSubmit} />;
};
