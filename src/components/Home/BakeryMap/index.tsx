import React, { ComponentProps, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { MapViewProps } from 'react-native-maps';

import { BakeryMarker } from '@/components/Home';

const MIN_ZOOM_LEVEL = 17;
const MAX_ZOOM_LEVEL = 25;

type Props = MapViewProps &
  Pick<ComponentProps<typeof BakeryMarker>, 'coordinate'> & {
    onPressIcon: () => void;
  };

export const BakeryMap: React.FC<Props> = ({ provider, initialRegion, coordinate, onPressIcon }) => {
  const handlePressIcon = useCallback(() => {
    onPressIcon();
  }, [onPressIcon]);

  return (
    <MapView
      provider={provider}
      initialRegion={initialRegion}
      minZoomLevel={MIN_ZOOM_LEVEL}
      maxZoomLevel={MAX_ZOOM_LEVEL}
      style={styles.map}
    >
      <BakeryMarker coordinate={coordinate} onPress={handlePressIcon} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
