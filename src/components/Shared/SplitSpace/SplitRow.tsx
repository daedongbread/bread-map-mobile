import React from 'react';
import styled from '@emotion/native';

interface Prop {
  height: number;
}

export const SplitRow = ({ height }: Prop) => {
  return <Container height={height} />;
};

const Container = styled.View<{ height: number }>`
  height: ${props => props.height}px;
`;
