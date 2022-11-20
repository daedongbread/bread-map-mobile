import React from 'react';
import { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

export function BackdropComponent(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      style={[props.style]}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.5}
      pressBehavior="close"
    />
  );
}
