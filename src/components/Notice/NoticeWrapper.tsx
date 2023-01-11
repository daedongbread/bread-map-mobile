import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children: ReactNode;
}
export const NoticeWrapper = ({ children }: Props) => <View style={styles.wrapper}>{children}</View>;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
});
