import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';

export function ProfileInfo({ profileInfoData, onClickUpdateButton, onFollowButtonClick, userId, otherId }: any) {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();

  const onClickFollowButton = (index: number, userId: number) => {
    navigation.push('ProfileStack', {
      screen: 'FollowDetail',
      params: {
        index,
        userId,
      },
    });
  };

  return (
    <View style={styles.Container}>
      <FastImage source={{ uri: profileInfoData?.userImage }} style={styles.Image} />
      <SplitColumn width={16} />
      <View style={styles.Info}>
        <Text style={styles.InfoTitle} presets={['bold', 'body1']}>
          {profileInfoData?.nickName}
        </Text>
        <View style={styles.InfoSubInfo}>
          <TouchableOpacity onPress={() => onClickFollowButton(0, userId)} style={styles.Follow}>
            <Text style={styles.InfoSubTitle}>팔로잉</Text>
            <Text style={[styles.InfoSubTitle, styles.InfoGray700]}> {profileInfoData?.followingNum}</Text>
          </TouchableOpacity>
          <Text style={[styles.InfoSubTitle, styles.splitColumn]}> |</Text>
          <TouchableOpacity onPress={() => onClickFollowButton(1, userId)} style={styles.Follow}>
            <Text style={styles.InfoSubTitle}> 팔로워</Text>
            <Text style={[styles.InfoSubTitle, styles.InfoGray700]}> {profileInfoData?.followerNum}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={otherId ? () => onFollowButtonClick(userId) : onClickUpdateButton}
        style={[
          styles.Button,
          {
            width: userId ? 52 : 42,
            borderWidth: userId && !profileInfoData?.isFollow ? 0 : 1,
            backgroundColor: userId && !profileInfoData?.isFollow ? theme.color.primary100 : '',
          },
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            { color: userId && !profileInfoData?.isFollow ? theme.color.primary500 : theme.color.gray700 },
          ]}
        >
          {otherId ? (profileInfoData?.isFollow ? '팔로잉' : '팔로우') : '수정'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    Container: {
      height: 60,
      marginHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
    },
    Image: {
      width: 60,
      height: 60,
      borderRadius: 10,
    },
    Info: {
      height: 41,
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    InfoTitle: {
      color: theme.color.gray900,
    },
    InfoSubInfo: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    InfoSubTitle: {
      fontSize: 12,
      color: theme.color.gray500,
      fontWeight: '400',
    },
    InfoGray700: {
      color: theme.color.gray700,
    },
    splitColumn: {
      color: theme.color.gray300,
    },
    Button: {
      height: 28,
      // borderWidth: 1,
      borderColor: theme.color.gray300,
      borderRadius: 4,
      marginLeft: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      // color: theme.color.gray700,
      fontSize: 12,
      fontWeight: '700',
    },
    Follow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
);
