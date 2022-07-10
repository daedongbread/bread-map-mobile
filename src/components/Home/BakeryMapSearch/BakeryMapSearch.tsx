import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { theme } from '@/styles/theme';
import { SearchIcon } from '@shared/Icons';
import { Text } from '@shared/Text';

type Props = {
  onPress: () => void;
};

export const BakeryMapSearch: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.searchIconWrapper}>
          <SearchIcon />
        </View>
        <Text presets={['body1']} style={styles.text}>
          빵집을 검색해보세요
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    borderRadius: 8,
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    alignItems: 'center',
  },
  searchIconWrapper: {
    marginRight: 10,
  },
  text: {
    color: theme.color.gray500,
  },
});
