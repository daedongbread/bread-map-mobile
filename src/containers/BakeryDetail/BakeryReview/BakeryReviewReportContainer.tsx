import React from 'react';
import { BakeryReviewReportComponent } from '@/components/BakeryDetail/BakeryReview';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';

export const BakeryReviewReportContainer = () => {
  const { bakery } = useBakeryDetail();

  return <BakeryReviewReportComponent bakery={bakery} />;
};
