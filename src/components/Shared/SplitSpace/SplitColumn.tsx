import React from 'react';
import styled from '@emotion/native';

interface Prop {
  width: number;
}

export const SplitColumn = ({ width }: Prop) => {
  return <Container width={width} />;
};

const Container = styled.View<{ width: number }>`
  width: ${props => props.width}px;
`;
