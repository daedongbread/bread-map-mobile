import React, { useState, useCallback } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { EditProfileComponent } from '@/components/Profile';

export function EditProfileContainer() {
  const [name, setName] = useState('');
  const [curImage, setCurImage] = useState<string>('');

  const onChange = useCallback(({ name: label, value }) => {
    const changeFunctions = {
      name: setName,
    };

    if (label in changeFunctions) {
      changeFunctions[label as keyof typeof changeFunctions](value);
    }
  }, []);

  const onCameraClick = async () => {
    const { assets, didCancel } = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 100,
      maxWidth: 100,
      quality: 1,
    });
    if (didCancel) {
      return null;
    }
    if (assets) {
      setCurImage(assets[0]?.uri!!);
    }
  };

  return <EditProfileComponent name={name} onChange={onChange} onCameraClick={onCameraClick} curImage={curImage} />;
}
