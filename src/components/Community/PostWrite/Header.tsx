import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
}

export const Header = ({ title }: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={[styles.prevButton]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 20 }}>
          <PrevIcon />
        </Pressable>
      </View>
      <Text presets={['subhead', 'bold']} style={styles.headerText} numberOfLines={1} ellipsizeMode={'tail'}>
        {title}
      </Text>
      <View style={[styles.registButton, styles.activeRegistButton]}>
        <Text color={theme.color.white} presets={['bold']}>
          등록
        </Text>
      </View>
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
    color: theme.color.gray900,
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
