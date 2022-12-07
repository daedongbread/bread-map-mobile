import React, { useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
import { unblockUser } from '@/apis/auth/useUnblockUser';
import { UnblockUserBottomSheet } from '@/containers/BlockList/UnblockUserBottomSheet';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

interface Props {
  userId?: number;
}

export const UnblockUserBottomSheetContainer = ({ userId }: Props) => {
  const navigation = useNavigation<MainStackScreenProps<'BlockListModal'>['navigation']>();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { mutate } = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => {
      onPressCancel();
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
