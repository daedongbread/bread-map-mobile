import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Button } from '@shared/Button/Button';
import { Text } from '@shared/Text';

interface Props {
  onPressUnblock: () => void;
  onPressCancel: () => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
}
export const UnblockUserBottomSheet = ({ onPressUnblock, onPressCancel, bottomSheetModalRef }: Props) => {
  return (
    <View style={[styles.flex, styles.wrapper]}>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={[204]}
        handleIndicatorStyle={{
          backgroundColor: theme.color.primary500,
        }}
        handleStyle={{
          height: 24,
        }}
        onDismiss={onPressCancel}
      >
        <View style={[styles.flex, styles.body]}>
          <Text presets={['subtitle2', 'bold']} style={styles.title}>
            정말 차단 해제하시겠어요?
          </Text>
          <Text presets={['body2', 'regular']} style={styles.subtitle}>
            {'빵으로살찐자님에게는 회원님이\n차단을 해제했다는 정보를 알리지 않습니다.'}
          </Text>
          <View style={styles.buttonWrapper}>
            <Button style={styles.flex} appearance={'terdary'} onPress={onPressCancel}>
              취소
            </Button>
            <View style={styles.buttonGap} />
            <Button style={styles.flex} appearance={'primary'} onPress={onPressUnblock}>
              차단 해제
            </Button>
          </View>
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 24,
    paddingBottom: 16,
  },
  body: {
    alignItems: 'center',
  },
  title: {
    color: 'black',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  buttonGap: {
    width: 8,
  },
});
