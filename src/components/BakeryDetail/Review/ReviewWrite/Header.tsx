import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CloseIcon } from '@/components/Shared/Icons';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  closePage: () => void;
}

export const Header = ({ title, closePage }: Props) => {
  const navigation = useNavigation<MainStackScreenProps<'ReviewWriteStack'>['navigation']>();

  const onPressPrevBtn = () => {
    navigation.pop();
  };

  const onPressCloseBtn = () => {
    closePage();
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPressPrevBtn}>
        <PrevIcon />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity onPress={onPressCloseBtn}>
        <CloseIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 19.5,
    flexDirection: 'row',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
