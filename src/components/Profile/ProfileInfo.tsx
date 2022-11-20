import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { getRandomImageUrl, resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';

export function ProfileInfo() {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const onClickUpdateButton = () => {
    navigation.push('ProfileStack', {
      screen: 'EditProfile',
    });
  };
  const onClickFollowButton = (index: number) => {
    navigation.push('ProfileStack', {
      screen: 'FollowDetail',
      params: {
        index,
      },
    });
  };
  return (
    <View style={styles.Container}>
      <FastImage source={{ uri: getRandomImageUrl() }} style={styles.Image} />
      <SplitColumn width={16} />
      <View style={styles.Info}>
        <Text style={styles.InfoTitle} presets={['bold', 'body1']}>
          빵순이님
        </Text>
        <View style={styles.InfoSubInfo}>
          <TouchableOpacity onPress={() => onClickFollowButton(0)} style={styles.Follow}>
            <Text style={styles.InfoSubTitle}>팔로잉</Text>
            <Text style={[styles.InfoSubTitle, styles.InfoGray700]}> 0</Text>
          </TouchableOpacity>
          <Text style={[styles.InfoSubTitle, styles.splitColumn]}> |</Text>
          <TouchableOpacity onPress={() => onClickFollowButton(1)} style={styles.Follow}>
            <Text style={styles.InfoSubTitle}> 팔로워</Text>
            <Text style={[styles.InfoSubTitle, styles.InfoGray700]}> 100</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onClickUpdateButton} style={styles.Button}>
        <Text style={styles.buttonText}>수정</Text>
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
      width: 42,
      height: 28,
      borderWidth: 1,
      borderColor: theme.color.gray300,
      borderRadius: 4,
      marginLeft: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: theme.color.gray700,
      fontSize: 12,
      fontWeight: '700',
    },
    Follow: {
      flexDirection: 'row',
    },
  })
);
