import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { EventUserLocation, MapViewProps } from 'react-native-maps';

import { useSharedValue } from 'react-native-reanimated';
import { BakeryMapBakeryEntity, BakeryMapBakeryFilterEntity } from '@/apis/bakery/types';
import { BakeryMarker } from '../BakeryMarker';

type Props = MapViewProps & {
  markers?: Array<BakeryMapBakeryEntity> | Array<BakeryMapBakeryFilterEntity>;
  onPressMarker: (mapBakeryEntity?: BakeryMapBakeryEntity) => void;
  selectedMarker?: BakeryMapBakeryEntity;
  isWatch: boolean;
  handleUserLocationChange: (coordinate: { longitude: number; latitude: number }) => void;
  markerIcon: 'default' | 'saved';
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
        onPanDrag,
        isWatch,
        handleUserLocationChange,
        markerIcon,
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
          showsMyLocationButton={false}
          followsUserLocation={isWatch}
          onPanDrag={onPanDrag}
          onUserLocationChange={onUserLocationChange}
          zoomTapEnabled={false}
          onRegionChangeComplete={onRegionChange}
        >
          {markers?.map(marker => {
            return (
              <BakeryMarker
                key={marker.id}
                bakeryMapEntity={marker}
                onPress={onPressMarker}
                activeMarkerId={selectedMarker?.id}
                color={marker.color}
                markerIcon={markerIcon}
              />
            );
          })}
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
