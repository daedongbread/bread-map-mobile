import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { EventUserLocation, MapViewProps, Marker } from 'react-native-maps';
import { BakeryDTO } from '@/apis/search';
import { Text } from '@/components/Shared/Text';
import IcSelectedMapPin from '@shared/Icons/IcSelectedMapPin.svg';

type Props = MapViewProps & {
  markers?: Array<BakeryDTO>;
  isWatch: boolean;
  handleUserLocationChange: (coordinate: { longitude: number; latitude: number }) => void;
  markerIcon: 'default' | 'saved';
  onPressMarker: (bakery: BakeryDTO) => void;
};
const DEFAULT_ICON_COLOR = '#FF6E40';

export const BakeryMap = React.memo(
  React.forwardRef<MapView, Props>(
    (
      { provider, initialRegion, markers, onRegionChange, onPanDrag, isWatch, handleUserLocationChange, onPressMarker },
      mapView
    ) => {
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
              <Marker coordinate={marker} onPress={() => onPressMarker(marker)}>
                <View style={{ alignItems: 'center' }}>
                  <IcSelectedMapPin color={DEFAULT_ICON_COLOR} />

                  <Text presets={'caption2'}>{marker.bakeryName}</Text>
                </View>
              </Marker>
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
