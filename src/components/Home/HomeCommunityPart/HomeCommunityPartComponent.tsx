import React from 'react';
import { View } from 'react-native';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Post } from '../../Community/Post';
import { Header } from '../Header';

type Props = {
  onPressMore: () => void;
};

export const HomeCommunityPartComponent = ({ onPressMore }: Props) => {
  return (
    <View>
      <View>
        <Header title="커뮤니티 핫한 글" onPressMore={onPressMore} />

        <Post isFirst={true} />
        <Post isFirst={false} />
        <Post isFirst={false} />
      </View>

      <SplitRow height={20} />
    </View>
  );
};
