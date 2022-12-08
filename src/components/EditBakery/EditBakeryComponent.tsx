import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Header } from '@/components/EditBakery';
import sadBread from '@/components/Shared/Images/sadBread.png';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

import { Button } from '../Shared/Button/Button';
import { DeleteBakeryBottomSheet } from './DeleteBakeryBottomSheet';

type Props = {
  onClickRight: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
  DeleteBakeryBottomSheetRef: any;
};

export function EditBakeryComponent({ onClickRight, onClickEdit, onClickDelete, DeleteBakeryBottomSheetRef }: Props) {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Header title="빵집 정보 수정" onClickRight={onClickRight} />
      <SplitRow height={80} />
      <View style={styles.ImageWrap}>
        <FastImage resizeMode="contain" style={styles.Image} source={sadBread} />
      </View>
      <SplitRow height={24} />
      <View style={styles.TextWrap}>
        <Text presets={['body2', 'bold']} style={styles.Text}>
          없는 장소이거나,
        </Text>
        <Text presets={['body2', 'bold']} style={styles.Text}>
          정보가 잘못 되었나요?
        </Text>
      </View>
      <SplitRow height={80} />
      <Button onPress={onClickEdit} appearance="terdary" style={styles.Button}>
        장소 수정 요청
      </Button>
      <SplitRow height={8} />
      <Button onPress={onClickDelete} appearance="terdary" style={styles.Button}>
        장소 삭제 요청
      </Button>
      <DeleteBakeryBottomSheet bottomSheetRef={DeleteBakeryBottomSheetRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    SafeAreaView: {
      flex: 1,
    },
    ImageWrap: {
      width: 120,
      height: 120,
      borderRadius: 99,
      backgroundColor: theme.color.primary100,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    Image: {
      width: 85,
      height: 49,
    },
    TextWrap: {
      alignSelf: 'center',
      height: 44,
    },
    Text: {
      color: theme.color.gray900,
      textAlign: 'center',
      fontSize: 16,
    },
    Button: {
      marginHorizontal: 20,
    },
  })
);
