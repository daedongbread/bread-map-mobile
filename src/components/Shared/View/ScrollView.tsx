import React, { PropsWithChildren } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollViewProps } from 'react-native';
import { ScrollView as OriginScrollView } from 'react-native';
import { isCloseToBottom } from '@/utils/scroll/scroll';

type Props = ScrollViewProps & {
  onScrollEnd?: () => void;
};

/**
 * 해당 컴포넌트는 react-native의 <ScrollView /> 컴포넌트를 Override 합니다.
 * @param onScrollEnd
 */
export const ScrollView = React.memo(({ onScrollEnd, children, ...rest }: PropsWithChildren<Props>) => {
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(event) && onScrollEnd) {
      onScrollEnd();
    }
  };

  return (
    <OriginScrollView onScrollEndDrag={onScroll} scrollEventThrottle={400} {...rest}>
      {children}
    </OriginScrollView>
  );
});
