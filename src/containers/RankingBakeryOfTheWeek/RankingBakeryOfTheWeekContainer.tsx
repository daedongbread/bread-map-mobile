import React, { useCallback } from 'react';

import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { RankBakery, useRankBakeries } from '@/apis/bakery/useRankBakeries';
import { Rating } from '@/components/RankBakeries/Rating';
import { ShortAddress } from '@/components/RankBakeries/ShortAddress';
import { RootStackScreenProps } from '@/pages/Stack';
import { theme } from '@/styles/theme';
import { WINDOW_WIDTH } from '@/utils/constants/dimensions';
import { useNavigation } from '@react-navigation/core';
import IcReport from '@shared/Icons/IcReport.svg';
import { Text } from '@shared/Text';

export const RankingBakeryOfTheWeekContainer: React.FC = () => {
  const navigation = useNavigation<RootStackScreenProps<'MainStack'>['navigation']>();

  const { data } = useRankBakeries({ count: 10 });

  const onPressFlag = useCallback(
    (bakery: RankBakery) => {
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
    <SafeAreaView style={[styles.flex, styles.row, styles.wrap, styles.layout]}>
      {data?.map((item, i) => {
        return (
          <View key={item.id} style={[i % 2 === 0 ? styles.gap : undefined, i > 1 ? styles.horizontalGap : undefined]}>
            <View
              style={{
                position: 'absolute',
                backgroundColor: theme.color.gray900,
                width: 30,
                height: 28,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 5,
                borderTopStartRadius: 4,
                borderBottomEndRadius: 4,
              }}
            >
              <Text presets={['body2', 'medium']} color={'white'}>
                {i + 1}
              </Text>
            </View>
            <View style={[styles.imageWrapper]}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={styles.row}>
              <View style={styles.flex}>
                <TouchableOpacity onPress={() => onPressBakery(item)}>
                  <Text presets={['body1', 'bold']}>{item.name}</Text>
                  <ShortAddress shortAddress={item.shortAddress} />
                  <Rating flagNum={item.flagNum} rating={item.rating} />
                </TouchableOpacity>
              </View>
              <View style={[styles.center]}>
                <TouchableOpacity onPress={() => onPressFlag(item)}>
                  <IcReport width={28} height={28} style={item.isFlagged ? styles.primaryColor : styles.dimColor} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gap: {
    marginRight: 8,
  },
  horizontalGap: {
    marginTop: 34,
  },
  layout: {
    paddingHorizontal: 20,
  },
  imageWrapper: {
    marginBottom: 9,
  },
  image: {
    width: (WINDOW_WIDTH - 40 - 8) / 2,
    height: (WINDOW_WIDTH - 40 - 8) / 2,
    borderRadius: 4,
  },
  primaryColor: {
    color: theme.color.primary600,
  },
  dimColor: {
    color: theme.color.gray300,
  },
});
