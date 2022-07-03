import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { RootStackScreenProps } from '@/pages/stack';
import { Button } from '@shared/Button/Button';
import { Text } from '@shared/Text';

type Props = RootStackScreenProps<'Onboarding'>;

function Onboarding({ navigation }: Props) {
  const onSignIN = useCallback(() => {
    navigation.push('Auth');
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.fullScreen]}>
      <View style={[styles.fullScreen, styles.container]}>
        <View style={styles.fullScreen}>
          <Text presets={['h1', 'bold']}>{'ONBOARDING'}</Text>
        </View>
        <Button onPress={onSignIN}>{'LOGIN'}</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  textWrapper: {
    flex: 1,
  },
});

export { Onboarding };
