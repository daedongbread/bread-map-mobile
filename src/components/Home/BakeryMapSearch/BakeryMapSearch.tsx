import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { theme } from '@/styles/theme';
import { resizePixel } from '@/utils';
import { SearchIcon } from '@shared/Icons';

type Props = {
  searchValue: string;
  onChangeSearch: (text: string) => void;
};

export const BakeryMapSearch: React.FC<Props> = ({ searchValue, onChangeSearch }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIconWrapper}>
        <SearchIcon />
      </View>

      <TextInput
        value={searchValue}
        onChangeText={onChangeSearch}
        placeholder={'빵집을 검색해보세요'}
        placeholderTextColor={theme.color.gray500}
        style={styles.textInput}
      />
    </View>
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
  textInput: {
    fontSize: resizePixel(14),
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
  },
});
