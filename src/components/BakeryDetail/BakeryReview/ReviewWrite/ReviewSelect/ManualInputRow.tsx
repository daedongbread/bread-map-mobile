import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MenuForReviewEntity } from '@/apis/menu/type';
import { CustomCheckBox } from '@/components/Shared/Chcekbox/CustomCheckBox';
import { presets } from '@/components/Shared/Text/presets';
import { useAppDispatch } from '@/hooks/redux';
import { addManualSelectedBread, RatedBread, updateManualSelectedBread } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';
import { numberFormat } from '@/utils';

type Props = MenuForReviewEntity & {
  manualSelectedBreads: RatedBread[];
  setManualInputs: Dispatch<SetStateAction<RatedBread[]>>;
  isExistBread: (manualBreadName: string) => boolean;
};

export const ManualInputRow: React.FC<Props> = ({
  id,
  name,
  price,
  manualSelectedBreads,
  setManualInputs,
  isExistBread,
}) => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const [isExistName, setIsExistName] = useState(false);
  // checkbox disabled 여부
  const isCheckable = name.trim().length > 0 && !isExistName;

  useEffect(() => {
    addManualSelectedBreadStore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  useEffect(() => {
    const _isChecked = manualSelectedBreads.some(bread => bread.id === id);
    if (!_isChecked) {
      setIsChecked(false);
    }
  }, [id, manualSelectedBreads]);

  const addManualSelectedBreadStore = () => {
    dispatch(
      addManualSelectedBread({
        manualInputBread: {
          id,
          name: name,
          price: price,
          type: 'manual',
          rating: 1,
        },
        isChecked,
      })
    );
  };

  const onChange = (key: string, e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    let { text } = e.nativeEvent;

    // 가격필드의 경우 앞에 ₩, 공백, 한글, 콤마 제거
    if (key === 'price') {
      text = text.replace(/\s|₩|,|[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
    }

    setManualInputs(prev => {
      const newState = [...prev];
      newState[id] = { ...newState[id], [key]: text };

      return newState;
    });

    if (isChecked) {
      dispatch(updateManualSelectedBread({ id, name, price, [key]: text }));
    }

    // name 필드만 증복 여부 검증
    const _isExist = isExistBread(text);
    if (key === 'name') {
      if (_isExist || text.trim().length === 0) {
        setIsChecked(false);
      }

      if (_isExist) {
        // 중복 항목임을 알려주는 event run
      }

      setIsExistName(_isExist);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, styles.nameInput]}
          placeholder={'메뉴명'}
          placeholderTextColor={theme.color.gray500}
          value={name}
          onChange={e => onChange('name', e)}
        />
        <TextInput
          style={[styles.textInput, styles.priceInput]}
          placeholder={'₩ 가격(선택)'}
          placeholderTextColor={theme.color.gray500}
          keyboardType={'number-pad'}
          maxLength={9}
          value={price ? `₩ ${numberFormat(price)}` : ''}
          onChange={e => onChange('price', e)}
        />
      </View>
      <CustomCheckBox value={isChecked} strokeWidth={2} disabled={!isCheckable} onValueChange={setIsChecked} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textInput: {
    fontSize: 14,
    textAlignVertical: 'center',
    ...presets.medium,
  },
  nameInput: {
    flex: 5,
    paddingVertical: 14,
    backgroundColor: theme.color.gray100,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  priceInput: {
    flex: 3,
    paddingVertical: 14,
    backgroundColor: theme.color.gray100,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 20,
  },
  checkbox: {
    justifyContent: 'center',
    width: 24,
    height: 24,
    marginHorizontal: 2,
  },
});
