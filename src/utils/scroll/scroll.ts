import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export const isCloseToBottom = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const paddingToBottom = 20;
  return (
    event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >=
    event.nativeEvent.contentSize.height - paddingToBottom
  );
};
