import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { CustomImage } from '../Shared/CustomImage';

export function ProfileInfo({ profileInfoData, onClickUpdateButton, onFollowButtonClick, myId, userId, otherId }: any) {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const isMe = myId === otherId || otherId === undefined;

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
      <CustomImage
        style={styles.Image}
        resizeMode="cover"
        source={{ uri: profileInfoData?.userImage }}
        width={styles.Image.width}
        height={styles.Image.height}
      />
      <SplitColumn width={16} />
      <View style={styles.Info}>
        <Text style={styles.InfoTitle}>{profileInfoData?.nickName}</Text>
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
        onPress={!isMe ? () => onFollowButtonClick(userId) : onClickUpdateButton}
        style={[
          styles.Button,
          {
            width: !isMe ? 52 : 42,
            borderWidth: !isMe && !profileInfoData?.isFollow ? 0 : 1,
            backgroundColor: !isMe && !profileInfoData?.isFollow ? theme.color.primary100 : 'white',
          },
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            { color: !isMe && !profileInfoData?.isFollow ? theme.color.primary500 : theme.color.gray700 },
          ]}
        >
          {!isMe ? (profileInfoData?.isFollow ? '팔로잉' : '팔로우') : '수정'}
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
      height: 38,
      marginTop: 'auto',
      marginBottom: 'auto',
      justifyContent: 'space-between',
    },
    InfoTitle: {
      color: theme.color.gray900,
      fontWeight: '700',
      fontSize: 16,
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
