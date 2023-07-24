import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PostSummary } from '../../Community/Post';
import { Header } from '../Header';

type Props = {
  onPressPost: (type: number) => void;
  onPressMore: () => void;
};

export const HomeCommunityPartComponent = ({ onPressPost, onPressMore }: Props) => {
  return (
    <View>
      <View>
        <Header title="커뮤니티 핫한 글" onPressMore={onPressMore} />

        <TouchableOpacity onPress={() => onPressPost(0)}>
          <PostSummary isFirst={true} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
