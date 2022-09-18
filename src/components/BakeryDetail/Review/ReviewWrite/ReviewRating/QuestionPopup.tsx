import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/Shared/Text';
import { RootStackScreenProps } from '@/pages/Stack';
import { bakeryInfo, bakeryMenu, bakeryReviews } from '@/utils';
import { useNavigation } from '@react-navigation/native';

const bakeryData = { bakeryMenu, bakeryReviews, bakeryInfo };

type Props = {
  closePopup: () => void;
};

export const QuestionPopup = ({ closePopup }: Props) => {
  const navigation = useNavigation<RootStackScreenProps<'ReviewWriteStack'>['navigation']>();
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.popupContainer}>
        <View style={styles.textContainer}>
          <View style={styles.indicator} />
          <Text style={styles.text_1}>리뷰작성을 그만할까요?</Text>
          <Text style={styles.text_2}>삭제한 리뷰는 되돌릴 수 없으니{'\n'}신중히 생각해주세요!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.leftButton}>
            <TouchableOpacity onPress={closePopup}>
              <Text style={styles.leftButtonText}>계속 쓸래요</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightButton}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Bakery', {
                  screen: 'BakeryDetailHome',
                  params: {
                    ...bakeryData,
                  },
                });
              }}
            >
              <Text style={styles.rightButtonText}>그만할게요</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: '100%',
    width: '100%',
  },
  popupContainer: {
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  indicator: {
    width: 36,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  text_1: {
    paddingTop: 34,
    color: '#000000',
    fontWeight: '700',
    fontSize: 18,
  },
  text_2: {
    paddingTop: 16,
    color: '#4D4D4D',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  leftButton: {
    flex: 1,
    paddingRight: 8,
  },
  leftButtonText: {
    textAlign: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    color: '#616161',
  },
  rightButton: {
    flex: 1,
  },
  rightButtonText: {
    textAlign: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#FF6E40',
    overflow: 'hidden',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    color: '#FFFFFF',
  },
});
