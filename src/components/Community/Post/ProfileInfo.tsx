import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CustomImage } from '@/components/Shared/CustomImage';
import { FollowButton } from '@/components/Shared/Reviews/FollowButton';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { Row } from '@/components/Shared/View';
import { useAppSelector } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import ProfileSeparater from '@shared/Icons/ProfileSeparater.svg';

type Props = {
  writerId: number;
  imageUrl: string;
  nickname: string;
  reviewCount: number;
  followerCount: number;
  isFollowed: boolean;
};

type Navigation = MainStackScreenProps<'ProfileStack'>['navigation'];

export const ProfileInfo = React.memo(
  ({ writerId, imageUrl, nickname, reviewCount, followerCount, isFollowed }: Props) => {
    const navigation = useNavigation<Navigation>();

    const { userId } = useAppSelector(selector => selector.auth);

    const onPressProfile = () => {
      navigation.navigate('ProfileStack', {
        screen: 'Profile',
        params: {
          userId: writerId,
        },
      });
    };

    return (
      <Row style={styles.container}>
        <Pressable onPress={onPressProfile}>
          <Row>
            <CustomImage
              style={styles.profileImage}
              width={styles.profileImage.width}
              height={styles.profileImage.height}
              source={{ uri: imageUrl }}
              resizedWidth={40}
              resizedHeight={40}
              isResizable
            />

            <SplitColumn width={8} />

            <View>
              <Text color={theme.color.gray900} presets={['body2', 'bold']}>
                {nickname}
              </Text>

              <SplitRow height={2} />

              <Row style={styles.otherProfile}>
                <Text color={theme.color.gray500} presets={['caption2', 'medium']}>
                  게시물 {reviewCount}
                </Text>

                <SplitColumn width={8} />
                <ProfileSeparater />
                <SplitColumn width={8} />

                <Text color={theme.color.gray500} presets={['caption2', 'medium']}>
                  팔로워 {followerCount}
                </Text>
              </Row>
            </View>
          </Row>
        </Pressable>

        {userId !== writerId && (
          <FollowButton style={styles.followButton} isFollow={isFollowed} targetUserId={writerId} />
        )}
      </Row>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  otherProfile: {
    alignItems: 'center',
  },
  followButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
});
