import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReviewDetailEntity } from '@/apis/bakery/types';
import { Header } from '@/components/Shared/Header';
import { IcComment, IcLike, UploadIcon } from '@/components/Shared/Icons';
import { InteractionButton } from '@/components/Shared/Reviews/InteractionButton';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { Divider } from '../../Divider';
import { NoComments } from './NoComments';
import { ReviewDetailHeader } from './ReviewDetailHeader';

type Props = {
  review: ReviewDetailEntity;
  onPressLikeButton: (isLiked: boolean) => void;
};

export const ReviewCommentsDetailComponent = ({ review, onPressLikeButton }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        enabled
        style={styles.fullscrenn}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={12}
      >
        <Header isPrevButtonShown />
        <ReviewDetailHeader bakery={review.reviewDto.bakeryInfo} />
        <SplitRow height={20} />
        <View style={styles.interactionContainer}>
          <InteractionButton
            icon={IcLike}
            count={review.reviewDto.reviewInfo.likeNum}
            defaultText={'좋아요'}
            isActive={true}
            onPress={() => onPressLikeButton(true)}
          />
          <SplitColumn width={8} />
          <InteractionButton
            icon={IcComment}
            count={review.reviewDto.reviewInfo.commentNum}
            defaultText={'댓글달기'}
            onPress={() => null}
          />
        </View>

        <SplitRow height={20} />
        <Divider />

        <View style={styles.commentContainer}>
          <SplitRow height={50} />
          <NoComments />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="댓글을 입력하세요"
            placeholderTextColor={'#BDBDBD'}
            editable={false}
          />
          <SplitColumn width={10} />
          <UploadIcon style={styles.uploadIcon} />
        </View>

        {insets.bottom === 0 && <SplitRow height={12} />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      flex: 1,
    },
    fullscrenn: {
      flex: 1,
    },
    interactionContainer: {
      flexDirection: 'row',
      paddingHorizontal: 30,
    },
    commentContainer: {
      flex: 1,
    },
    inputContainer: {
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 12,
      paddingLeft: 12,
      paddingRight: 16,
      borderTopColor: '#EFEFEF',
      borderTopWidth: 1,
    },
    input: {
      flex: 1,
      padding: 0,
      margin: 0,
      paddingVertical: Platform.OS === 'android' ? 6 : 12,
      paddingHorizontal: 16,
      borderRadius: 21,
      borderWidth: 1,
      borderColor: theme.color.gray200,
    },
    uploadIcon: {},
  })
);
