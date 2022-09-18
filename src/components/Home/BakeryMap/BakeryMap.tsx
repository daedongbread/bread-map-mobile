import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { MapViewProps } from 'react-native-maps';

import { useSharedValue } from 'react-native-reanimated';
import { BakeryMarker } from '@/components/Home';
import { Coordinate } from '@/containers/Home/BakeryMapContainer';

const MIN_ZOOM_LEVEL = 17;
const MAX_ZOOM_LEVEL = 25;

const ANIMATION_DURATION = 1000;

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
  const [zoomLevel, setZoomLevel] = useState({
    max: 20,
    min: 0,
  });
  const mapView = useRef<MapView>(null);
  const activeMarkerId = useSharedValue<number | null>(null);

  useEffect(() => {
    if (selectMarker) {
      activeMarkerId.value = selectMarker.id;
    }
  }, [activeMarkerId, selectMarker]);

  useEffect(() => {
    (async () => {
      if (!mapView.current || !region) {
        return;
      }

      const currentCamera = await mapView?.current?.getCamera();
      const isMoveImmediately =
        Math.abs(region.latitude - currentCamera.center.latitude) > 0.0001 ||
        Math.abs(region.longitude - currentCamera.center.longitude) > 0.0001;

      mapView.current.animateToRegion(region, ANIMATION_DURATION);
      mapView.current.animateCamera(
        {
          ...currentCamera,
          center: {
            ...currentCamera?.center,
            longitude: region.longitude,
            latitude: region.latitude,
          },
        },
        { duration: isMoveImmediately ? 0 : ANIMATION_DURATION }
      );
    })();
  }, [region]);

  useEffect(() => {
    setZoomLevel({
      max: MAX_ZOOM_LEVEL,
      min: MIN_ZOOM_LEVEL,
    });
  }, []);

  return (
    <MapView
      ref={mapView}
      provider={provider}
      initialRegion={initialRegion}
      style={styles.container}
      showsUserLocation
      followsUserLocation={false}
      onRegionChange={onRegionChange}
      maxZoomLevel={zoomLevel.max}
      minZoomLevel={zoomLevel.min}
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
