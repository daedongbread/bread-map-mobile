import React from 'react';
import { BakeryDetailTabScreenProps } from '@/router';
import { bindHook } from '@/utils';
import styled from '@emotion/native';
import { Reviews } from '@shared/Reviews';
import Divider from '../Divider';
import { TabHeader } from '../TabHeader';
import { useReviewSection } from './useReviewSection';

const ReviewSection: React.FC<BakeryDetailTabScreenProps<'BakeryDetailReview'>> = bindHook(
  useReviewSection,
  ({ bakeryReviews }) => {
    return (
      <Container>
        <Divider />
        <TabHeader title={'리뷰'} totalCount={bakeryReviews.length} addBtnText={'리뷰 작성'} />
        <Reviews reviews={bakeryReviews} />
      </Container>
    );
  }
);

export { ReviewSection };

const Container = styled.View`
  background-color: white;
`;
