import React, { ComponentProps, useEffect, useRef } from 'react';
import { StyleSheet, TextInput as OriginTextInput, TouchableOpacity, View } from 'react-native';
import { Divider } from '@/components/BakeryDetail/Divider';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { presets } from '@/components/Shared/Text/presets';
import { TextInput } from '@/components/Shared/TextInput';
import { theme } from '@/styles/theme';

type Props = Pick<ComponentProps<typeof TextInput>, 'value' | 'onChangeText' | 'onSubmitEditing'> &
  Pick<ComponentProps<typeof TouchableOpacity>, 'onPress'> & {};

const Header: React.VFC<Props> = ({ value, onChangeText, onPress, onSubmitEditing }) => {
  const textInputRef = useRef<OriginTextInput | null>(null);

  // 마운트시 TextInput focus
  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  return (
    <View>
      <View style={[styles.container, styles.TextInputContainer]}>
        <TouchableOpacity onPress={onPress}>
          <PrevIcon />
        </TouchableOpacity>
        <SplitColumn width={6} />
        <TextInput
          ref={textInputRef}
          value={value}
          style={styles.TextInput}
          backgroundColor={'white'}
          onChangeText={onChangeText}
          placeholder={'빵집 이름을 검색해보세요'}
          defaultStyleEnable={false}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 21,
  },
  TextInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  TextInput: {
    color: theme.color.gray900,
    fontSize: 16,
    lineHeight: 18,
    ...presets.medium,
    paddingVertical: 0,
  },
});

export { Header };
