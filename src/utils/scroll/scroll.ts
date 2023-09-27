import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export const isCloseToBottom = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const paddingToBottom = 500;
  if (event.nativeEvent.contentOffset.y <= 0) {
    return false;
  }

  return (
    event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >=
    event.nativeEvent.contentSize.height - paddingToBottom
  );
};
