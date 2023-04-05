import React, { useState } from 'react';
import { TermsComponent } from '@/components/Terms';
import { TermsStackParamList } from '@/pages/Policy/Terms/Stack';
import { useNavigation } from '@react-navigation/native';

// type Navigation = TermsStackNavigationProps<'Terms'>['navigation'];

export type Terms = {
  id: keyof TermsStackParamList;
  value: string;
  isRequire: boolean;
};

const terms: Terms[] = [
  {
    id: 'Service',
    value: '서비스 이용약관 동의',
    isRequire: true,
  },
  {
    id: 'Privacy',
    value: '개인정보 수집 및 이용 동의',
    isRequire: true,
  },
  {
    id: 'Marketing',
    value: '마케팅 정보 수신 동의',
    isRequire: false,
  },
];

export const TermsContainer = () => {
  const navigation = useNavigation();
  const [checkeds, setCheckeds] = useState<string[]>([]);

  const onPressAllTermsCheckBox = (isChecked: boolean) => {
    const newCheckeds = isChecked ? terms.map(term => term.id) : [];
    setCheckeds(newCheckeds);
  };

  const onPressTermsCheckBox = (value: boolean, id: string) => {
    let newCheckeds = [...checkeds];

    if (value) {
      newCheckeds.push(id);
    } else {
      newCheckeds = newCheckeds.filter(checked => checked !== id);
    }

    setCheckeds(newCheckeds);
  };

  const onPressTerms = (routeName: keyof TermsStackParamList) => {
    navigation.navigate('Service');
  };

  const onPressConfirm = () => {
    navigation.navigate('Welcome');
  };

  return (
    <TermsComponent
      terms={terms}
      checkeds={checkeds}
      onPressAllTermsCheckBox={onPressAllTermsCheckBox}
      onPressTermsCheckBox={onPressTermsCheckBox}
      onPressTerms={onPressTerms}
      onPressConfirm={onPressConfirm}
    />
  );
};
