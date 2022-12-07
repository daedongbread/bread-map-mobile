import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { BlockUser } from '@/components/BlockList/BlockUser';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

export const BlockListContainer = () => {
  const navigation = useNavigation<MainStackScreenProps<'BlockListModal'>['navigation']>();
  // const { data } = useGetBlockList();

  const onPressUnblock = (userId: number) => {
    navigation.setParams({
      blockUserId: userId,
    });
  };

  const data = [
    {
      userId: 91,
      userImage: null,
      nickName: 'testBlockUserNickName',
      reviewNum: 0,
      followerNum: 0,
    },
  ];
  return (
    <View style={style.wrapper}>
      <FlatList
        data={data}
        renderItem={({ item }) => <BlockUser key={item.userId} handlePressUnblock={onPressUnblock} {...item} />}
      />
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    paddingTop: 32,
  },
});
