import React, { ComponentProps } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider } from '@/components/BakeryDetail/Divider';
import { ChevronLeftIcon } from '@shared/Icons/ChevronLeftIcon';
import { TextInput } from '@shared/TextInput';

type Props = Pick<ComponentProps<typeof TextInput>, 'value' | 'onChangeText'> &
  Pick<ComponentProps<typeof TouchableOpacity>, 'onPress'> & {};

const Header: React.VFC<Props> = ({ value, onChangeText, onPress }) => {
  return (
    <View>
      <View style={[styles.container, styles.TextInputContainer]}>
        <TouchableOpacity onPress={onPress}>
          <ChevronLeftIcon />
        </TouchableOpacity>
        <TextInput
          backgroundColor={'white'}
          onChangeText={onChangeText}
          value={value}
          placeholder={'빵집 이름을 검색해보세요'}
        />
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 21,
    marginBottom: 9,
  },
  TextInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextInput: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export { Header };
