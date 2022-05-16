import React from 'react';

import { BakeryBottomSheetContainer, BakeryMapContainer } from '@/containers/Home';

import { RootStackScreenProps } from '@/router';

import styled from '@emotion/native';

const Home: React.FC<RootStackScreenProps<'Home'>> = () => (
  <HomeContainer>
    <BakeryMapContainer />
    <BakeryBottomSheetContainer />
  </HomeContainer>
);

export { Home };

const HomeContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary500};
`;
