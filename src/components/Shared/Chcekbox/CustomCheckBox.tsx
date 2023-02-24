import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { IcChecked, IcUnchecked } from '../Icons';

type Props = {
  value?: boolean;
  width?: number;
  height?: number;
  strokeWidth?: number;
  disabled?: boolean;
  onValueChange?: (value: boolean) => void;
};

export const CustomCheckBox = React.memo(({ value, disabled = false, onValueChange, ...rest }: Props) => {
  const [isChecked, setIsChecked] = useState(value);

  useDidMountEffect(() => {
    setIsChecked(value);
  }, [value]);

  const onPress = () => {
    if (disabled) {
      return;
    }

    if (onValueChange) {
      onValueChange(!isChecked);
    }

    setIsChecked(prev => !prev);
  };

  const icon = value ? <IcChecked {...rest} /> : <IcUnchecked {...rest} />;

  return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
});
