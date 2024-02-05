import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { theme } from '@/styles/theme';
import { BreadCakeIcon } from '@shared/Icons';
import { Text } from '@shared/Text';

type Props = {
  name: string;
  onPress: () => void;
  searchValue?: string;
};

const HistoryItem: React.FC<Props> = memo(({ name, onPress, searchValue }) => {
  const searchValueSplit = searchValue?.split('');
  const nameSplit = name?.split('');

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <BreadCakeIcon width={20} height={20} color={theme.color.gray400} />

        <SplitColumn width={12} />

        {nameSplit.map(nameChar => (
          <Text presets={['body1', 'medium']} color={searchValueSplit?.includes(nameChar) ? 'primary500' : 'gray900'}>
            {nameChar}
          </Text>
        ))}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
});

export { HistoryItem };
