import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', e => {
        setKeyboardHeight(e.endCoordinates.height);
      });
      const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
        setKeyboardHeight(0);
      });

      return () => {
        keyboardWillShowListener.remove();
        keyboardWillHideListener.remove();
      };
    } else if (Platform.OS === 'android') {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
        setKeyboardHeight(e.endCoordinates.height);
      });

      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardHeight(0);
      });

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, []);

  return keyboardHeight;
};
