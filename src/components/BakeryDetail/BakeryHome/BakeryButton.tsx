import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

type Props = {
  icon: React.ReactNode;
  text: string;
  textColor?: string;
  onPress: () => void;
};

// active 상태 구현 필요
export const BakeryButton: React.FC<Props> = ({ text, textColor = theme.color.gray600, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon}
      <Text style={{ ...styles.text, color: textColor }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      backgroundColor: theme.color.gray50,
      paddingVertical: 15,
      width: '31.5%',
      alignItems: 'center',
      borderRadius: 10,
    },
    text: {
      color: theme.color.gray600,
      marginTop: 6,
      fontWeight: 'bold',
    },
  })
);
