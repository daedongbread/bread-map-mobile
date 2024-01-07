import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';
import { SearchIcon } from '../Shared/Icons';
import { Text } from '../Shared/Text';
import { Row } from '../Shared/View';

type Props = {
  onPress: () => void;
};

export const SearchComponent = ({ onPress }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Row style={styles.inputContainer}>
        <Text color={theme.color.gray400}>빵 또는 빵집명을 검색해 보세요🥨</Text>
        <SearchIcon />
      </Row>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: theme.color.gray100,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
