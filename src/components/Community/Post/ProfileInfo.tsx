import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useQueryClient } from 'react-query';
import { follow, unFollow } from '@/apis/profile';
import { FollowButton } from '@/components/Shared/Reviews/FollowButton';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { Row } from '@/components/Shared/View';
import { useAppSelector } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import DividerIcon from '@shared/Icons/DividerIcon.svg';

type Props = {
  postId: number;
  writerId: number;
  imageUrl: string;
  nickname: string;
  reviewCount: number;
  followerCount: number;
  isFollowed: boolean;
};

type Navigation = MainStackScreenProps<'ProfileStack'>['navigation'];

export const ProfileInfo = ({
  postId,
  writerId,
  imageUrl,
  nickname,
  reviewCount,
  followerCount,
  isFollowed,
}: Props) => {
  const navigation = useNavigation<Navigation>();

  const { userId } = useAppSelector(selector => selector.auth);

  const queryClient = useQueryClient();

  const onPressProfile = () => {
    navigation.navigate('ProfileStack', {
      screen: 'Profile',
      params: {
        userId: writerId,
      },
    });
  };

  const onPressFollowButton = async () => {
    if (isFollowed) {
      await unFollow({ userId: writerId });
    } else {
      await follow({ userId: writerId });
    }

    queryClient.refetchQueries({
      queryKey: ['useGetPost', { postId }],
    });
  };

  return (
    <Row style={styles.container}>
      <Pressable onPress={onPressProfile}>
        <Row>
          <Image style={styles.profileImage} source={{ uri: imageUrl }} />

          <SplitColumn width={8} />

          <View>
            <Text color={theme.color.gray900} presets={['body2', 'bold']}>
              {nickname}
            </Text>

            <SplitRow height={2} />

            <Row style={styles.otherProfile}>
              <Text color="#BDBDBD" presets={['caption2', 'medium']}>
                리뷰 {reviewCount}
              </Text>

              <SplitColumn width={4} />
              <DividerIcon />
              <SplitColumn width={4} />

              <Text color="#BDBDBD" presets={['caption2', 'medium']}>
                팔로워 {followerCount}
              </Text>
            </Row>
          </View>
        </Row>
      </Pressable>

      {userId !== writerId && <FollowButton isFollow={isFollowed} onPress={() => onPressFollowButton()} />}
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
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
