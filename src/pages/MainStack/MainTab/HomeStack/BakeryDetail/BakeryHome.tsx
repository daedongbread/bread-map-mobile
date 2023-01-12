import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

import {
  BakeryDetailInfoContainer,
  BakeryMenuBriefListContainer,
  BakeryReportContainer,
  BakeryReviewBriefListContainer,
} from '@/containers/BakeryDetail';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/BakeryDetailTopTab';

// TODO: 일부 아이콘 변경 필요
const BakeryHome: React.FC<BakeryDetailTabScreenProps<'BakeryDetailHome'>> = ({ navigation, route }) => {
  const bakeryId = route.params.bakeryId;
  useEffect(() => {
    navigation.setParams({
      bakeryId,
    });
  }, [navigation, bakeryId]);

  return (
    <ScrollView>
      <BakeryDetailInfoContainer bakeryId={bakeryId} />
      <BakeryMenuBriefListContainer bakeryId={bakeryId} />
      <BakeryReportContainer bakeryId={bakeryId} />
      <BakeryReviewBriefListContainer bakeryId={bakeryId} />
    </ScrollView>
  );
};

export { BakeryHome };
