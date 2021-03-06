import React from 'react';
import { Button, FlatList } from 'react-native';
import { bindHook } from '@/utils';
import styled from '@emotion/native';
import { BakeryCard } from '../BakeryCard';
import { useExample } from './useExample';

export const Example = bindHook(useExample, ({ moveFn, bakeries, loading }) => (
  <ExampleContainer>
    {loading && <LoadingText>Loading...</LoadingText>}
    <Button title="Detail 페이지로 넘기기(루엘드파리)" onPress={moveFn} />
    <FlatList data={bakeries} renderItem={({ item }) => <BakeryCard key={item.bakeryId} bakery={item} />} />
  </ExampleContainer>
));

const ExampleContainer = styled.View``;

const LoadingText = styled.Text`
  align-items: center;
  text-align: center;
  align-self: stretch;
`;
