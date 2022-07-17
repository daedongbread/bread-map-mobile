import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { BreadCakeIcon } from '@shared/Icons';
import { Text } from '@shared/Text';

type Props = {
  name: string;
};

const HistoryItem: React.FC<Props> = memo(({ name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <BreadCakeIcon width={26} height={26} />
      </View>
      <Text presets={['body1', 'regular']}>{name}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 13,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});

export { HistoryItem };
