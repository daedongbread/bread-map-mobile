import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { EventUserLocation, MapViewProps } from 'react-native-maps';

import { useSharedValue } from 'react-native-reanimated';
import { BakeryMarker } from '@/components/Home';
import { Coordinate } from '@/containers/Home/BakeryMapContainer';

type Props = MapViewProps & {
  markerCoordinates?: Array<Coordinate>;
  onPressMarker: (coordinate: Coordinate) => void;
  selectMarker: Coordinate | null;
  showMaker: boolean;
  isWatch: boolean;
  handleUserLocationChange: (coordinate: { longitude: number; latitude: number }) => void;
};

export const BakeryMap = React.forwardRef<MapView, Props>(
  (
    {
      provider,
      initialRegion,
      markerCoordinates,
      onPressMarker,
      selectMarker,
      onRegionChange,
      showMaker,
      onPanDrag,
      isWatch,
      handleUserLocationChange,
    },
    mapView
  ) => {
    const activeMarkerId = useSharedValue<number | null>(null);

    useEffect(() => {
      if (selectMarker) {
        activeMarkerId.value = selectMarker.id;
      }
    }, [activeMarkerId, selectMarker]);

    const onUserLocationChange = (e: EventUserLocation) => {
      const { coordinate } = e.nativeEvent;

      handleUserLocationChange(coordinate);
    };

    return (
      <MapView
        ref={mapView}
        provider={provider}
        initialRegion={initialRegion}
        style={styles.container}
        showsUserLocation
        followsUserLocation={isWatch}
        onPanDrag={onPanDrag}
        onUserLocationChange={onUserLocationChange}
        zoomTapEnabled={false}
        onRegionChangeComplete={onRegionChange}
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
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
