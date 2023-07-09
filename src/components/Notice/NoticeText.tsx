import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import { Text } from '@shared/Text';

interface Props {
  title: string;
  createdAt: string;
  nickname: string;
}

export const NoticeText = ({ title, nickname, createdAt }: Props) => {
  const [prevTitle, nextTitle] = ` ${title}`.replace(nickname, `/${nickname}/`).split(`/${nickname}/`);

  return (
    <View style={styles.textWrapper}>
      <Text presets={['body2']} style={styles.title} numberOfLines={2}>
        {prevTitle.trim()}
        <Text presets={['bold']}>{nickname}</Text>
        {/* {nextTitle.trim()} */}
      </Text>
      <Text style={{ color: theme.color.gray400 }}>{createdAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    flex: 1,
  },
  title: {
    color: 'black',
  },
});
