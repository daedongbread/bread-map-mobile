import React, { useCallback } from 'react';
import { Marker } from 'react-native-maps';

import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
import { flagColorHexColors } from '@/containers/Bookmark';
import styled from '@emotion/native';
import { BreadCakeIcon, HeartIcon } from '@shared/Icons';
import IcHeart32 from '@shared/Icons/IcHeart32.svg';
import IcSelectedMapPin from '@shared/Icons/IcSelectedMapPin.svg';

type Props = {
  activeMarkerId?: number;
  bakeryMapEntity: BakeryMapBakeryEntity;
  onPress: (bakeryMapEntity?: BakeryMapBakeryEntity) => void;
  color?: string;
};

const BakeryMarker: React.FC<Props> = React.memo(({ activeMarkerId, bakeryMapEntity, onPress, color }) => {
  const isActive = bakeryMapEntity.id === activeMarkerId;

  const handlePress = useCallback(() => {
    if (isActive) {
      onPress();
      return;
    }

    onPress(bakeryMapEntity);
  }, [bakeryMapEntity, isActive, onPress]);

  if (color && color in flagColorHexColors) {
    const flagColor = color as keyof typeof flagColorHexColors;

    return (
      <Marker coordinate={bakeryMapEntity} onPress={handlePress}>
        {isActive ? (
          <IcHeart32 color={flagColorHexColors[flagColor]} />
        ) : (
          <HeartIcon color={flagColorHexColors[flagColor]} />
        )}
      </Marker>
    );
  }

  return (
    <Marker coordinate={bakeryMapEntity} onPress={handlePress}>
      {isActive ? <IcSelectedMapPin /> : <IconStyle />}
    </Marker>
  );
});

export { BakeryMarker };

const IconStyle = styled(BreadCakeIcon)`
  color: ${({ theme }) => theme.color.white};
`;
