import React, { memo } from 'react';
import { ButtonProps, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SearchEntity } from '@/apis/bakery/useSearch';
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
        <View style={styles.iconContainer}>
          <BreadCakeIcon width={26} height={26} />
        </View>
        <View style={{ flex: 1 }}>
          <Text presets={['body1', 'regular']}>{bakery.bakeryName}</Text>
          <Text presets={['caption1', 'regular']} style={styles.hint}>
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
