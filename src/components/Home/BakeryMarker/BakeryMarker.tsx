import React, { useCallback } from 'react';
import { Marker } from 'react-native-maps';

import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
import styled from '@emotion/native';
import { BreadCakeIcon } from '@shared/Icons';
import IcSelectedMapPin from '@shared/Icons/IcSelectedMapPin.svg';

type Props = {
  activeMarkerId?: number;
  bakeryMapEntity: BakeryMapBakeryEntity;
  onPress: (bakeryMapEntity?: BakeryMapBakeryEntity) => void;
};

const BakeryMarker: React.FC<Props> = React.memo(({ activeMarkerId, bakeryMapEntity, onPress }) => {
  const isActive = bakeryMapEntity.id === activeMarkerId;

  const handlePress = useCallback(() => {
    if (isActive) {
      onPress();
      return;
    }

    onPress(bakeryMapEntity);
  }, [bakeryMapEntity, isActive, onPress]);

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
