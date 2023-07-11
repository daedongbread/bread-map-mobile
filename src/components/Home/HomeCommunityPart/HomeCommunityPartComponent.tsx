import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Header } from '../Header';
import { BottomBanner } from './BottomBanner';
import { Post } from './Post';

type Props = {
  onPressMore: () => void;
};

export const HomeCommunityPartComponent = ({ onPressMore }: Props) => {
  return (
    <View>
      <View style={styles.mainContainer}>
        <Header title="커뮤니티 핫한 글" onPressMore={onPressMore} />

        <Post isFirst={true} />
        <Post />
        <Post />
      </View>

      <SplitRow height={20} />

      <BottomBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
});
