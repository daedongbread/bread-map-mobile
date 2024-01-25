import React from 'react';
import { FlatList, LogBox, StyleSheet } from 'react-native';
import { useUnBlockUser } from '@/apis/auth';
import { useGetBlockList } from '@/apis/auth/useBlockList';
import { BlockListEmpty } from '@/components/BlockList/BlockListEmpty';
import { BlockUser } from '@/components/BlockList/BlockUser';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Flex } from '@/components/Shared/View';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

type Navigation = MainStackScreenProps<'BlockListModal'>['navigation'];

export const BlockListContainer = () => {
  const navigation = useNavigation<Navigation>();

  const { mutateAsync: unBlockUserApi } = useUnBlockUser();
  const { data: blockList } = useGetBlockList();

  const onPressUnblock = (targetUserId: number, nickName: string) => {
    navigation.navigate('QuestionBottomSheet', {
      title: '정말 차단 해제하시겠어요?',
      subTitle: `${nickName}님에게는 회원님이\n차단을 해제했다는 정보를 알리지 않습니다.`,
      leftButtonText: '취소',
      rightButtonText: '차단 해제',
      onPressRightButton: () => unBlockUserApi(targetUserId),
    });
  };

  return (
    <Flex>
      <FlatList
        data={blockList}
        style={styles.contentContainer}
        ListHeaderComponent={<SplitRow height={32} />}
        ListEmptyComponent={BlockListEmpty}
        renderItem={({ item, index }) => (
          <BlockUser key={item.userId} isFirst={index === 0} handlePressUnblock={onPressUnblock} {...item} />
        )}
      />
    </Flex>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
  },
});
