import React from 'react';
import { ScrollView } from 'react-native';

import {
  BakeryDetailInfoContainer,
  BakeryMenuBriefListContainer,
  BakeryRatingContainer,
  BakeryReviewBriefListContainer,
} from '@/containers/BakeryDetail/BakeryHome';

export const BakeryHome = () => {
  return (
    <ScrollView>
      <BakeryDetailInfoContainer />
      <BakeryMenuBriefListContainer />
      <BakeryRatingContainer />
      <BakeryReviewBriefListContainer />
    </ScrollView>
  );
};
