import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { RankBakery, useRankBakeries } from '@/apis/bakery/useRankBakeries';
import { Header } from '@/components/Home';
import { RankBakeries } from '@/components/RankBakeries';
import { RootStackScreenProps } from '@/pages/Stack';
import { useNavigation } from '@react-navigation/core';

export const WeekendBriefRankingContainer = () => {
  const navigation = useNavigation<RootStackScreenProps<'MainStack'>['navigation']>();

  const { data } = useRankBakeries();

  const onPressMore = useCallback(() => {
    navigation.navigate('MainStack', {
      screen: 'MainTab',
      params: {
        screen: 'HomeStack',
        params: {
          screen: 'RankingBakeryOfTheWeek',
        },
      },
    });
  }, [navigation]);

  const onPressFlag = useCallback(
    (bakery: RankBakery) => {
      navigation.navigate('MainStack', {
        screen: 'BookmarkBottomSheet',
        params: {
          bakeryId: bakery.id,
          name: bakery.name,
        },
      });
    },
    [navigation]
  );

  const onPressBakery = useCallback(
    (bakery: RankBakery) => {
      navigation.navigate('MainStack', {
        screen: 'MainTab',
        params: {
          screen: 'HomeStack',
          params: {
            screen: 'Bakery',
            params: {
              screen: 'BakeryDetailHome',
              params: {
                bakeryId: bakery.id,
                bakeryName: bakery.name,
              },
            },
          },
        },
      });
    },
    [navigation]
  );

  return (
    <View>
      <Header title="이번주 인기 빵집" onPressMore={onPressMore} />
      <View style={styles.gap} />
      <RankBakeries bakeries={data} onPressFlag={onPressFlag} onPressBakery={onPressBakery} />
    </View>
  );
};

const styles = StyleSheet.create({
  gap: {
    marginBottom: 16,
  },
});
