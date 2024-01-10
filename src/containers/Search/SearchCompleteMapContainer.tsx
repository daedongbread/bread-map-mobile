import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { MapViewProps, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { BakeryMapBakeryEntity, BakeryMapBakeryFilterEntity } from '@/apis/bakery/types';
import { useGetBakeriesFilter } from '@/apis/bakery/useGetBakeriesFilter';
import { BakeryDTO } from '@/apis/search';
import { useSearchBakery } from '@/apis/search/useSearchBakery';
import { SearchCompleteMapBottomSheet } from '@/components/Search';
import { BakeryMap } from '@/components/Search/BakeryMap';
import { CloseIcon } from '@/components/Shared/Icons';
import { ListIcon } from '@/components/Shared/Icons/ListIcon';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Header } from '@/pages/MainStack/SearchStack';
import { RootRouteProps } from '@/pages/MainStack/SearchStack/Stack';
import { onSelectMarker, searchCurrentCameraLocation } from '@/slices/bakeryMap';
import { useNavigation, useRoute } from '@react-navigation/native';

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

export const SearchCompleteMapContainer = () => {
  const route = useRoute<RootRouteProps<'SearchCompleteMap'>>();
  const { keyword, latitude, longitude } = route.params;
  const [searchType, setSearchType] = useState('DISTANCE');
  const { data } = useSearchBakery({ keyword, latitude, longitude, searchType });

  const mapView = useRef<MapView>(null);

  const navigation = useNavigation();
  const { currentPositionRef, geolocationAuthorization, currentPosition } = useGeolocation();
  const [isWatched, setIsWatched] = useState(true);

  const dispatch = useAppDispatch();
  const { searchMapCameraLocation, selectedMarker, sort } = useAppSelector(select => select.bakeryMap);

  const [initialRegion, setInitialRegion] = useState<Region>();
  const [isFilterSaved, setIsFilterSaved] = useState<boolean>(false);
  const [cameraCoordinate, setCameraCoordinate] = useState<Region>();

  const { bakeries: bakeriesFilter } = useGetBakeriesFilter({
    sort,
    latitude: searchMapCameraLocation?.latitude,
    longitude: searchMapCameraLocation?.longitude,
    latitudeDelta: searchMapCameraLocation?.latitudeDelta,
    longitudeDelta: searchMapCameraLocation?.longitudeDelta,
  });

  const markerCoordinates: BakeryMapBakeryFilterEntity[] | undefined = bakeriesFilter;

  //TODO: 마커를 눌렀을때 액션 추가(바텀시트에 보인다?)
  const onPressMarker = useCallback(
    (bakeryEntity?: BakeryMapBakeryEntity) => {
      dispatch(onSelectMarker({ bakeryEntity }));
    },
    [dispatch]
  );

  const searchBakeriesWith = useCallback(
    (region: Region) => {
      dispatch(searchCurrentCameraLocation(region));
    },
    [dispatch]
  );

  const onPanDrag: MapViewProps['onPanDrag'] = useCallback(() => {
    setIsWatched(false);
  }, []);

  const onRegionChange: MapViewProps['onRegionChange'] = useCallback(
    region => {
      setCameraCoordinate(region);

      //   TODO: 빵집의 위도 경도 필요
      //   if (data?.searchResultDtoList?.length > 0) {
      //     data?.searchResultDtoList[0]
      //   }
    },
    [data]
  );

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

    if (data?.searchResultDtoList?.length) {
      setInitialRegion({
        latitude: data?.searchResultDtoList[0].latitude,
        longitude: data?.searchResultDtoList[0].longitude,
        latitudeDelta: 0.007820701277672981,
        longitudeDelta: 0.005,
      });
    }
  }, [currentPosition, geolocationAuthorization, initialRegion, data?.searchResultDtoList]);

  useEffect(() => {
    if (isWatched) {
      mapView.current?.animateCamera(getCameraProperty(currentPositionRef.current));
    }
  }, [currentPositionRef, isWatched]);

  const goListView = () => {
    navigation.navigate('SearchComplete', {
      keyword,
      latitude,
      longitude,
    });
  };

  const goHome = () => {
    navigation.navigate('MainTab');
  };

  const onDistanceSortingPress = () => {
    setSearchType('DISTANCE');
  };

  const onPopularSortingPress = () => {
    setSearchType('POPULAR');
  };

  const onClickBakery = useCallback(
    (bakery: BakeryDTO) => {
      const { bakeryId, bakeryName } = bakery;
      navigation.push('MainTab', {
        screen: 'HomeStack',
        params: {
          screen: 'Bakery',
          params: {
            screen: 'BakeryDetailHome',
            params: {
              bakeryId: bakery.bakeryId,
              bakeryName: bakery.bakeryName,
            },
          },
        },
      });
    },
    [navigation]
  );

  const onPressIcon = (bakery: BakeryDTO) => {
    const { bakeryId, bakeryName } = bakery;
    navigation.navigate('MainStack', {
      screen: 'BookmarkBottomSheet',
      params: {
        bakeryId,
        name: bakeryName,
      },
    });
  };

  const ListViewIcon = () => {
    return (
      <TouchableOpacity onPress={goListView}>
        <ListIcon />
      </TouchableOpacity>
    );
  };

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.closeIcon} onPress={goHome}>
        <CloseIcon />
      </TouchableOpacity>
    );
  };

  if (!data) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header value={keyword} isCompleted LeftIcon={ListViewIcon} RightIcon={RightIcon} />

      <View style={styles.container}>
        <BakeryMap
          ref={mapView}
          provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          markers={data?.searchResultDtoList || []}
          onPanDrag={onPanDrag}
          isWatch={isWatched}
          onRegionChange={onRegionChange}
          handleUserLocationChange={onUserLocationChange}
          markerIcon={isFilterSaved ? 'saved' : 'default'}
          onPress={onClickBakery}
        />
      </View>
      <SearchCompleteMapBottomSheet
        bakeries={data?.searchResultDtoList || []}
        onClickBakery={onClickBakery}
        onPressIcon={onPressIcon}
        onDistanceSortingPress={onDistanceSortingPress}
        onPopularSortingPress={onPopularSortingPress}
        searchType={searchType}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '70%',
  },
  closeIcon: {
    position: 'absolute',
    right: 20,
  },
});
