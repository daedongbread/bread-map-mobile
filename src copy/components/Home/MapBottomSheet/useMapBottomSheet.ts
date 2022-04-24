import { useCallback, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

const useMapButtonSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    // TODO: 높이 변경시 함수 동작
    index;
  }, []);

  return { bottomSheetRef, snapPoints, handleSheetChanges };
};

export { useMapButtonSheet };
