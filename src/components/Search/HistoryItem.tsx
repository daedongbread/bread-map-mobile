import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { theme } from '@/styles/theme';
import { BreadCakeIcon } from '@shared/Icons';
import { Text } from '@shared/Text';

type Props = {
  name: string;
  onPress: () => void;
};

const HistoryItem: React.FC<Props> = memo(({ name, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <BreadCakeIcon width={20} height={20} color={theme.color.gray400} />

        <SplitColumn width={12} />

        <Text presets={['body1', 'medium']} color={'gray900'}>
          {name}
        </Text>
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
