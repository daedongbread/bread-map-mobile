import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SearchIcon } from '@/components/Shared/Icons';
import { theme } from '@/styles/theme';
import { resizePixel } from '@/utils';

interface Props {
  searchValue: string;
  onChnageSearchValue: (searchValue: string) => void;
}

export const ReviewSearch: React.FC<Props> = ({ searchValue, onChnageSearchValue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchIconWrapper}>
          <SearchIcon />
        </View>

        <TextInput
          style={styles.textInput}
          placeholder={'메뉴 이름을검색해보세요'}
          placeholderTextColor={theme.color.gray500}
          value={searchValue}
          onChangeText={onChnageSearchValue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.color.gray200,
  },
  searchContainer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 8,
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
