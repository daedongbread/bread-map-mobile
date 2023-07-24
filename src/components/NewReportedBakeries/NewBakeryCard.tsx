import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ShortAddress } from '@/components/RankBakeries/ShortAddress';
import { theme } from '@/styles/theme';
import { Button } from '@shared/Button/Button';
import IcReport from '@shared/Icons/IcReport.svg';
import { Text } from '@shared/Text';

type Props = {
  user: {
    id: number;
    image: string;
    name: string;
    isFollow: boolean;
  };
  bakery: {
    id: number;
    image: string;
    name: string;
    shortAddress: string;
    isFlag: boolean;
    review: string;
  };
  onPressFollow: (userId: number) => void;
  onPressFlag: (bakery: { id: number; name: string }) => void;
};
export const NewBakeryCard = ({ user, bakery, onPressFollow, onPressFlag }: Props) => {
  const handlePressFollow = () => {
    onPressFollow(user.id);
  };

  const handlePressFlag = () => {
    onPressFlag({ id: bakery.id, name: bakery.name });
  };
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.center, styles.userSection]}>
        <Image source={{ uri: user.image }} width={20} height={20} style={[styles.avatar, styles.rightGap]} />
        <Text presets={['body2', 'semibold']} color={'gray900'} style={styles.rightGap}>
          {user.name}
        </Text>
        <View>
          <Button
            size={'tiny'}
            borderRadius={4}
            appearance={user.isFollow ? 'terdary' : 'secondary'}
            onPress={handlePressFollow}
          >
            <Text presets={['bold']}>팔로우</Text>
          </Button>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.rightGap}>
          <Image source={{ uri: bakery.image }} width={100} height={100} />
        </View>
        <View style={styles.bakeryInfo}>
          <View style={[styles.row, styles.spaceBetween]}>
            <View>
              <Text presets={['body2', 'semibold']} color={'gray900'} style={styles.bottomGap}>
                {bakery.name}
              </Text>
              <ShortAddress shortAddress={bakery.shortAddress} />
            </View>
            <View style={[styles.flagContainer]}>
              <TouchableOpacity onPress={handlePressFlag}>
                <IcReport width={28} height={28} style={bakery.isFlag ? styles.primaryColor : styles.dimColor} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewText} color={'gray900'}>
              {bakery.review}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.color.gray200,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    width: 300,
  },
  userSection: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flagContainer: {
    justifyContent: 'center',
  },
  rightGap: {
    marginRight: 8,
  },
  bottomGap: {
    marginBottom: 8,
  },
  avatar: {
    width: 20,
    height: 20,
  },
  primaryColor: {
    color: theme.color.primary600,
  },
  dimColor: {
    color: theme.color.gray300,
  },
  bakeryInfo: {
    flex: 1,
  },
  reviewContainer: {
    backgroundColor: theme.color.gray100,
    flex: 1,
    height: 52,
    paddingHorizontal: 10,
    paddingVertical: 11,
  },
  reviewText: {
    fontSize: 12,
    lineHeight: 15.12,
  },
});
