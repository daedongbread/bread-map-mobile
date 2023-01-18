import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useGetBlockList } from '@/apis/auth/useBlockList';
import { BlockListEmpty } from '@/components/BlockList/BlockListEmpty';
import { BlockUser } from '@/components/BlockList/BlockUser';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

export const BlockListContainer = () => {
  const navigation = useNavigation<MainStackScreenProps<'BlockListModal'>['navigation']>();
  const { data } = useGetBlockList();

  const onPressUnblock = (userId: number) => {
    navigation.setParams({
      blockUserId: userId,
    });
  };

  return (
    <View style={style.wrapper}>
      <FlatList
        data={data}
        ListEmptyComponent={BlockListEmpty}
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
