import React, { useCallback, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';

import { BakeryMap } from '@/components/Home/BakeryMap/BakeryMap';
import { BakeryMapOverlay } from '@/components/Home/BakeryMapOverlay/BakeryMapOverlay';

//TODO: API 문서에 나오는 데이터 타입으로 수정
export type Coordinate = {
  id: number;
  latitude: number;
  longitude: number;
};

export const BakeryMapContainer: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectMarker, setSelectMarker] = useState<Coordinate | null>(null);

  //TODO: 현재 위치 정보를 받아와야함
  const initialRegion = {
    latitude: 37.6799006,
    longitude: 127.0549781,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

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
  const onPressFlagIcon = useCallback(() => {}, []);
  const onPressNavigationIcon = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <BakeryMap
        provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        markerCoordinates={markerCoordinates}
        onPressMarker={onPressMarker}
        selectMarker={selectMarker}
      />
      <BakeryMapOverlay
        searchValue={searchValue}
        onChangeSearch={setSearchValue}
        onPressFlagIcon={onPressFlagIcon}
        onPressNavigationIcon={onPressNavigationIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
