import React, { useCallback } from 'react';
import { Marker } from 'react-native-maps';

import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
import { flagColorHexColors } from '@/containers/Bookmark';
import { BreadCakeIcon, HeartIcon } from '@shared/Icons';
import IcHeart32 from '@shared/Icons/IcHeart32.svg';
import IcSelectedMapPin from '@shared/Icons/IcSelectedMapPin.svg';

type Props = {
  activeMarkerId?: number;
  bakeryMapEntity: BakeryMapBakeryEntity;
  onPress: (bakeryMapEntity?: BakeryMapBakeryEntity) => void;
  color?: string;
  markerIcon: 'default' | 'saved';
};

const DEFAULT_ICON_COLOR = '#FF6E40';

export const BakeryMarker: React.FC<Props> = React.memo(
  ({ activeMarkerId, bakeryMapEntity, onPress, color, markerIcon }) => {
    const isActive = bakeryMapEntity.id === activeMarkerId;

    const handlePress = useCallback(() => {
      if (isActive) {
        onPress();
        return;
      }

      onPress(bakeryMapEntity);
    }, [bakeryMapEntity, isActive, onPress]);

    if (markerIcon === 'saved') {
      const flagColor = color as keyof typeof flagColorHexColors;
      const iconColor = flagColorHexColors[flagColor];

      if (color === 'GRAY') {
        return (
          <Marker coordinate={bakeryMapEntity} onPress={handlePress}>
            {isActive ? <IcSelectedMapPin color={iconColor} /> : <BreadCakeIcon color={iconColor} />}
          </Marker>
        );
      }

      return (
        <Marker coordinate={bakeryMapEntity} onPress={handlePress}>
          {isActive ? <IcHeart32 color={iconColor} /> : <HeartIcon color={iconColor} />}
        </Marker>
      );
    }

    return (
      <Marker coordinate={bakeryMapEntity} onPress={handlePress}>
        {isActive ? <IcSelectedMapPin color={DEFAULT_ICON_COLOR} /> : <BreadCakeIcon color={DEFAULT_ICON_COLOR} />}
      </Marker>
    );
  }
);
