import React, { useCallback, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { BookmarkForm } from '@/components/BookmarkForm';
import { HomeStackScreenProps } from '@/router/types';
import { useNavigation } from '@react-navigation/native';

type ScreenProps = HomeStackScreenProps<'Bookmark'>;
type Navigation = ScreenProps['navigation'];

export const BookmarkFormContainer: React.VFC = () => {
  const navigate = useNavigation<Navigation>();

  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('#1EC780');

  const onChange = useCallback(({ name: label, value }) => {
    const changeFunctions = {
      name: setName,
      color: setColor,
    };

    if (label in changeFunctions) {
      changeFunctions[label as keyof typeof changeFunctions](value);
    }
  }, []);

  const onSave = useCallback(() => {
    //  TODO: onSave;
    navigate.pop();
  }, [navigate]);

  const onClose = useCallback(() => {
    navigate.pop();
  }, [navigate]);

  const disabledButton = !name.length || !color.length;

  return (
    <SafeAreaView style={styles.container}>
      <BookmarkForm name={name} color={color} onChange={onChange} />
      <View style={styles.buttonInputContainer}>
        <View style={styles.fullScreen}>
          <Button title={'취소'} onPress={onClose} />
        </View>
        <View style={styles.fullScreen}>
          <Button title={'완료'} disabled={disabledButton} onPress={onSave} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  buttonInputContainer: {
    flexDirection: 'row',
  },
});
