import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RankBakery } from '@/apis/bakery/useRankBakeries';
import { Rating } from '@/components/RankBakeries/Rating';
import IcReport from '@/components/Shared/Icons/IcReport.svg';
import { theme } from '@/styles/theme';
import { Text } from '@shared/Text';

import { CustomImage } from '../Shared/CustomImage';
import { ShortAddress } from './ShortAddress';

type Props = {
  bakeries?: RankBakery[];
  onPressFlag: (bakery: RankBakery) => void;
  onPressBakery: (bakery: RankBakery) => void;
};

export const RankBakeries = ({ bakeries, onPressBakery, onPressFlag }: Props) => {
  return (
    <FlatList
      data={bakeries}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity onPress={() => onPressBakery(item)}>
            <View style={[styles.row]}>
              <View style={[styles.row, styles.center, styles.imageWrapper]}>
                <Text color={theme.color.gray900} presets={['subhead', 'medium']} style={styles.rankingIndex}>
                  {index + 1}
                </Text>
                <CustomImage
                  style={styles.image}
                  source={{ uri: item.image }}
                  width={styles.image.width}
                  height={styles.image.height}
                  resizedWidth={150}
                  resizedHeight={150}
                  isResizable
                />
              </View>
              <View style={styles.contentWrapper}>
                <Text presets={['body1', 'bold']} color={'gray900'} style={styles.name}>
                  {item.name}
                </Text>
                <ShortAddress shortAddress={item.shortAddress} />
                <Rating rating={item.rating || 0} flagNum={item.flagNum || 0} />
              </View>
              <View style={[styles.center]}>
                <TouchableOpacity onPress={() => onPressFlag(item)}>
                  <IcReport width={28} height={28} style={item.isFlagged ? styles.primaryColor : styles.dimColor} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      ItemSeparatorComponent={() => <View style={styles.gap} />}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  rankingIndex: {
    marginRight: 19,
  },
  imageWrapper: {
    width: 104,
    justifyContent: 'space-around',
    marginRight: 12,
  },
  contentWrapper: {
    flex: 1,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 4,
  },
  name: {
    marginBottom: 4,
  },
  shortAddressWrapper: {
    alignItems: 'center',
    marginBottom: 13,
  },
  icLocation: {
    width: 15,
    height: 15,
  },
  shortAddress: {
    lineHeight: 13,
  },
  gap: {
    marginBottom: 8,
  },
  reportIconWrapper: {
    marginRight: 8,
  },
  icon: {
    width: 16,
    height: 16,
  },
  primaryColor: {
    color: theme.color.primary600,
  },
  dimColor: {
    color: theme.color.gray300,
  },
});
