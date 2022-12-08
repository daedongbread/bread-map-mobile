import React, { useState, useCallback } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
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

  const getAlbum = () => {
    ImageCropPicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
    }).then(image => {
      setCurImage(image.path);
    });
  };

  return <EditProfileComponent name={name} onChange={onChange} onCameraClick={getAlbum} curImage={curImage} />;
}
