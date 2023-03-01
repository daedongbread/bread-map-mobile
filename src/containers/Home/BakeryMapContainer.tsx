import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MapView, { MapViewProps, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetBakeries } from '@/apis';
import { BakeryMapBakeryEntity, BakeryMapBakeryFilterEntity } from '@/apis/bakery/types';
import { useGetBakeriesFilter } from '@/apis/bakery/useGetBakeriesFilter';
import { BakeryMap } from '@/components/Home/BakeryMap/BakeryMap';
import { BakeryMapOverlay } from '@/components/Home/BakeryMapOverlay/BakeryMapOverlay';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useGeolocation } from '@/hooks/useGeolocation';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { onClearMarker, onSelectMarker, searchCurrentCameraLocation } from '@/slices/bakeryMap';
import { useNavigation } from '@react-navigation/native';

//TODO: API 문서에 나오는 데이터 타입으로 수정
export type Coordinate = {
  id: number;
  latitude: number;
  longitude: number;
};

//TODO: 현재 위치 정보를 받아와야함
const INITIAL_REGION: Region = {
  latitude: 37.6799006,
  longitude: 127.0549781,
  latitudeDelta: 0.007820701277672981,
  longitudeDelta: 0.005,
};

const getRegion = (position?: { latitude: number; longitude: number }) => {
  return {
    ...INITIAL_REGION,
    ...position,
  };
};

const getCameraProperty = (coordinate?: { latitude: number; longitude: number }) => {
  const { longitude, latitude } = coordinate || INITIAL_REGION;

  return {
    zoom: 14,
    altitude: 1000,
    center: {
      longitude,
      latitude,
    },
  };
};

export const BakeryMapContainer: React.FC = () => {
  const mapView = useRef<MapView>(null);

  const { navigate } = useNavigation<HomeStackScreenProps<'Home'>['navigation']>();
  const { currentPositionRef, geolocationAuthorization, currentPosition } = useGeolocation();
  const { top: topInsets } = useSafeAreaInsets();
  const [isWatched, setIsWatched] = useState(true);

  const dispatch = useAppDispatch();
  const { searchMapCameraLocation, selectedMarker, sort } = useAppSelector(select => select.bakeryMap);

  const [initialRegion, setInitialRegion] = useState<Region>();
  const [isFilterSaved, setIsFilterSaved] = useState<boolean>(false);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [cameraCoordinate, setCameraCoordinate] = useState<Region>();

  const { bakeries } = useGetBakeries({
    sort,
    latitude: searchMapCameraLocation?.latitude,
    longitude: searchMapCameraLocation?.longitude,
    latitudeDelta: searchMapCameraLocation?.latitudeDelta,
    longitudeDelta: searchMapCameraLocation?.longitudeDelta,
  });

  const { bakeries: bakeriesFilter } = useGetBakeriesFilter({
    filter: isFilterSaved,
    sort,
    latitude: searchMapCameraLocation?.latitude,
    longitude: searchMapCameraLocation?.longitude,
    latitudeDelta: searchMapCameraLocation?.latitudeDelta,
    longitudeDelta: searchMapCameraLocation?.longitudeDelta,
  });

  const markerCoordinates: BakeryMapBakeryFilterEntity[] | BakeryMapBakeryEntity[] | undefined = isFilterSaved
    ? bakeriesFilter
    : bakeries;

  //TODO: 마커를 눌렀을때 액션 추가(바텀시트에 보인다?)
  const onPressMarker = useCallback(
    (bakeryEntity?: BakeryMapBakeryEntity) => {
      dispatch(onSelectMarker({ bakeryEntity }));
    },
    [dispatch]
  );

  //TODO: add handle press icon
  const onPressFlagIcon = useCallback(() => {
    setIsFilterSaved(prevState => !prevState);
  }, []);

  const onPressNavigationIcon = useCallback(() => {
    setIsWatched(prev => !prev);
  }, []);

  const onPressSearch = useCallback(() => {
    navigate('MainStack', {
      screen: 'Search',
    });
  }, [navigate]);

  const searchBakeriesWith = useCallback(
    (region: Region) => {
      dispatch(searchCurrentCameraLocation(region));
    },
    [dispatch]
  );

  const onPanDrag: MapViewProps['onPanDrag'] = useCallback(() => {
    setIsWatched(false);
    setShowSearchButton(true);
  }, []);

  const onRegionChange: MapViewProps['onRegionChange'] = useCallback(region => {
    setCameraCoordinate(region);
  }, []);

  const onPressSearchButton = useCallback(() => {
    if (!cameraCoordinate) {
      return;
    }

    dispatch(onClearMarker());
    searchBakeriesWith(cameraCoordinate);

    setShowSearchButton(false);
  }, [cameraCoordinate, dispatch, searchBakeriesWith]);

  const onUserLocationChange = useCallback(
    (coordinate: { longitude: number; latitude: number }) => {
      if (!mapView?.current || !isWatched) {
        return;
      }

      if (!searchMapCameraLocation) {
        searchBakeriesWith(getRegion(coordinate));
      }
    },
    [isWatched, searchBakeriesWith, searchMapCameraLocation]
  );

  useEffect(() => {
    if (initialRegion) {
      return;
    }

    if (geolocationAuthorization === 'denied') {
      setInitialRegion(INITIAL_REGION);
      return;
    }

    if (currentPosition) {
      setInitialRegion(getRegion(currentPosition));
    }
  }, [currentPosition, geolocationAuthorization, initialRegion]);

  useEffect(() => {
    if (isWatched) {
      mapView.current?.animateCamera(getCameraProperty(currentPositionRef.current));
    }
  }, [currentPositionRef, isWatched]);

  return (
    <View style={styles.container}>
      <BakeryMap
        ref={mapView}
        provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        markers={markerCoordinates}
        onPressMarker={onPressMarker}
        selectedMarker={selectedMarker}
        onPanDrag={onPanDrag}
        isWatch={isWatched}
        onRegionChange={onRegionChange}
        handleUserLocationChange={onUserLocationChange}
        markerIcon={isFilterSaved ? 'saved' : 'default'}
      />

      <BakeryMapOverlay
        topInsets={topInsets}
        onPressSearch={onPressSearch}
        onPressFlagIcon={onPressFlagIcon}
        onPressNavigationIcon={onPressNavigationIcon}
        isWatched={isWatched}
        isFilterSaved={isFilterSaved}
        showSearchButton={showSearchButton}
        onPressSearchButton={onPressSearchButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '70%',
  },
});
