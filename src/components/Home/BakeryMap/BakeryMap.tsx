import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { MapViewProps } from 'react-native-maps';

import { useSharedValue } from 'react-native-reanimated';
import { BakeryMarker } from '@/components/Home';
import { Coordinate } from '@/containers/Home/BakeryMapContainer';

const MIN_ZOOM_LEVEL = 17;
const MAX_ZOOM_LEVEL = 25;

type Props = MapViewProps & {
  markerCoordinates: Array<Coordinate>;
  onPressMarker: (coordinate: Coordinate) => void;
  selectMarker: Coordinate | null;
};

export const BakeryMap: React.FC<Props> = ({
  provider,
  initialRegion,
  markerCoordinates,
  onPressMarker,
  selectMarker,
}) => {
  const activeMarkerId = useSharedValue<number | null>(null);

  useEffect(() => {
    if (selectMarker) {
      activeMarkerId.value = selectMarker.id;
    }
  }, [activeMarkerId, selectMarker]);

  return (
    <MapView
      provider={provider}
      initialRegion={initialRegion}
      minZoomLevel={MIN_ZOOM_LEVEL}
      maxZoomLevel={MAX_ZOOM_LEVEL}
      style={styles.container}
    >
      {markerCoordinates.map(coordinate => (
        <BakeryMarker
          key={coordinate.id}
          coordinate={coordinate}
          onPress={onPressMarker}
          activeMarkerId={activeMarkerId}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
