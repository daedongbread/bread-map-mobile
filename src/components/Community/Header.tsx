import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/styles/theme';
import NotificationIcon from '@shared/Icons/NotificationIcon.svg';
import { SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';
import { Row } from '../Shared/View';

type Props = {
  title: string;
  onPressNotification: () => void;
};

export const Header = ({ title, onPressNotification }: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <SplitRow height={top} />
      <Row style={styles.container}>
        <Text color={theme.color.gray900} presets={['heading2', 'bold']}>
          {title}
        </Text>

        <TouchableOpacity onPress={onPressNotification}>
          <NotificationIcon />
        </TouchableOpacity>
      </Row>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
