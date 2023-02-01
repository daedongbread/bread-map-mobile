import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

type TabHeaderProps = {
  title: string;
  totalCount: number;
  addBtnText?: string;
  onPressAddBtn: () => void;
};

// TODO: 추후 버튼 컴포넌트 만들어지면 TabHeader 삭제 고민
const TabHeader: React.FC<TabHeaderProps> = ({ title, totalCount, addBtnText, onPressAddBtn }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.tabName}>{title}</Text>
      <Text style={styles.totalCount}>{totalCount}</Text>
    </View>
    {addBtnText && (
      <TouchableOpacity style={styles.button} onPress={onPressAddBtn}>
        <Text style={styles.buttonText}>{addBtnText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

export { TabHeader };

const styles = StyleSheet.create(
  resizePixels({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tabName: {
      color: theme.color.gray900,
      fontSize: 18,
      fontWeight: 'bold',
    },
    totalCount: {
      color: theme.color.primary500,
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft: 3,
    },
    button: {
      backgroundColor: theme.color.primary500,
      paddingHorizontal: 12,
      paddingVertical: 8,
      justifyContent: 'center',
      borderRadius: 30,
    },
    buttonText: {
      color: theme.color.white,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: 'bold',
    },
  })
);
