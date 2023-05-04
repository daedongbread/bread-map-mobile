import { AxiosError } from 'axios';
import React, { useRef } from 'react';
import { useBlockUser } from '@/apis/auth/useBlockUser';
import { BlockUserBottomSheetComponent } from '@/components/BakeryDetail/BakeryReview';
import { useAppDispatch } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { showToast } from '@/slices/toast';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useNavigation, useRoute } from '@react-navigation/native';

type Navigation = MainStackScreenProps<'BlockUserBottomSheet'>['navigation'];
type Route = MainStackScreenProps<'BlockUserBottomSheet'>['route'];

export const BlockUserBottomSheetContainer = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { userId } = route.params;
  const { mutateAsync: mutateBlockuser } = useBlockUser();

  const ref = useRef<BottomSheet>(null);

  const blockUser = async () => {
    await mutateBlockuser(userId)
      .then(() => {
        goNavSuccessPopup();
      })
      .catch((error: AxiosError) => {
        if (error.response?.data.code === 40913) {
          dispatch(
            showToast({
              text: '이미 차단한 사용자 입니다.',
              duration: 5000,
            })
          );
        }

        onClose();
      });
  };

  const closeBottomSheet = () => {
    ref.current?.close();
  };

  const goNavSuccessPopup = () => {
    onClose();
    navigation.navigate('SuccessBottomSheet', {
      content: '요청 주신 사용자의 차단이\n완료되었어요!',
    });
  };

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <BlockUserBottomSheetComponent
      ref={ref}
      blockUser={blockUser}
      onClose={onClose}
      closeBottomSheet={closeBottomSheet}
    />
  );
};
