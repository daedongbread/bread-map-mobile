import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { CommentIcon, LikeIcon, ViewMoreIcon } from '@/components/Shared/Icons';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

type Props = {
  isFirst: boolean;
};

const titleText =
  '가장 좋아하는 빵집과 이유를 댓글로 달아주세요!가장 좋아하는 빵집과 이유를 댓글로 달아주세요!가장 좋아하는 빵집과 이유를 댓글로 달아주세요!가장 좋아하는 빵집과 이유를 댓글로 달아주세요!';
const mainText =
  '안녕하세요! 대동빵지도 이벤트 관리자 대빵이에요! 여러분이가장 좋아하는 가장 좋아하는안녕하세요! 대동빵지도 이벤트 관리자 대빵이에요! 여러분이가장 좋아하는 가장 좋아하는안녕하세요! 대동빵지도 이벤트 관리자 대빵이에요! 여러분이가장 좋아하는 가장 좋아하는';

const MAIN_TEXT_LIMIT = 38;

export const Post = ({ isFirst }: Props) => {
  return (
    <View style={[styles.container, !isFirst && styles.divider]}>
      <Text color={theme.color.white} presets={['caption2', 'bold']} style={styles.tag}>
        이벤트
      </Text>

      <SplitRow height={16} />

      <View style={styles.mainContainer}>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={{ uri: 'https://picsum.photos/30/30' }} />

          <SplitColumn width={10} />

          <Text color={theme.color.gray900} presets={['body2', 'bold']}>
            관리자 소빵이
          </Text>
        </View>

        <SplitRow height={10} />

        <View style={styles.contentsContainer}>
          <View style={styles.textContainer}>
            <Text color={theme.color.gray900} presets={['body1', 'semibold']} numberOfLines={2} ellipsizeMode="tail">
              {titleText}
            </Text>
            {mainText.trim().length > MAIN_TEXT_LIMIT ? (
              <Text color={theme.color.gray600} presets={['body2', 'medium']} numberOfLines={2} ellipsizeMode="tail">
                {mainText.trim().substring(0, MAIN_TEXT_LIMIT)}...
                <Text color={theme.color.gray500} presets={['body2', 'medium']}>
                  {' '}
                  더보기
                </Text>
              </Text>
            ) : (
              <Text color={theme.color.gray600} presets={['body2', 'medium']}>
                {mainText}
              </Text>
            )}
          </View>

          <SplitColumn width={17} />

          <Image style={styles.postImage} source={{ uri: 'https://picsum.photos/80/80' }} />
        </View>

        <SplitRow height={15} />

        <View style={styles.container1}>
          <View style={styles.container2}>
            <LikeIcon />
            <SplitColumn width={2} />
            <Text color={theme.color.gray800} presets={['caption1', 'medium']}>
              25
            </Text>

            <SplitColumn width={10} />

            <CommentIcon />
            <SplitColumn width={2} />
            <Text color={theme.color.gray800} presets={['caption1', 'medium']}>
              39
            </Text>
          </View>

          <View style={styles.container3}>
            <Text color={theme.color.gray500} presets={['caption1', 'medium']}>
              2021.10.01
            </Text>
            <SplitColumn width={12} />
            <ViewMoreIcon />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  divider: {
    borderTopColor: theme.color.gray300,
    borderTopWidth: 0.25,
  },
  tag: {
    backgroundColor: theme.color.primary600,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  mainContainer: {},
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 27,
  },
  contentsContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  text: {
    height: 80,
  },
  postImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
