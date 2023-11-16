import React, { useCallback } from 'react';

import { Marker } from 'react-native-nmap';
import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
import { flagColorHexColors } from '@/containers/Bookmark';
import { BreadCakeIcon, HeartIcon } from '@shared/Icons';
import IcMapSaveHeartSelected from '@shared/Icons/IcMapSaveHeartSelected.svg';
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
          <Marker
            coordinate={bakeryMapEntity}
            onClick={handlePress}
            width={isActive ? 38 : 16}
            height={isActive ? 42 : 18}
            caption={{ text: bakeryMapEntity.name.split(' ').join('\n') }}
            isHideCollidedCaptions
            isHideCollidedMarkers
            isHideCollidedSymbols
          >
            {isActive ? <IcSelectedMapPin color={iconColor} /> : <BreadCakeIcon color={iconColor} />}
          </Marker>
        );
      }

      return (
        <Marker
          coordinate={bakeryMapEntity}
          onClick={handlePress}
          width={isActive ? 38 : 16}
          height={isActive ? 42 : 18}
          caption={{ text: bakeryMapEntity.name.split(' ').join('\n') }}
          isHideCollidedCaptions
          isHideCollidedMarkers
          isHideCollidedSymbols
        >
          {isActive ? <IcMapSaveHeartSelected color={iconColor} /> : <HeartIcon color={iconColor} />}
        </Marker>
      );
    }

    return (
      <Marker
        coordinate={bakeryMapEntity}
        onClick={handlePress}
        width={isActive ? 38 : 16}
        height={isActive ? 42 : 18}
        caption={{ text: bakeryMapEntity.name.split(' ').join('\n') }}
        isHideCollidedCaptions
        isHideCollidedMarkers
        isHideCollidedSymbols
      >
        {isActive ? <IcSelectedMapPin color={DEFAULT_ICON_COLOR} /> : <BreadCakeIcon color={DEFAULT_ICON_COLOR} />}
      </Marker>
    );
  }
);
