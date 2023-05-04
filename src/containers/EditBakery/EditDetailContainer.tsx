import React, { useState, useCallback, useRef } from 'react';
import { updateBakery } from '@/apis/bakery';
import { EditDetailComponent } from '@/components/EditBakery';
import { useAppSelector } from '@/hooks/redux';
import { RootRouteProps } from '@/pages/MainStack/EditBakeryStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRoute } from '@react-navigation/native';

export function EditDetailContainer() {
  const {
    params: { bakeryId, NavigationKey },
  } = useRoute<RootRouteProps<'EditDetail'>>();
  const { accessToken } = useAppSelector(state => state.auth);
  const editDoneBottomSheetRef = useRef<BottomSheet>(null);
  const [edit, setEdit] = useState('');
  const [errorState, setErrorState] = useState({
    edit: false,
  });

  const onChange = useCallback(({ name: label, value }) => {
    setErrorState({ edit: false });
    const changeFunctions = {
      edit: setEdit,
    };

    if (label in changeFunctions) {
      changeFunctions[label as keyof typeof changeFunctions](value);
    }
  }, []);
  const onConfirmClick = async () => {
    if (edit.length === 0) {
      setErrorState({ ...errorState, edit: true });
      return;
    } else {
      const response = await updateBakery({
        accessToken: accessToken!!,
        bakeryId: bakeryId,
        content: edit,
      });

      if (response.status === 201) {
        editDoneBottomSheetRef.current?.expand();
      }
    }
  };

  return (
    <EditDetailComponent
      edit={edit}
      onChange={onChange}
      onConfirmClick={onConfirmClick}
      editDoneBottomSheetRef={editDoneBottomSheetRef}
      errorState={errorState}
      bakeryId={bakeryId}
      NavigationKey={NavigationKey}
    />
  );
}
