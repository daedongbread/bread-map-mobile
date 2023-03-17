import React, { useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { BlockListEntry } from '@/apis/auth/useBlockList';
import { unblockUser } from '@/apis/auth/useUnblockUser';
import { UnblockUserBottomSheet } from '@/containers/BlockList/UnblockUserBottomSheet';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

interface Props {
  userId?: number;
}

export const UnblockUserBottomSheetContainer = ({ userId }: Props) => {
  const queryClient = useQueryClient();

  const navigation = useNavigation<MainStackScreenProps<'BlockListModal'>['navigation']>();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { mutate } = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => {
      onPressCancel();
      const data = queryClient.getQueryData<BlockListEntry[]>(['blockList']);
      queryClient.setQueryData(
        ['blockList'],
        data?.filter(el => el.userId !== userId)
      );
    },
  });

  const onPressUnblock = () => {
    if (!userId) {
      return;
    }

    mutate({
      userId,
    });
  };

  const onPressCancel = () => {
    navigation.setParams({
      blockUserId: undefined,
    });
  };

  useEffect(() => {
    if (userId) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [userId]);

  if (!userId) {
    return null;
  }

  return (
    <UnblockUserBottomSheet
      onPressUnblock={onPressUnblock}
      onPressCancel={onPressCancel}
      bottomSheetModalRef={bottomSheetModalRef}
    />
  );
};
