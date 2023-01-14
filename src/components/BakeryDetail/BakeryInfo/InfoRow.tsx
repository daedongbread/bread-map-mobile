import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/styles/theme';

type InfoRowProps = {
  icon: React.ReactNode;
  text: string;
};

const InfoRow: React.FC<InfoRowProps> = ({ icon, text }) => (
  <View style={styles.row}>
    {icon}
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default InfoRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  text: {
    marginLeft: 8,
    color: theme.color.gray600,
    fontSize: 12,
  },
});
