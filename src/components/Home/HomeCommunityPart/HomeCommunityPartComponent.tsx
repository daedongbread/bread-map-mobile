import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Post } from '../../Community/Post';
import { Header } from '../Header';
import { BottomBanner } from './BottomBanner';

type Props = {
  onPressPost: () => void;
  onPressMore: () => void;
};

export const HomeCommunityPartComponent = ({ onPressPost, onPressMore }: Props) => {
  return (
    <View>
      <View>
        <Header title="커뮤니티 핫한 글" onPressMore={onPressMore} />

        <TouchableOpacity onPress={onPressPost}>
          <Post isFirst={true} />
        </TouchableOpacity>

        {/* <Post isFirst={false} />
        <Post isFirst={false} /> */}
      </View>

      <SplitRow height={20} />

      <BottomBanner />
    </View>
  );
};
