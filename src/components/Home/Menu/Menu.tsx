import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { HomeMenu } from '@/containers/Home/MenuContainer';
import { theme } from '@/styles/theme';

const { width } = Dimensions.get('window');

type Props = {
  menu: HomeMenu;
};

export const Menu = ({ menu }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <menu.icon />
      </View>

      <SplitRow height={6} />

      <Text color={theme.color.gray700} presets={['caption2', 'medium']}>
        {menu.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  menuContainer: {
    width: width * 0.13,
    height: width * 0.13,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: theme.color.gray50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.color.gray200,
  },
});
