import React from 'react';
import { Platform } from 'react-native';
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapBottomSheet, BakeryMarker } from '@/components/Home';
import { RootStackParamList, RootStackScreenProps } from '@/router';
import { bakeryMenu, bakeryReviews, bakeryInfo } from '@/utils';
import styled from '@emotion/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const bakeryData = { bakeryMenu, bakeryReviews, bakeryInfo };

const Home: React.FC<RootStackScreenProps<'Home'>> = ({ route, navigation }) => (
  <MapContainer>
    <Map
      provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 37.6799006,
        longitude: 127.0549781,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      minZoomLevel={17}
      maxZoomLevel={25}
    >
      <BakeryMarker
        coord={{
          latitude: 37.6799006,
          longitude: 127.0549781,
        }}
      />
    </Map>
    <MapBottomSheet
      start={50}
      moveFn={() => {
        navigation.navigate('BakeryDetail', {
          screen: 'BakeryDetailHome',
          params: {
            ...bakeryData,
          },
        });
      }}
    />
  </MapContainer>
);

export { Home };

const MapContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary500};
`;

const Map = styled(MapView)`
  flex: 1;
`;
