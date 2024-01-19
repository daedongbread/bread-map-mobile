import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SearchIcon } from '@/components/Shared/Icons';
import { theme } from '@/styles/theme';
import { resizePixel } from '@/utils';

interface Props {
  searchValue: string;
  onChangeSearchValue: (searchValue: string) => void;
}

export const ReviewSearch: React.FC<Props> = ({ searchValue, onChangeSearchValue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchIconWrapper}>
          <SearchIcon />
        </View>

        <TextInput
          style={styles.textInput}
          placeholder={'메뉴 이름을 검색해보세요'}
          placeholderTextColor={theme.color.gray500}
          value={searchValue}
          onChangeText={onChangeSearchValue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  searchContainer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 8,
  },
  searchIconWrapper: {
    justifyContent: 'center',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: resizePixel(14),
    textAlignVertical: 'center',
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
    color: '#222222',
  },
});
