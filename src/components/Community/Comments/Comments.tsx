import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Comment } from './Comment';

type Props = {};

export const Comments = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Comment />
      <Comment isReply />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
