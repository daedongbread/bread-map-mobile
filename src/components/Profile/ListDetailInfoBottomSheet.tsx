import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../Shared/Text';
import { BackdropComponent } from './BackdropComponent';
import { ListDetailInfoDeleteBottomSheet } from './ListDetailInfoDeleteBottomSheet';

export function ListDetailInfoBottomSheet({ bottomSheetRef, deleteBottomSheetRef, onListDeleteClick }: any) {
  const { push } = useNavigation<MainStackScreenProps<'Bookmark'>['navigation']>();
  const snapPoints = useMemo(() => [140], []);

  const onEditClick = () => {
    bottomSheetRef.current?.close();
    push('Bookmark');
  };

  const onDeleteClick = () => {
    bottomSheetRef.current?.close();
    deleteBottomSheetRef.current?.expand();
  };

  return (
    <>
      <BottomSheet
        backdropComponent={BackdropComponent}
        enablePanDownToClose
        // eslint-disable-next-line react-native/no-inline-styles
        handleIndicatorStyle={{ backgroundColor: '#E0E0E0' }}
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
      >
        <View style={styles.Container}>
          <TouchableOpacity onPress={onEditClick} style={styles.ButtonWrap}>
            <Text style={styles.Text} presets={['body1', 'medium']}>
              저장목록 수정하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteClick} style={styles.ButtonWrap}>
            <Text style={styles.Text} presets={['body1', 'medium']}>
              저장목록 삭제하기
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <ListDetailInfoDeleteBottomSheet bottomSheetRef={deleteBottomSheetRef} onConfirmClick={onListDeleteClick} />
    </>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    Container: {
      flex: 1,
      alignItems: 'center',
    },
    ButtonWrap: {
      width: '100%',
      height: 48,
      justifyContent: 'center',
      paddingLeft: 20,
    },
    Text: {
      color: theme.color.gray700,
    },
  })
);
