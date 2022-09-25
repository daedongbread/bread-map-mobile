import React, { useCallback } from 'react';
import { Marker } from 'react-native-maps';
import { Easing, useAnimatedStyle, withTiming, SharedValue } from 'react-native-reanimated';

import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
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
  bakeryMapEntity: BakeryMapBakeryEntity;
  onPress: (bakeryMapEntity?: BakeryMapBakeryEntity) => void;
};

const BakeryMarker: React.FC<Props> = React.memo(({ activeMarkerId, bakeryMapEntity, onPress }) => {
  const animationStyle = useAnimatedStyle(() => {
    const isActive = bakeryMapEntity.id === activeMarkerId.value;
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
    const isActive = bakeryMapEntity.id === activeMarkerId.value;

    if (isActive) {
      onPress();
      return;
    }

    onPress(bakeryMapEntity);
  }, [activeMarkerId.value, bakeryMapEntity, onPress]);

  return (
    <Marker coordinate={bakeryMapEntity} onPress={handlePress}>
      <IconStyle animatedProps={animationStyle} />
    </Marker>
  );
});

export { BakeryMarker };

const IconStyle = styled(BreadCakeIcon)`
  color: ${({ theme }) => theme.color.white};
`;
