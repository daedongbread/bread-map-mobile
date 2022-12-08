import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

import { BakeryDetailInfoContainer } from '@/containers/BakeryDetail/BakeryDetailInfoContainer';
import { BakeryMenuListContainer } from '@/containers/BakeryDetail/BakeryMenuListContainer';
import { BakeryReportContainer } from '@/containers/BakeryDetail/BakeryReportContainer';
import { BakeryReviewContainer } from '@/containers/BakeryDetail/BakeryReviewContainer';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';

// TODO: 일부 아이콘 변경 필요
const BakeryHome: React.FC<BakeryDetailTabScreenProps<'BakeryDetailHome'>> = ({ route, navigation }) => {
  const bakeryId = route.params.bakeryId;

  useEffect(() => {
    navigation.setParams({
      bakeryId,
    });
  }, [navigation, bakeryId]);

  return (
    <ScrollView>
      <BakeryDetailInfoContainer bakeryId={bakeryId} />
      <BakeryMenuListContainer bakeryId={bakeryId} />
      <BakeryReportContainer bakeryId={bakeryId} />
      <BakeryReviewContainer bakeryId={bakeryId} />
    </ScrollView>
  );
};

export { BakeryHome };
