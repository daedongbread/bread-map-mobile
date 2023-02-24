import React, { ComponentProps } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider } from '@/components/BakeryDetail/Divider';
import { TextInput } from '@/components/Shared/TextInput';
import { ChevronLeftIcon } from '@shared/Icons/ChevronLeftIcon';

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
          value={value}
          backgroundColor={'white'}
          onChangeText={onChangeText}
          placeholder={'빵집 이름을 검색해보세요'}
          defaultStyleEnable={false}
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
