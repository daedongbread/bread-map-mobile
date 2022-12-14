import React from 'react';
import { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

type Props = BottomSheetBackdropProps & {
  behavior?: string;
};

export function BackdropComponent(props: Props) {
  return (
    <BottomSheetBackdrop
      {...props}
      style={[props.style]}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.5}
      pressBehavior={props?.behavior === 'none' ? 'none' : 'close'}
    />
  );
}
