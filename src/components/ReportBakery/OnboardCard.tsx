import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import { CircleFlag } from '../Shared/Icons';
import { SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';

type Props = {
  item: any;
};

export const OnboardCard: React.FC<Props> = ({ item }) => {
  return (
    <View>
      <View>
        <Image style={styles.image} source={item.image} />
        <CircleFlag style={styles.flagIcon} width={32} height={32} />
      </View>
      <Text style={styles.nameText}>{item.name}</Text>
      <SplitRow height={12} />
      <View style={styles.nicknameContainer}>
        <Text style={styles.nicknameText}>
          {item.nickname}
          <Text style={styles.nicknameSuffixText}> 개척</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  nameText: {
    color: '#222222',
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
  },
  flagIcon: {
    position: 'absolute',
    right: 20,
    bottom: 36,
  },
  nicknameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nicknameText: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: theme.color.primary100,
    color: theme.color.primary500,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
  },
  nicknameSuffixText: {
    color: theme.color.gray800,
  },
});
