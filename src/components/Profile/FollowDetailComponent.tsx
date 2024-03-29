import React, { memo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/core';
import SadBreadGray from '@shared/Images/sadBreadGray.png';
import { Text } from '../Shared/Text';
import { FollowDetailItem } from './FollowDetailItem';
import { Header } from './Header';

type Props = {
  index: number;
  followingData: any;
  followerData: any;
  followingLoading: boolean;
  followerLoading: boolean;
  onFollowButtonClick: (item: any) => void;
};

export function FollowDetailComponent({
  index,
  followingData,
  followerData,
  followerLoading,
  followingLoading,
  onFollowButtonClick,
}: Props) {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const isLoading = followerLoading || followingLoading;

  const onItemClick = (item: any) => {
    navigation.push('ProfileStack', {
      screen: 'Profile',
      params: {
        userId: item?.userId,
      },
    });
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Header type="DETAIL" title={index === 0 ? '팔로잉' : '팔로워'} />
      {isLoading ? null : (
        <FlatList
          bounces={false}
          contentContainerStyle={styles.Flatlist}
          data={index === 0 ? followingData : followerData}
          renderItem={FollowDetailItem(onFollowButtonClick, onItemClick)}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={ListEmptyComponent(index)}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const ItemSeparatorComponent = memo(() => <View style={styles.SeparatorContainer} />);

const ListEmptyComponent = (index: number) =>
  memo(() => {
    return (
      <View style={styles.EmptyContainer}>
        <FastImage source={SadBreadGray} style={styles.EmptyImage} resizeMode="contain" />
        <Text style={styles.EmptyTitle} presets={['body1', 'bold']}>
          <Text>아직 </Text>
          <Text>{index === 0 ? '팔로잉한 빵순이가' : '팔로워가'}</Text>
          <Text> 없어요</Text>
        </Text>

        <Text style={styles.EmptySubTitle} presets={['body2', 'medium']}>
          {index === 0
            ? '마음에 드는 빵순이를 팔로잉해\n다양한 리뷰들을 만나보세요!'
            : '리뷰를 많이 남길수록\n팔로워가 늘어날거예요!'}
        </Text>
      </View>
    );
  });

const styles = StyleSheet.create(
  resizePixels({
    SafeAreaView: {
      flex: 1,
    },
    SeparatorContainer: {
      height: 1,
      backgroundColor: theme.color.gray200,
      marginVertical: 12,
    },
    EmptyContainer: {
      flex: 1,
      alignItems: 'center',
    },
    EmptyImage: {
      width: 85,
      height: 49,
      marginTop: 120,
    },
    EmptyTitle: {
      color: theme.color.gray500,
      marginTop: 16,
    },
    EmptySubTitle: {
      color: theme.color.gray500,
      textAlign: 'center',
      marginTop: 12,
    },
    Flatlist: {
      paddingTop: 32,
      marginHorizontal: 20,
    },
  })
);
