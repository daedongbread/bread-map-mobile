import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NewBakery } from '@/apis/bakery/useGetNewBakeries';
import { FlagButton } from '@/components/Shared/Button';
import { CustomImage } from '@/components/Shared/CustomImage';
import { FollowButton } from '@/components/Shared/Reviews/FollowButton';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { MoreLineText, Text } from '@/components/Shared/Text';
import { Row } from '@/components/Shared/View';
import { theme } from '@/styles/theme';

type Props = {
  isFirst: boolean;
  newBakery: NewBakery;
};

export const NewBakeryCard = ({ isFirst, newBakery }: Props) => {
  return (
    <View style={[styles.container, !isFirst && styles.divider]}>
      <Row style={styles.spaceBetween}>
        <Row style={[styles.alignCenter, styles.alignCenter]}>
          <CustomImage
            style={styles.profileImage}
            source={{ uri: newBakery.pioneerProfileImage }}
            width={styles.profileImage.width}
            height={styles.profileImage.height}
            resizedWidth={styles.profileImage.width}
            resizedHeight={styles.profileImage.height}
            isResizable
          />
          <SplitColumn width={8} />
          <Text color={theme.color.gray900} presets={['body2', 'bold']}>
            {newBakery.pioneerNickname}
          </Text>
        </Row>

        <FollowButton style={styles.followButton} isFollow={newBakery.isFollowed} targetUserId={newBakery.pioneerId} />
      </Row>

      <SplitRow height={12} />

      <Row style={[styles.spaceBetween, styles.alignCenter]}>
        <Row style={styles.alignCenter}>
          <CustomImage
            style={styles.bakeryImage}
            source={{ uri: newBakery.image }}
            width={styles.bakeryImage.width}
            height={styles.bakeryImage.height}
            resizedWidth={styles.bakeryImage.width}
            resizedHeight={styles.bakeryImage.height}
            isResizable
          />
          <SplitColumn width={12} />

          <View>
            <Text color={theme.color.gray900} presets={['body1', 'bold']}>
              {newBakery.name}
            </Text>

            <SplitRow height={2} />

            <Text color={theme.color.gray600} presets={['caption2', 'regular']}>
              {newBakery.shortAddress}
            </Text>
          </View>
        </Row>

        <FlagButton isActive={newBakery.isFlagged} bakeryId={newBakery.id} bakeryName={newBakery.name} />
      </Row>

      {!!newBakery.content && (
        <>
          <SplitRow height={12} />
          <View style={styles.reviewTextContainer}>
            <MoreLineText
              color={theme.color.gray900}
              presets={['body2', 'regular']}
              linesToTruncate={2}
              text={newBakery.content}
            />
          </View>
        </>
      )}

      <SplitRow height={16} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: theme.color.gray100,
  },
  alignCenter: {
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 50,
  },
  followButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bakeryImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  reviewTextContainer: {
    height: 66,
    flexShrink: 1,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: theme.color.gray100,
    justifyContent: 'center',
  },
});
