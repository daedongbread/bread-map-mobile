import React from 'react';
import IcChecked from '@/components/Shared/Icons/IcChecked.svg';
import IcUnchecked from '@/components/Shared/Icons/IcUnchecked.svg';

type Props = {
  checked?: boolean;
};

export const Checkbox = ({ checked = false }: Props) => {
  if (checked) {
    return <IcChecked />;
  }

  return <IcUnchecked />;
};
