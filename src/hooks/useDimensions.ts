import { setDimensions } from '@/slices/dimensions';
import { WINDOW_WIDTH } from '@/utils/constants/dimensions';
import { useAppDispatch, useAppSelector } from './redux';

export const useDimensions = () => {
  const dispatch = useAppDispatch();
  const { width, height } = useAppSelector(selector => selector.dimensions);

  const setWindowHeight = (_height: number) => {
    dispatch(
      setDimensions({
        width: WINDOW_WIDTH,
        height: _height,
      })
    );
  };

  return {
    width,
    height,
    setWindowHeight,
  };
};
