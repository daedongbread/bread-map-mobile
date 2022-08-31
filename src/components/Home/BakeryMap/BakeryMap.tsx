import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { MapViewProps } from 'react-native-maps';

import { useSharedValue } from 'react-native-reanimated';
import { BakeryMarker } from '@/components/Home';
import { Coordinate } from '@/containers/Home/BakeryMapContainer';

const MIN_ZOOM_LEVEL = 17;
const MAX_ZOOM_LEVEL = 25;

type Props = MapViewProps & {
  markerCoordinates?: Array<Coordinate>;
  onPressMarker: (coordinate: Coordinate) => void;
  selectMarker: Coordinate | null;
  showMaker: boolean;
};

export const BakeryMap: React.FC<Props> = ({
  provider,
  initialRegion,
  markerCoordinates,
  onPressMarker,
  selectMarker,
  region,
  onRegionChange,
  showMaker,
}) => {
  const mapView = useRef<MapView>(null);
  const activeMarkerId = useSharedValue<number | null>(null);

  useEffect(() => {
    if (selectMarker) {
      activeMarkerId.value = selectMarker.id;
    }
  }, [activeMarkerId, selectMarker]);

  useEffect(() => {
    if (!mapView.current || !region) {
      return;
    }

    (async () => {
      const currentCamera = await mapView?.current?.getCamera();

      mapView?.current?.animateToRegion(region, 2000);
      mapView?.current?.animateCamera(
        {
          ...currentCamera,
          center: {
            ...currentCamera?.center,
            longitude: region.longitude,
            latitude: region.latitude,
          },
        },
        { duration: 2000 }
      );
    })();
  }, [region]);

  return (
    <MapView
      ref={mapView}
      provider={provider}
      initialRegion={initialRegion}
      style={styles.container}
      showsUserLocation
      onRegionChange={onRegionChange}
      maxZoomLevel={MAX_ZOOM_LEVEL}
      minZoomLevel={MIN_ZOOM_LEVEL}
    >
      {showMaker &&
        markerCoordinates?.map(coordinate => (
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
