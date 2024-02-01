import React, { memo } from 'react';
import { ButtonProps, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BakeryDTO } from '@/apis/search';
import { BreadCircle } from '@/components/Shared/Icons/BreadCircle';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { theme } from '@/styles/theme';
import { convertDistance } from '@/utils/convert/convert';
import { StarIcon } from '@shared/Icons';
import { Text } from '@shared/Text';

type Props = {
  bakery: BakeryDTO;
  onPress: ButtonProps['onPress'];
};

const SearchItem: React.FC<Props> = memo(({ bakery, onPress }) => {
  const { address, reviewNum, totalScore, bakeryName, distance } = bakery;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.body}>
          <BreadCircle />

          <SplitColumn width={12} />

          <View style={styles.wrapper}>
            <Text presets={['body2', 'semibold']} color={theme.color.gray900}>
              {bakeryName}
            </Text>

            <SplitRow height={4} />

            <Text presets={'caption2'} color={theme.color.gray500}>
              {address}
            </Text>

            <SplitRow height={4} />

            <View style={styles.row}>
              <View style={styles.row}>
                <StarIcon size={12.5} fillColor={'#FFD540'} />

                <SplitColumn width={4} />

                <Text presets={'caption2'} color={theme.color.gray500}>
                  {totalScore}
                </Text>
              </View>

              <SplitColumn width={4} />

              <View style={styles.verticalBar} />

              <SplitColumn width={4} />

              <Text presets={'caption2'} color={theme.color.gray500}>
                리뷰 {reviewNum}
              </Text>
            </View>
          </View>
        </View>
        <Text presets={'caption2'} color={theme.color.gray500}>
          {convertDistance(distance)}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    flex: 1,
  },
  iconWrapper: {
    marginRight: 8,
  },
  wrapper: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalBar: {
    width: 1,
    height: 8,
    backgroundColor: theme.color.gray300,
  },
});

export { SearchItem };
