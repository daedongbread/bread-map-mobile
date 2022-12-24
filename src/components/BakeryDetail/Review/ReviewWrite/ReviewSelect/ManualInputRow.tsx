import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { BreadEntity } from '@/apis/bread';
import { useAppDispatch } from '@/hooks/redux';
import { addManualSelectedBread, RatedBread, updateManualSelectedBread } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';
import CheckBox from '@react-native-community/checkbox';

type Props = BreadEntity & {
  setManualInputs: Dispatch<SetStateAction<RatedBread[]>>;
  isExistBread: (manualBreadName: string) => boolean;
};

export const ManualInputRow: React.FC<Props> = ({ id, name, price, setManualInputs, isExistBread }) => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const [isExistName, setIsExistName] = useState(false);
  // checkbox disabled 여부
  const isCheckable = name.trim().length > 0 && !isExistName;

  useEffect(() => {
    addManualSelectedBreadStore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const addManualSelectedBreadStore = () => {
    dispatch(
      addManualSelectedBread({
        manualInputBread: {
          id,
          name: name,
          price: price,
          type: 'manual',
        },
        isChecked,
      })
    );
  };

  const onChange = (key: string, e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const { text } = e.nativeEvent;

    setManualInputs(prev => {
      const newState = [...prev];
      newState[id] = { ...newState[id], [key]: text };

      return newState;
    });

    if (isChecked) {
      dispatch(updateManualSelectedBread({ id, name: text, price }));
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
          style={styles.nameInput}
          placeholder={'메뉴명'}
          placeholderTextColor={theme.color.gray500}
          value={name}
          onChange={e => onChange('name', e)}
        />
        <TextInput
          style={styles.priceInput}
          placeholder={'가격(선택)'}
          placeholderTextColor={theme.color.gray500}
          value={price?.toString()}
          onChange={e => onChange('price', e)}
        />
      </View>
      <CheckBox
        style={styles.checkbox}
        animationDuration={0}
        tintColor={theme.color.gray400}
        disabled={!isCheckable}
        value={isChecked}
        onTintColor={theme.color.primary500}
        onFillColor={theme.color.primary500}
        onCheckColor={'white'}
        onValueChange={setIsChecked}
      />
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
