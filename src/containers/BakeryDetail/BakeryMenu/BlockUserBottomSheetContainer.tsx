import React from 'react';
import { useBlockUser } from '@/apis/auth/useBlockUser';
import { BlockUserBottomSheetComponent } from '@/components/BakeryDetail/BakeryReview';
import { BakeryReviewStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

export const BlockUserBottomSheetContainer = () => {
  const navigation = useNavigation<BakeryReviewStackScreenProps<'BlockUserBottomSheet'>['navigation']>();
  const route = useRoute<BakeryReviewStackScreenProps<'BlockUserBottomSheet'>['route']>();

  const { userId } = route.params;
  const { mutateAsync: mutateBlockuser } = useBlockUser();

  const blockUser = async () => {
    await mutateBlockuser(userId);
    onClose();
  };

  const onClose = () => {
    navigation.goBack();
  };

  return <BlockUserBottomSheetComponent blockUser={blockUser} onClose={onClose} />;
};
