import React, { useCallback } from 'react';
import { ReportBakeryOnboardingComponent } from '@/components/ReportBakery';
import { ReportBakeryStackScreenProps } from '@/pages/MainStack/ReportBakeryStack/Stack';
import { useNavigation } from '@react-navigation/native';

// const data = [
//   {
//     name: '루엘드파리',
//     nickname: '빵빵순빵빵순',
//     image: require('@/components/Shared/Images/sandwich.png'),
//   },
//   {
//     name: '서울빵집',
//     nickname: '빵순집순',
//     image: require('@/components/Shared/Images/sandwich.png'),
//   },
//   {
//     name: '안산빵집',
//     nickname: '빵돌이',
//     image: require('@/components/Shared/Images/sandwich.png'),
//   },
// ];

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
