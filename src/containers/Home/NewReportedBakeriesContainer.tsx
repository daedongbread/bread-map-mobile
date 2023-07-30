import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useFollow } from '@/apis/auth/useFollow';
import { useGetNewBakeries } from '@/apis/bakery/useGetNewBakeries';
import { RankBakery } from '@/apis/bakery/useRankBakeries';
import { NewBakeryCard } from '@/components/NewReportedBakeries/NewBakeryCard';
import { NewBakeryChip } from '@/components/NewReportedBakeries/NewBakeryChip';
import { RootStackScreenProps } from '@/pages/Stack';
import { useNavigation } from '@react-navigation/core';
import { Text } from '@shared/Text';

export const NewReportedBakeriesContainer = () => {
  const navigation = useNavigation<RootStackScreenProps<'MainStack'>['navigation']>();

  const { mutate } = useFollow({});

  const { data } = useGetNewBakeries();

  const onPressFollow = useCallback(
    (userId: number) => {
      mutate({ userId });
    },
    [mutate]
  );

  const onPressFlag = useCallback(
    (bakery: Pick<RankBakery, 'id' | 'name'>) => {
      navigation.navigate('MainStack', {
        screen: 'BookmarkBottomSheet',
        params: {
          bakeryId: bakery.id,
          name: bakery.name,
          // onSaveSuccess: (selectBookmark: BookmarkList) => onBookmarkSuccess(selectBookmark),
        },
      });
    },
    [navigation]
  );

  // const onPressBakery = useCallback(
  //   (bakery: Pick<RankBakery, 'id' | 'name'>) => {
  //     navigation.navigate('MainStack', {
  //       screen: 'MainTab',
  //       params: {
  //         screen: 'HomeStack',
  //         params: {
  //           screen: 'Bakery',
  //           params: {
  //             screen: 'BakeryDetailHome',
  //             params: {
  //               bakeryId: bakery.id,
  //               bakeryName: bakery.name,
  //             },
  //           },
  //         },
  //       },
  //     });
  //   },
  //   [navigation]
  // );

  return (
    <View>
      <View style={styles.gap}>
        <NewBakeryChip />
      </View>
      <View style={styles.gap2}>
        <Text presets={['subhead', 'bold']} color={'black'}>
          방금 구운 따끈따끈 신상 빵집
        </Text>
      </View>
      <FlatList
        horizontal
        data={data}
        ItemSeparatorComponent={() => {
          return <View style={styles.cardGap} />;
        }}
        renderItem={({ item }) => {
          return (
            <NewBakeryCard
              id={item.id}
              name={item.name}
              image={item.image}
              shortAddress={item.shortAddress}
              isFlag={item.isFlagged}
              content={item.content}
              userId={item.pioneerId}
              userNickname={item.pioneerNickname}
              userProfile={item.pioneerProfileImage}
              isFollow={item.isFollowed}
              onPressFollow={onPressFollow}
              onPressFlag={onPressFlag}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gap: {
    marginBottom: 8,
  },
  gap2: {
    marginBottom: 16,
  },
  cardGap: {
    marginRight: 8,
  },
});
