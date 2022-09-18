import React, { useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useAppDispatch } from '@/hooks/redux';
import { updateSelectedBread } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';
import CheckBox from '@react-native-community/checkbox';

type Props = {};

type AdditionalInput = {
  name: string;
  price: number;
};

export const AdditionalArea: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<AdditionalInput>({
    name: '',
    price: 0,
  });

  const onChange = (key: string, e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const { text } = e.nativeEvent;
    setForm({
      ...form,
      [key]: text,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.nameInput}
          placeholder={'메뉴명'}
          placeholderTextColor={theme.color.gray500}
          onChange={e => onChange('name', e)}
        />
        <TextInput
          style={styles.priceInput}
          placeholder={'가격(선택)'}
          placeholderTextColor={theme.color.gray500}
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
        onValueChange={value => {
          dispatch(
            updateSelectedBread({
              bread: {
                id: 0, //new id
                name: form.name,
                price: form.price,
                image: '',
              },
              value,
            })
          );
        }}
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
