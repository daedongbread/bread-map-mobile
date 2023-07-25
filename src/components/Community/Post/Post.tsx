import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { FollowButton } from '@/components/Shared/Reviews/FollowButton';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { Row } from '@/components/Shared/View';
import { theme } from '@/styles/theme';
import DividerIcon from '@shared/Icons/DividerIcon.svg';
import { Footer } from './Footer';

type Props = {};

const tempText =
  '항상 남부터미널오면 꼭 방문해서 몇개씩 사갑니다. 너무 맛있어요!!갑니다. 너무 맛있어요!! 맛있어요!!갑 항상 남부터미널오면 꼭 방문해서 몇개씩 사갑니다. 너무 맛있어요!!갑니다. 너무 맛있어요!! 맛있어요!!갑항상 남부터미널오면 꼭 방문해서 몇개씩 사갑니다. 너무 맛있어요!!갑니다. 너무 맛있어요!! 맛있어요!!갑';

export const Post = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Row style={styles.profileContainer}>
        <Row>
          <Image style={styles.profileImage} source={{ uri: 'https://picsum.photos/40/40' }} />

          <SplitColumn width={8} />

          <View>
            <Text color={theme.color.gray900} presets={['body2', 'bold']}>
              빵순이22
            </Text>

            <SplitRow height={2} />

            <Row style={styles.otherProfile}>
              <Text color="#BDBDBD" presets={['caption2', 'medium']}>
                리뷰 80
              </Text>

              <SplitColumn width={4} />
              <DividerIcon />
              <SplitColumn width={4} />

              <Text color="#BDBDBD" presets={['caption2', 'medium']}>
                팔로워 80
              </Text>
            </Row>
          </View>
        </Row>

        <FollowButton isFollow={false} onPress={() => null} />
      </Row>

      <SplitRow height={22} />

      <Text color={theme.color.gray900} presets={['subhead', 'bold']}>
        가장 좋아하는 빵집과 이유를 댓글로 달아주세요!
      </Text>

      <SplitRow height={20} />

      <Text color={theme.color.gray700} presets={['body2', 'medium']}>
        {tempText}
      </Text>

      <SplitRow height={20} />

      <Footer likeCount={25} commentCount={39} date="2021.10.01" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  profileContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  otherProfile: {
    alignItems: 'center',
  },
});
