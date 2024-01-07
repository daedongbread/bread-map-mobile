import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Logo from '@shared/Icons/Logo.svg';
import NotificationIcon from '@shared/Icons/NotificationIcon.svg';
import { Row } from '../Shared/View';

type Props = {
  onPressRightButton: () => void;
};

export const Header = ({ onPressRightButton }: Props) => (
  <Row style={styles.container}>
    <Logo />

    <TouchableOpacity onPress={onPressRightButton}>
      <NotificationIcon />
    </TouchableOpacity>
  </Row>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});
