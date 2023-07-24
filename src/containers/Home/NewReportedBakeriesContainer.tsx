import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useFollow } from '@/apis/auth/useFollow';
import { RankBakery } from '@/apis/bakery/useRankBakeries';
import { NewBakeryCard } from '@/components/NewReportedBakeries/NewBakeryCard';
import { NewBakeryChip } from '@/components/NewReportedBakeries/NewBakeryChip';
import { RootStackScreenProps } from '@/pages/Stack';
import { useNavigation } from '@react-navigation/core';
import { Text } from '@shared/Text';

export const NewReportedBakeriesContainer = () => {
  const navigation = useNavigation<RootStackScreenProps<'MainStack'>['navigation']>();

  const { mutate } = useFollow({});

  const data = [
    {
      user: {
        id: 1,
        image: '',
        name: '빵순이22님의 제보',
        isFollow: false,
      },
      bakery: {
        id: 1,
        image: '',
        name: '밀도',
        shortAddress: '서울 강남구',
        isFlag: false,
        review: '한입 물었을 때 나오는 버터의 존재감bbb 맛나요 빵♡',
      },
    },
    {
      user: {
        id: 1,
        image: '',
        name: '빵순이22님의 제보',
        isFollow: true,
      },
      bakery: {
        id: 1,
        image: '',
        name: '밀도',
        shortAddress: '서울 강남구',
        isFlag: true,
        review: '한입 물었을 때 나오는 버터의 존재감bbb 맛나요 빵♡',
      },
    },
  ];

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
              user={item.user}
              bakery={item.bakery}
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
