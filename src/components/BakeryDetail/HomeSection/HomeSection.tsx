import React from 'react';
import { Text } from 'react-native';
import { BakeryDetailTabScreenProps } from '@/router';
import { bindHook } from '@/utils';
import styled from '@emotion/native';
import Divider from '../Divider';
import { useHomeSection } from './useHomeSection';

const HomeSection: React.FC<BakeryDetailTabScreenProps<'BakeryDetailHome'>> = bindHook(useHomeSection, ({ bakery }) => {
  return (
    <Container>
      <Divider />
      <Text>{bakery?.bakeryReviews[0].contents}</Text>
    </Container>
  );
});

export { HomeSection };

const Container = styled.View`
  background-color: white;
`;
