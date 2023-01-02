import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

import { BakeryDetailInfoContainer } from '@/containers/BakeryDetail/BakeryDetailInfoContainer';
import { BakeryReportContainer } from '@/containers/BakeryDetail/BakeryReportContainer';
import { BakeryMenuBriefListContainer } from '@/containers/BakeryDetail/Home/BakeryMenuBriefListContainer';
import { BakeryReviewBriefListContainer } from '@/containers/BakeryDetail/Home/BakeryReviewBriefListContainer';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/BakeryDetailTopTab';

// TODO: 일부 아이콘 변경 필요
const BakeryHome: React.FC<BakeryDetailTabScreenProps<'BakeryDetailHome'>> = ({ navigation }) => {
  const bakeryId = 30300001400004;

  useEffect(() => {
    navigation.setParams({
      bakeryId,
    });
  }, [navigation, bakeryId]);

  return (
    <ScrollView style={{ height: '100%' }}>
      <BakeryDetailInfoContainer bakeryId={bakeryId} />
      <BakeryMenuBriefListContainer bakeryId={bakeryId} />
      <BakeryReportContainer bakeryId={bakeryId} />
      <BakeryReviewBriefListContainer bakeryId={bakeryId} />
    </ScrollView>
  );
};

export { BakeryHome };
