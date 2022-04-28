import React from 'react';
import { MapBottomSheet } from '@/components/Home';
import { BakeryMapContainer } from '@/containers/Home/BakeryMapContainer';
import { RootStackScreenProps } from '@/router';
import { bakeryMenu, bakeryReviews, bakeryInfo } from '@/utils';
import styled from '@emotion/native';

const bakeryData = { bakeryMenu, bakeryReviews, bakeryInfo };

const Home: React.FC<RootStackScreenProps<'Home'>> = ({ route, navigation }) => (
  <MapWrapper>
    <BakeryMapContainer />
    <MapBottomSheet
      moveFn={() => {
        navigation.navigate('BakeryDetail', {
          screen: 'BakeryDetailHome',
          params: {
            ...bakeryData,
          },
        });
      }}
    />
  </MapWrapper>
);

export { Home };

const MapWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary500};
`;
