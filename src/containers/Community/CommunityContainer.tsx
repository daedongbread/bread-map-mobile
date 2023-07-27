import React, { useCallback, useState } from 'react';
import { CommunityComponent } from '@/components/Community';
import { CommunityStackScreenProps } from '@/pages/MainStack/Community/Stack';
import { useNavigation } from '@react-navigation/native';

type Navigation = CommunityStackScreenProps<'Community'>['navigation'];

export type ToggleMenu = {
  title: string;
  topic: string;
};

const menus: ToggleMenu[] = [
  {
    title: '전체',
    topic: 'all',
  },
  {
    title: '빵이야기',
    topic: 'b',
  },
  {
    title: '리뷰',
    topic: 'c',
  },
  {
    title: '이벤트',
    topic: 'd',
  },
  {
    title: '빵터지는 이야기',
    topic: 'e',
  },
];

export const CommunityContainer = () => {
  const navigation = useNavigation<Navigation>();

  const [topic, setTopic] = useState('all');

  const onPressPrev = () => {
    navigation.goBack();
  };

  const onPressWrite = () => {
    navigation.navigate('PostWrite');
  };

  const onPressToggle = (_topic: string) => {
    setTopic(_topic);
  };

  const onPressPost = useCallback(
    (type: number) => {
      navigation.navigate('CommunityStack', {
        screen: 'PostDetail',
        params: {
          type,
        },
      });
    },
    [navigation]
  );

  return (
    <CommunityComponent
      menus={menus}
      topic={topic}
      onPressPrev={onPressPrev}
      onPressWrite={onPressWrite}
      onPressToggle={onPressToggle}
      onPressPost={onPressPost}
    />
  );
};
