import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { EventUserLocation, MapViewProps } from 'react-native-maps';

import { useSharedValue } from 'react-native-reanimated';
import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
import { BakeryMarker } from '@/components/Home';

type Props = MapViewProps & {
  markers?: Array<BakeryMapBakeryEntity>;
  onPressMarker: (mapBakeryEntity?: BakeryMapBakeryEntity) => void;
  selectedMarker?: BakeryMapBakeryEntity;
  showMaker: boolean;
  isWatch: boolean;
  handleUserLocationChange: (coordinate: { longitude: number; latitude: number }) => void;
};

export const BakeryMap = React.memo(
  React.forwardRef<MapView, Props>(
    (
      {
        provider,
        initialRegion,
        markers,
        onPressMarker,
        selectedMarker,
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
        if (selectedMarker) {
          activeMarkerId.value = selectedMarker.id;
        } else {
          activeMarkerId.value = null;
        }
      }, [activeMarkerId, selectedMarker]);

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
          {showMaker
            ? markers?.map(marker => (
                <BakeryMarker
                  key={marker.id}
                  bakeryMapEntity={marker}
                  onPress={onPressMarker}
                  activeMarkerId={activeMarkerId}
                />
              ))
            : markers?.map(marker => (
                <BakeryMarker
                  key={marker.id}
                  bakeryMapEntity={marker}
                  onPress={onPressMarker}
                  activeMarkerId={activeMarkerId}
                />
              ))}
        </MapView>
      );
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
