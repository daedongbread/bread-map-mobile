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
};

export const ManualInputRow: React.FC<Props> = ({ id, name, price, setManualInputs }) => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);

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
        onTintColor={theme.color.primary500}
        onFillColor={theme.color.primary500}
        onCheckColor={'white'}
        disabled={name.trim().length === 0}
        value={isChecked}
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
