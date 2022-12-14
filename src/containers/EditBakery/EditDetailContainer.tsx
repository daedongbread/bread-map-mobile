import React, { useState, useCallback } from 'react';
import { EditDetailComponent } from '@/components/EditBakery';

export function EditDetailContainer() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [edit, setEdit] = useState('');

  const onChange = useCallback(({ name: label, value }) => {
    const changeFunctions = {
      name: setName,
      location: setLocation,
      edit: setEdit,
    };

    if (label in changeFunctions) {
      changeFunctions[label as keyof typeof changeFunctions](value);
    }
  }, []);
  return <EditDetailComponent name={name} location={location} edit={edit} onChange={onChange} />;
}
