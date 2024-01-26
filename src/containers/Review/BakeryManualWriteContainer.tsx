import React, { useCallback, useState } from 'react';
import { BakeryManualWriteComponent } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/BakeryManualWrite';
import { ReviewWriteStackNavigationProps } from '@/pages/ReviewWriteStack/Stack';
import { useNavigation } from '@react-navigation/native';

export type BakeryManualWriteForm = {
  bakeryName: string;
  bakeryAddress: string;
  menuNames: string[];
};

type Navigation = ReviewWriteStackNavigationProps<'BakeryManualWrite'>['navigation'];

export const BakeryManualWriteContainer = () => {
  const navigation = useNavigation<Navigation>();

  const [form, setForm] = useState<BakeryManualWriteForm>({
    bakeryAddress: '',
    bakeryName: '',
    menuNames: [''],
  });

  const onChange = useCallback(
    (key: keyof BakeryManualWriteForm, value: string, index?: number) => {
      setForm(prev => {
        let newValue: string | string[] = value;

        if (key === 'menuNames') {
          if (index === undefined) {
            return { ...prev };
          }

          const newMenuNames = [...prev.menuNames];
          newMenuNames[index] = value;

          newValue = newMenuNames;
        }

        return { ...prev, [key]: newValue };
      });
    },
    [setForm]
  );

  const onPressAddRow = () => {
    // 최대 10까지 추가 가능
    if (form.menuNames.length === 10) {
      return;
    }

    setForm(prev => {
      const newMenuNames = [...prev.menuNames];
      newMenuNames.push('');

      return {
        ...prev,
        menuNames: newMenuNames,
      };
    });
  };

  const onPressSubtractRow = (index: number) => {
    setForm(prev => {
      const newMenuNames = [...prev.menuNames];
      newMenuNames.splice(index, 1);

      return {
        ...prev,
        menuNames: newMenuNames,
      };
    });
  };

  const onPressSubmit = () => {
    // 빵이름 공백인 input은 제외
    const filteredMenuNames = form.menuNames.filter(item => item.trim() !== '');

    navigation.navigate('BakeryManualWriteDetail', {
      bakeryInfoForm: {
        ...form,
        menuNames: filteredMenuNames,
      },
    });
  };

  return (
    <BakeryManualWriteComponent
      form={form}
      onChange={onChange}
      onPressAddRow={onPressAddRow}
      onPressSubtractRow={onPressSubtractRow}
      onPressSubmit={onPressSubmit}
    />
  );
};
