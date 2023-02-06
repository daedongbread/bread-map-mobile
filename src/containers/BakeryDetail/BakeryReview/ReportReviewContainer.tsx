import React from 'react';
import { ReportReviewComponent } from '@/components/BakeryDetail/BakeryReview';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';

export const ReportReviewContainer = () => {
  const { bakery } = useBakeryDetail();

  return <ReportReviewComponent bakery={bakery} />;
};
