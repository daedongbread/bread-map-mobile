import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { BackdropComponent } from '../Profile';
import { Button } from '../Shared/Button/Button';
import { CloseIcon } from '../Shared/Icons';
import { SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';

export function DeleteBakeryBottomSheet({ bottomSheetRef }: any) {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const snapPoints = useMemo(() => [184], []);

  const onClickCamera = () => {
    navigation.push('EditBakeryStack', {
      screen: 'Camera',
    });
    bottomSheetRef.current?.close();
  };

  const onClickAlbum = () => {
    navigation.push('EditBakeryStack', {
      screen: 'DeleteLocation',
      params: {
        type: 'Album',
      },
    });
    bottomSheetRef.current?.close();
  };

  const onClickRight = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      backdropComponent={props => <BackdropComponent {...props} />}
      handleComponent={null}
      index={-1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
    >
      <View style={styles.Container}>
        <SplitRow height={12} />
        <TouchableOpacity style={styles.RightIcon} onPress={onClickRight}>
          <CloseIcon />
        </TouchableOpacity>
        <SplitRow height={15} />
        <Button onPress={onClickCamera} appearance="terdary" style={styles.Button}>
          <Text>사진찍기</Text>
        </Button>
        <SplitRow height={8} />
        <Button onPress={onClickAlbum} appearance="terdary" style={styles.Button}>
          앨범에서 사진선택
        </Button>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    Container: {
      flex: 1,
    },
    Image: {
      width: 92,
      height: 60,
    },
    Title: {
      color: 'black',
    },
    SubTitle: {
      color: '#4D4D4D',
      width: 200,
      textAlign: 'center',
    },
    Icon: {
      width: 20,
      height: 20,
    },
    RightIcon: {
      marginLeft: 'auto',
      marginRight: 20,
      width: 24,
      height: 24,
    },
    ButtonWrap: {
      flexDirection: 'row',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 'auto',
      marginBottom: 16,
    },
    Button: {
      marginHorizontal: 20,
      color: theme.color.gray700,
    },
  })
);
