import React, { useCallback } from 'react';
import { HomeCommunityPartComponent } from '@/components/Home/HomeCommunityPart';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

type Navigation = MainStackScreenProps<'CommunityStack'>;

export const HomeCommunityPartContainer = () => {
  const navigation = useNavigation<Navigation['navigation']>();

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

  const onPressMore = useCallback(() => {
    navigation.navigate('CommunityStack', {
      screen: 'Community',
    });
  }, [navigation]);

  return <HomeCommunityPartComponent onPressPost={onPressPost} onPressMore={onPressMore} />;
};
