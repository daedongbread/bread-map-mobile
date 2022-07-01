import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CloseIcon } from '@/components/Shared/Icons';

export const MainHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.temp} />
      <Text style={styles.headerText}>리뷰작성</Text>
      <TouchableOpacity onPress={() => null}>
        <CloseIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15.5,
    flexDirection: 'row',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  temp: {
    width: 24,
  },
});
