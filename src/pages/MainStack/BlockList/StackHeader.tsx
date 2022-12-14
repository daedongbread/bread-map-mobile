import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from '@shared/Icons/ChevronLeftIcon';
import { Text } from '@shared/Text';

export const BlockListHeader = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.iconWrapper} onPress={goBack}>
        <ChevronLeftIcon width={24} height={24} />
      </TouchableOpacity>
      <Text presets={['subtitle2', 'bold']} style={styles.text}>
        차단한 사용자
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    left: 12,
    position: 'absolute',
  },
  text: {
    color: 'black',
  },
});
