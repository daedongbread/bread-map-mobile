import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';

import { BakeryMap } from '@/components/Home/BakeryMap';

export const BakeryMapContainer: React.FC = () => {
  //TODO: FIX
  const initialRegion = {
    latitude: 37.6799006,
    longitude: 127.0549781,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  //TODO: FIX
  const coordinate = {
    latitude: 37.6799006,
    longitude: 127.0549781,
  };

  //TODO: add handle press icon
  const handlePressIcon = useCallback(() => {}, []);

  return (
    <BakeryMap
      provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
      initialRegion={initialRegion}
      coordinate={coordinate}
      onPressIcon={handlePressIcon}
    />
  );
};
