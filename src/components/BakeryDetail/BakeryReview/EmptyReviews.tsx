import React from 'react';
import { Image } from 'react-native';
import styled from '@emotion/native';
const EmptyReviews: React.FC = () => {
  return (
    <Base>
      <Image source={require('@/components/Shared/Images/empty.png')} width={20} />
      <EmptyText>등록된 리뷰가 없어요</EmptyText>
    </Base>
  );
};

export { EmptyReviews };

const Base = styled.View`
  flex: 1;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const EmptyText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #9e9e9e;
  margin-top: 16px;
`;
