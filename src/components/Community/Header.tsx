import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '@/styles/theme';
import WriteIcon from '@shared/Icons/WriteIcon.svg';
import { PrevIcon } from '../Shared/Icons/PrevIcon';
import { Text } from '../Shared/Text';
import { Row } from '../Shared/View';

type Props = {
  title: string;
  onPressPrev: () => void;
  onPressWrite: () => void;
};

export const Header = ({ title, onPressPrev, onPressWrite }: Props) => {
  return (
    <Row style={styles.container}>
      <TouchableOpacity onPress={onPressPrev}>
        <PrevIcon />
      </TouchableOpacity>

      <Text color={theme.color.gray900} presets={['subhead', 'bold']}>
        {title}
      </Text>

      <TouchableOpacity onPress={onPressWrite}>
        <WriteIcon />
      </TouchableOpacity>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 19.5,
    paddingVertical: 14,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
