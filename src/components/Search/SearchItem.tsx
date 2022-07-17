import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import { convertDistance } from '@/utils/convert/convert';
import { BreadCakeIcon } from '@shared/Icons';
import { Text } from '@shared/Text';

type Props = {
  bakery: {
    name: string;
    reviews: Array<number>;
    distance: number;
  };
};

const SearchItem: React.FC<Props> = memo(({ bakery }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <BreadCakeIcon width={26} height={26} />
      </View>
      <View style={{ flex: 1 }}>
        <Text presets={['body1', 'regular']}>{bakery.name}</Text>
        <Text presets={['caption1', 'regular']} style={styles.hint}>
          리뷰 {bakery.reviews.length}
        </Text>
      </View>
      <Text style={styles.hint}>{convertDistance(bakery.distance)}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 13,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  hint: {
    color: theme.color.gray500,
  },
});

export { SearchItem };
