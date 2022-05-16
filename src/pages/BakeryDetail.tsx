import React from 'react';
import { InfoSection } from '@/components/BakeryDetail';
import styled from '@emotion/native';

const info = {
  address: '서울 서초구 서초중앙로 18',
  bakeryId: 5,
  bakeryName: '루엘드파리',
  basicInfoList: ['PET', 'WIFI', 'PARKING', 'DELIVERY', 'SHIPPING'],
  businessHour: '매일 08:00 ~ 21:00',
  telNumber: '02-322-0939',
  websiteUrlList: ['https://smartstore.naver.com/ruelledeparis'],
};

// TODO: 구조 고민
// tab navigator로 인해 여기는 쓰이지 않는다.
// components > BakeryDetail를 pages > BakeryDetail 폴더를 만들어서 옮겨야 할지 고민
const BakeryDetail = () => (
  <Container>
    {/* <MenuSection bakeryMenu={bakeryMenu} /> */}
    {/* <ReviewSection reviews={reviews} /> */}
    <InfoSection  />
  </Container>
);

export { BakeryDetail };

const Container = styled.SafeAreaView`
  flex: 1;
`;
