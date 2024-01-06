import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  onPressRightButton: () => void;
}

export const Header = ({ title, onPressRightButton }: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={[styles.prevButton]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 20 }}>
          <PrevIcon />
        </Pressable>
      </View>
      <Text
        color={theme.color.gray900}
        presets={['body1', 'bold']}
        style={styles.headerText}
        numberOfLines={1}
        ellipsizeMode={'tail'}
      >
        {title}
      </Text>
      <TouchableOpacity style={[styles.registButton, styles.activeRegistButton]} onPress={onPressRightButton}>
        <Text color={theme.color.white} presets={['bold']}>
          등록
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  prevButton: {
    width: 56,
    height: 24,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
  },
  registButton: {
    backgroundColor: theme.color.primary200,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeRegistButton: {
    backgroundColor: theme.color.primary600,
  },
});
