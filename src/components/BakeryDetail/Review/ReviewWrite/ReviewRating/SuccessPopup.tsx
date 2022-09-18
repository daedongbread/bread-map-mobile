import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SuccessIcon } from '@/components/Shared/Icons/SuccessIcon';
import { Text } from '@/components/Shared/Text';
import { useNavigation } from '@react-navigation/native';

type Props = {
  closePopup: () => void;
};

export const SuccessPopup = ({}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.popupContainer}>
        <View style={styles.textContainer}>
          <View style={styles.indicator} />
          <SuccessIcon style={styles.successIcon} />
          <Text style={styles.text}>리뷰 등록이{'\n'}완료 되었어요!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Bakery', {
                screen: 'BakeryDetailHome',
                params: {
                  bakeryId: 111,
                },
              });
            }}
          >
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
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
  successIcon: {
    marginTop: 34,
  },
  text: {
    paddingTop: 34,
    color: '#000000',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
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
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  button: {
    flex: 1,
  },
  buttonText: {
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
