import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import NaverMapView, { NaverMapViewProps, Region } from 'react-native-nmap';
import { useSharedValue } from 'react-native-reanimated';
import { BakeryMapBakeryEntity, BakeryMapBakeryFilterEntity } from '@/apis/bakery/types';
import { BakeryMarker } from '../BakeryMarker';

type Props = NaverMapViewProps & {
  markers?: Array<BakeryMapBakeryEntity> | Array<BakeryMapBakeryFilterEntity>;
  onPressMarker: (mapBakeryEntity?: BakeryMapBakeryEntity) => void;
  selectedMarker?: BakeryMapBakeryEntity;
  isWatch: boolean;
  handleUserLocationChange: (coordinate: { longitude: number; latitude: number }) => void;
  markerIcon: 'default' | 'saved';
  initialRegion?: Region;
  onPanDrag: () => void;
  onRegionChange: (region: Region) => void;
};

export const BakeryMap = React.memo(
  React.forwardRef<NaverMapView, Props>(
    (
      {
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

      return (
        <NaverMapView
          ref={mapView}
          style={{ width: '100%', height: '100%' }}
          showsMyLocationButton={true}
          zoomControl={true}
          center={initialRegion ? { zoom: 14, ...initialRegion } : undefined}
          onTouch={onPanDrag}
          onCameraChange={e => {
            if (e.contentRegion) {
              onRegionChange({
                latitude: e.latitude,
                longitude: e.longitude,
                latitudeDelta: Math.abs(e.contentRegion[0].latitude - e.contentRegion[1].latitude),
                longitudeDelta: Math.abs(e.contentRegion[1].longitude - e.contentRegion[2].longitude),
              });
            }
          }}
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
        </NaverMapView>
      );
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
