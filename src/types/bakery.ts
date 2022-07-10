import { BakeryInfo, BakeryMenu, BakeryReview } from '@/utils';

// ** BakeryDetail tab route types **
export type Bakery = {
  bakeryMenu: BakeryMenu[];
  bakeryReviews: BakeryReview[];
  bakeryInfo: BakeryInfo;
};
