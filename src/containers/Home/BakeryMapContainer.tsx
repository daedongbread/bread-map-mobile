import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { BakeryMap } from '@/components/Home/BakeryMap/BakeryMap';
import { BakeryMapOverlay } from '@/components/Home/BakeryMapOverlay/BakeryMapOverlay';
import { useGeolocation } from '@/hooks/useGeolocation';
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
  latitudeDelta: 0,
  longitudeDelta: 0,
};

export const BakeryMapContainer: React.FC = () => {
  const { navigate } = useNavigation();
  const { getLocation, currentPosition, watchLocation, clearWatch, isWatched } = useGeolocation();

  const [selectMarker, setSelectMarker] = useState<Coordinate | null>(null);
  const [showMaker, setShowMaker] = useState<boolean>(false);

  //TODO: 더미 데이터
  const markerCoordinates = [
    {
      id: 1,
      latitude: 37.6799006,
      longitude: 127.0549781,
    },
    {
      id: 2,
      latitude: 37.6798116,
      longitude: 127.0549781,
    },
  ];

  //TODO: 마커를 눌렀을때 액션 추가(바텀시트에 보인다?)
  const onPressMarker = useCallback((coordinate: Coordinate) => {
    setSelectMarker(coordinate);
  }, []);

  //TODO: add handle press icon
  const onPressFlagIcon = useCallback(() => {
    setShowMaker(prevState => !prevState);
  }, []);

  const onPressNavigationIcon = useCallback(() => {
    if (isWatched) {
      clearWatch();

      return;
    }

    watchLocation();
  }, [clearWatch, isWatched, watchLocation]);

  const onPressSearch = useCallback(() => {
    navigate('MainStack', {
      screen: 'Search',
    });
  }, [navigate]);

  const region = useMemo(() => ({ ...INITIAL_REGION, ...currentPosition }), [currentPosition]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return (
    <View style={styles.container}>
      <BakeryMap
        provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        markerCoordinates={markerCoordinates}
        onPressMarker={onPressMarker}
        selectMarker={selectMarker}
        region={region}
        showMaker={showMaker}
      />
      <BakeryMapOverlay
        onPressSearch={onPressSearch}
        onPressFlagIcon={onPressFlagIcon}
        onPressNavigationIcon={onPressNavigationIcon}
        isWatched={isWatched}
        showMaker={showMaker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
