import React, { useCallback } from 'react';
import { Marker } from 'react-native-maps';
import { Easing, useAnimatedStyle, withTiming, SharedValue } from 'react-native-reanimated';

import { Coordinate } from '@/containers/Home/BakeryMapContainer';
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
];

type Props = {
  activeMarkerId: SharedValue<number | null>;
  coordinate: Coordinate;
  onPress: (coordinate: Coordinate) => void;
};

const BakeryMarker: React.FC<Props> = React.memo(({ activeMarkerId, coordinate, onPress }) => {
  const animationStyle = useAnimatedStyle(() => {
    const isActive = coordinate.id === activeMarkerId.value;

    const { width, height } = isActive ? DEFAULT_ICON_SIZE[1] : DEFAULT_ICON_SIZE[0];

    return {
      width: withTiming(width, {
        duration: 300,
        easing: Easing.bounce,
      }),
      height: withTiming(height, {
        duration: 300,
        easing: Easing.bounce,
      }),
    };
  });

  const handlePress = useCallback(() => {
    onPress(coordinate);
  }, [coordinate, onPress]);

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
