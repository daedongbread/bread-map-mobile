import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommentContainer } from '@/containers/Comment';
import { Divider } from '../BakeryDetail/Divider';
import { Header } from '../Shared/Header';
import { SplitRow } from '../Shared/SplitSpace';
import { Post } from './Post';

type Props = {
  type: number;
};

const headerTexts = ['빵 이야기', '이벤트', '빵터지는 이야기'];

export const PostDetailComponent = ({}: Props) => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}
      enableOnAndroid
      enableAutomaticScroll={true}
      extraHeight={12}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView style={styles.container}>
        <Header title={headerTexts[0]} isPrevButtonShown />

        <Post />

        <SplitRow height={20} />

        <Divider />

        <CommentContainer />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
  },
});
