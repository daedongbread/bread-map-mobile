import React from 'react';
import { TermsComponent } from '@/components/Terms';
import { RootStackScreenProps } from '@/pages/Stack';

type Navigation = RootStackScreenProps<'Onboarding'>['navigation'];

export type Terms = {
  key?: string;
  value: string;
  isRequire: boolean;
};

const terms: Terms[] = [
  {
    value: '서비스 이용약관 동의',
    isRequire: true,
  },
  {
    value: '개인정보 수집 및 이용 동의',
    isRequire: true,
  },
  {
    value: '마케팅 정보 수신 동의',
    isRequire: false,
  },
];

export const TermsContainer = () => {
  // const navigation = useNavigation<Navigation>();

  const onPressConfirm = () => {
    // navigation.push('정책');
  };

  return <TermsComponent terms={terms} onPressConfirm={onPressConfirm} />;
};
