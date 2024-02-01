import React, { memo } from 'react';
import { ButtonProps, StyleSheet, TouchableOpacity, View } from 'react-native';
import { theme } from '@/styles/theme';
import { BreadCry } from '@shared/Icons/BreadCry';
import { Text } from '@shared/Text';

type Props = {
  keyword: string;
  onPress: ButtonProps['onPress'];
};

const SearchedBakeryNotFound: React.FC<Props> = memo(({ keyword, onPress }) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.gap}>
        <BreadCry />
      </View>
      <View style={styles.gap}>
        <Text presets={['body1', 'medium']} style={[styles.textColor]}>
          {`'${keyword}'에 대한 검색결과가 없어요`}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text presets={['body2', 'medium']} color={theme.color.primary500}>
            신규 장소 등록하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 72,
    alignItems: 'center',
  },
  gap: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 16,
  },
  textColor: {
    color: theme.color.gray500,
  },
  button: {
    borderWidth: 1,
    borderColor: theme.color.primary500,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
});

export { SearchedBakeryNotFound };
