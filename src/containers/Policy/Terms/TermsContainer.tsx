import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { PostRegisterRequest, useRegister } from '@/apis/auth/useRegister';
import { TermsComponent } from '@/components/Terms';
import { useAppSelector } from '@/hooks/redux';
import { TermsStackNavigationProps, TermsStackParamList } from '@/pages/Policy/Terms/Stack';
import { useNavigation } from '@react-navigation/native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export type Terms = {
  id: string;
  routeName: keyof TermsStackParamList;
  value: string;
  isRequire: boolean;
};

const terms: Terms[] = [
  {
    id: 'isTermsOfServiceAgreed',
    routeName: 'Service',
    value: '서비스 이용약관 동의',
    isRequire: true,
  },
  {
    id: 'isPersonalInfoCollectionAgreed',
    routeName: 'Privacy',
    value: '개인정보 수집 및 이용 동의',
    isRequire: true,
  },
  {
    id: 'isMarketingInfoReceptionAgreed',
    routeName: 'Marketing',
    value: '마케팅 정보 수신 동의',
    isRequire: false,
  },
];

type Navigation = TermsStackNavigationProps<'Terms'>['navigation'];

export const TermsContainer = () => {
  const navigation = useNavigation<Navigation>();
  const { idToken, provider } = useAppSelector(selector => selector.auth);

  const [checkeds, setCheckeds] = useState<string[]>([]);

  const { mutateAsync: postRegister } = useRegister();

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

  const onPressTerms = (routeName: keyof TermsStackParamList, id: string) => {
    navigation.navigate(routeName, {
      onClickAgree: (value: boolean) => onClickAgree(value, id),
    });
  };

  const onClickAgree = (value: boolean, id: string) => {
    onPressTermsCheckBox(value, id);
    navigation.pop();
  };

  const parseBoolean = (key: string) => {
    return !!checkeds.find(checked => checked === key);
  };

  const onPressConfirm = async () => {
    const request: PostRegisterRequest = {
      type: provider,
      idToken,
      isTermsOfServiceAgreed: parseBoolean('isTermsOfServiceAgreed'),
      isPersonalInfoCollectionAgreed: parseBoolean('isPersonalInfoCollectionAgreed'),
      isMarketingInfoReceptionAgreed: parseBoolean('isMarketingInfoReceptionAgreed'),
    };

    const { accessToken, refreshToken, userId } = await postRegister(request);

    navigation.navigate('Welcome', {
      accessToken,
      refreshToken,
      userId,
    });
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
