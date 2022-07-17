import React, { memo } from 'react';
import { ButtonProps, StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import { Button } from '@shared/Button/Button';
import { BreadCry } from '@shared/Icons/BreadCry';
import { Text } from '@shared/Text';

type Props = {
  onPress: ButtonProps['onPress'];
};

const SearchedBakeryNotFound: React.FC<Props> = memo(({ onPress }) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.gap}>
        <BreadCry />
      </View>
      <View style={styles.gap}>
        <Text presets={['body1', 'bold']} style={[styles.textColor]}>
          검색결과가 없어요
        </Text>
      </View>
      <View style={styles.gap}>
        <Text presets={['number2']} style={styles.textColor}>
          찾으시는 빵집이 없으신가요?
        </Text>
        <Text presets={['number2']} style={styles.textColor}>
          나만의 빵 맛집을 제보해주세요!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button appearance={'terdary'} onPress={onPress}>
          제보하기
        </Button>
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
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  textColor: {
    color: theme.color.gray500,
  },
});

export { SearchedBakeryNotFound };
