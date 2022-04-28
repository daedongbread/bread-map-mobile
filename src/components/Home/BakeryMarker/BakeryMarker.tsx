import React, { useCallback, useEffect, useState } from 'react';
import { Marker, MarkerProps } from 'react-native-maps';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { resizePixel } from '@/utils';
import styled from '@emotion/native';
import { BreadCakeIcon } from '@shared/Icons';

const DEFAULT_ICON_SIZE = [
  {
    width: resizePixel(16),
    height: resizePixel(16),
  },
  {
    width: resizePixel(24),
    height: resizePixel(24),
  },
  {
    width: resizePixel(32),
    height: resizePixel(32),
  },
];

type Props = Pick<MarkerProps, 'coordinate'> & {
  onPress: () => void;
};

const BakeryMarker: React.FC<Props> = React.memo(({ coordinate, onPress }) => {
  const iconSize = useSharedValue(DEFAULT_ICON_SIZE[0]);

  const [toggle, setToggle] = useState(0);

  const animationStyle = useAnimatedStyle(() => ({
    width: withTiming(iconSize.value.width, {
      duration: 300,
      easing: Easing.bounce,
    }),
    height: withTiming(iconSize.value.height, {
      duration: 300,
      easing: Easing.bounce,
    }),
  }));

  const handlePress = useCallback(() => {
    setToggle(prev => (prev + 1) % 3);
    onPress();
  }, [onPress]);

  useEffect(() => {
    iconSize.value = DEFAULT_ICON_SIZE[toggle];
  }, [iconSize, toggle]);

  return (
    <Marker coordinate={coordinate} onPress={handlePress}>
      <IconStyle animatedProps={animationStyle} />
    </Marker>
  );
});

export { BakeryMarker };

const IconStyle = styled(BreadCakeIcon)`
  color: ${({ theme }) => theme.color.white};
`;
