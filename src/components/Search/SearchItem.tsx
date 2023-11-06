import React, { memo } from 'react';
import { ButtonProps, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SearchEntity } from '@/apis/bakery/types';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { theme } from '@/styles/theme';
import { convertDistance } from '@/utils/convert/convert';
import { BreadCakeIcon } from '@shared/Icons';
import { Text } from '@shared/Text';

type Props = {
  bakery: SearchEntity;
  onPress: ButtonProps['onPress'];
};

const SearchItem: React.FC<Props> = memo(({ bakery, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <BreadCakeIcon width={26} height={26} color={theme.color.primary500} />

        <SplitColumn width={12} />

        <View style={styles.wrapper}>
          <Text presets={['body1', 'medium']} color={theme.color.gray900}>
            {bakery.bakeryName}
          </Text>
          <Text presets={['caption1', 'medium']} style={styles.hint}>
            리뷰 {bakery.reviewNum}
          </Text>
        </View>
        <Text style={styles.hint}>{convertDistance(bakery.distance)}</Text>
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
  iconWrapper: {
    marginRight: 8,
  },
  wrapper: {
    flex: 1,
  },
  hint: {
    color: theme.color.gray900,
  },
});

export { SearchItem };
