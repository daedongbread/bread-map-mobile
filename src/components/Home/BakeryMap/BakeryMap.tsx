import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { MapViewProps } from 'react-native-maps';

import { useSharedValue } from 'react-native-reanimated';
import { BakeryMarker } from '@/components/Home';
import { BakeryMapSearch } from '@/components/Home/BakeryMapSearch/BakeryMapSearch';
import { Coordinate } from '@/containers/Home/BakeryMapContainer';

import { FlagIcon, NavigationIcon } from '@shared/Icons';

const MIN_ZOOM_LEVEL = 17;
const MAX_ZOOM_LEVEL = 25;

type Props = MapViewProps & {
  markerCoordinates: Array<Coordinate>;
  onPressMarker: (coordinate: Coordinate) => void;
  searchValue: string;
  onChangeSearch: (text: string) => void;
  onPressFlagIcon: () => void;
  onPressNavigationIcon: () => void;
  selectMarker: Coordinate | null;
};

export const BakeryMap: React.FC<Props> = ({
  provider,
  initialRegion,
  markerCoordinates,
  onPressMarker,
  searchValue,
  onChangeSearch,
  onPressFlagIcon,
  onPressNavigationIcon,
  selectMarker,
}) => {
  const activeMarkerId = useSharedValue<number | null>(null);

  useEffect(() => {
    if (selectMarker) {
      activeMarkerId.value = selectMarker.id;
    }
  }, [activeMarkerId, selectMarker]);

  return (
    <View style={styles.container}>
      <MapView
        provider={provider}
        initialRegion={initialRegion}
        minZoomLevel={MIN_ZOOM_LEVEL}
        maxZoomLevel={MAX_ZOOM_LEVEL}
        style={styles.map}
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

      <View style={styles.overlayContainer}>
        <BakeryMapSearch searchValue={searchValue} onChangeSearch={onChangeSearch} />

        <View style={styles.iconsWrapper}>
          <View style={styles.iconButton}>
            <FlagIcon onPress={onPressFlagIcon} />
          </View>

          <View style={[styles.iconButton, styles.iconGap]}>
            <NavigationIcon onPress={onPressNavigationIcon} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlayContainer: {
    width: '100%',
    top: 60,
    paddingHorizontal: 20,
    position: 'absolute',
  },
  iconsWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  iconButton: {
    borderRadius: 44,
    backgroundColor: 'white',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGap: {
    marginTop: 12,
  },
});
