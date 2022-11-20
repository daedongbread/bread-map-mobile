import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { SplitColumn } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';

export function FollowDetailItem({ item }: any) {
  const ButtonStyle = {
    backgroundColor: item?.isFollowing ? 'white' : theme.color.primary100,
    borderWidth: item?.isFollowing ? 1 : 0,
  };
  const ButtonTextStyle = {
    color: item?.isFollowing ? theme.color.gray600 : theme.color.primary500,
  };

  return (
    <View style={styles.Container}>
      <FastImage source={{ uri: item?.image }} style={styles.Image} />
      <SplitColumn width={8} />

      <View style={styles.InfoWrap}>
        <Text style={styles.InfoTitle} presets={['bold', 'body1']}>
          {item?.name}
        </Text>
        <View style={styles.InfoSubInfo}>
          <View style={styles.Follow}>
            <Text style={styles.InfoSubTitle}>리뷰</Text>
            <Text style={styles.InfoSubTitle}> {item?.reviewCount}</Text>
          </View>
          <Text style={[styles.InfoSubTitle, styles.splitColumn]}> |</Text>
          <View style={styles.Follow}>
            <Text style={styles.InfoSubTitle}> 팔로워</Text>
            <Text style={styles.InfoSubTitle}> {item?.followerCount}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={[styles.Button, ButtonStyle]}>
        <Text style={[styles.FollowText, ButtonTextStyle]}>{item?.isFollowing ? '팔로잉' : '팔로우'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    Container: {
      height: 53,
      flexDirection: 'row',
      alignItems: 'center',
    },
    Image: {
      width: 40,
      height: 40,
      borderRadius: 99,
    },
    InfoWrap: {
      width: 104,
      height: 40,
    },
    Button: {
      width: 53,
      height: 24,
      borderRadius: 4,
      marginLeft: 'auto',
      borderWidth: 1,
      borderColor: theme.color.gray300,
      justifyContent: 'center',
      alignItems: 'center',
    },
    FollowText: {
      fontSize: 12,
      fontWeight: '700',
    },
    Info: {
      height: 41,
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    InfoTitle: {
      color: 'black',
      fontSize: 14,
      fontWeight: '500',
    },
    InfoSubInfo: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    InfoSubTitle: {
      fontSize: 12,
      color: theme.color.gray400,
      fontWeight: '500',
    },
    Follow: {
      flexDirection: 'row',
    },
    splitColumn: {
      color: theme.color.gray300,
    },
  })
);
