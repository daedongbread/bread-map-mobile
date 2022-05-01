import React, { useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import MapView, { MapViewProps } from 'react-native-maps';

import { useSharedValue } from 'react-native-reanimated';
import { BakeryMarker } from '@/components/Home';
import { Coordinate } from '@/containers/Home/BakeryMapContainer';

import { theme } from '@/styles/theme';
import { resizePixel } from '@/utils';
import { FlagIcon, NavigationIcon, SearchIcon } from '@shared/Icons';

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
    <View style={styles.wrapper}>
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

      <View style={styles.overlayWrapper}>
        <View style={styles.searchInputWrapper}>
          <View style={styles.searchIconWrapper}>
            <SearchIcon />
          </View>

          <TextInput
            value={searchValue}
            onChangeText={onChangeSearch}
            placeholder={'빵집을 검색해보세요'}
            placeholderTextColor={theme.color.gray500}
            style={styles.searchTextInput}
          />
        </View>

        <View style={styles.iconsWrapper}>
          <View style={styles.iconWrapper}>
            <FlagIcon onPress={onPressFlagIcon} />
          </View>

          <View style={[styles.iconWrapper, styles.iconGap]}>
            <NavigationIcon onPress={onPressNavigationIcon} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlayWrapper: {
    width: '100%',
    top: 60,
    paddingHorizontal: 20,
    position: 'absolute',
  },
  searchInputWrapper: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    borderRadius: 8,
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  searchIconWrapper: {
    marginRight: 10,
  },
  searchTextInput: {
    fontSize: resizePixel(14),
    fontWeight: 'bold',
  },
  iconsWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  iconWrapper: {
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
