import React, { useState, useCallback, useRef } from 'react';
import { updateBakery } from '@/apis/bakery';
import { EditDetailComponent } from '@/components/EditBakery';
import { useAppSelector } from '@/hooks/redux';
import { RootRouteProps } from '@/pages/MainStack/EditBakeryStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRoute } from '@react-navigation/native';

export function EditDetailContainer() {
  const {
    params: { bakeryId },
  } = useRoute<RootRouteProps<'EditDetail'>>();
  const { accessToken } = useAppSelector(state => state.auth);
  const editDoneBottomSheetRef = useRef<BottomSheet>(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [edit, setEdit] = useState('');
  const [errorState, setErrorState] = useState({
    name: false,
    location: false,
  });

  const onChange = useCallback(({ name: label, value }) => {
    setErrorState({ name: false, location: false });
    const changeFunctions = {
      name: setName,
      location: setLocation,
      edit: setEdit,
    };

    if (label in changeFunctions) {
      changeFunctions[label as keyof typeof changeFunctions](value);
    }
  }, []);
  const onConfirmClick = async () => {
    if (name.length === 0 || location.length === 0) {
      if (name.length === 0) {
        setErrorState({ ...errorState, name: true });
        return;
      }
      if (location.length === 0) {
        setErrorState({ ...errorState, location: true });
        return;
      }
    } else {
      const response = await updateBakery({
        accessToken: accessToken!!,
        bakeryId: bakeryId,
        content: edit,
        location: location,
        name: name,
      });
      console.log(response);

      if (response.status === 201) {
        editDoneBottomSheetRef.current?.expand();
      }
    }
  };

  return (
    <EditDetailComponent
      name={name}
      location={location}
      edit={edit}
      onChange={onChange}
      onConfirmClick={onConfirmClick}
      editDoneBottomSheetRef={editDoneBottomSheetRef}
      errorState={errorState}
    />
  );
}
