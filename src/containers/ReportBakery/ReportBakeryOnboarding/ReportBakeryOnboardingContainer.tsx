import React, { useCallback } from 'react';
import { ReportBakeryOnboardingComponent } from '@/components/ReportBakery';
import { ReportBakeryStackScreenProps } from '@/pages/MainStack/ReportBakeryStack/Stack';
import { useNavigation } from '@react-navigation/native';

const ReportBakeryOnboardingContainer: React.FC = () => {
  const navigation = useNavigation<ReportBakeryStackScreenProps<'ReportBakeryOnboard'>['navigation']>();

  const closePage = () => {
    navigation.pop();
  };

  const onNavReport = useCallback(() => {
    navigation.navigate('ReportBakery');
  }, [navigation]);

  return <ReportBakeryOnboardingComponent closePage={closePage} onPressReport={onNavReport} />;
};

export { ReportBakeryOnboardingContainer };
