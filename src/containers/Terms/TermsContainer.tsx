import React, { useState } from 'react';
import { TermsComponent } from '@/components/Terms';
import { TermsStackNavigationProps } from '@/pages/Policy/Terms/Stack';
import { useNavigation } from '@react-navigation/native';

type Navigation = TermsStackNavigationProps<'Terms'>['navigation'];

export type Terms = {
  id: string;
  value: string;
  isRequire: boolean;
};

const terms: Terms[] = [
  {
    id: 'a',
    value: '서비스 이용약관 동의',
    isRequire: true,
  },
  {
    id: 'b',
    value: '개인정보 수집 및 이용 동의',
    isRequire: true,
  },
  {
    id: 'c',
    value: '마케팅 정보 수신 동의',
    isRequire: false,
  },
];

export const TermsContainer = () => {
  const navigation = useNavigation<Navigation>();
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

  const onPressConfirm = () => {
    navigation.navigate('Welcome');
  };

  return (
    <TermsComponent
      terms={terms}
      checkeds={checkeds}
      onPressAllTermsCheckBox={onPressAllTermsCheckBox}
      onPressTermsCheckBox={onPressTermsCheckBox}
      onPressConfirm={onPressConfirm}
    />
  );
};
