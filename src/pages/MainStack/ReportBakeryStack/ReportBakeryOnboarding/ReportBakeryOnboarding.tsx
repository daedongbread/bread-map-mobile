import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ReportBakeryStackScreenProps } from '@/pages/MainStack/ReportBakeryStack/Stack';
import { Button } from '@shared/Button/Button';
import { Text } from '@shared/Text';

type Props = ReportBakeryStackScreenProps<'ReportBakeryOnboard'>;

const ReportBakeryOnboarding = ({ navigation }: Props) => {
  const { navigate } = navigation;

  const onNavReport = useCallback(() => {
    navigate('ReportBakery');
  }, [navigate]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fullScreen}>
        <Text>ReportBakeryOnboarding</Text>
      </View>
      <Button onPress={onNavReport}>시작하기</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 32,
  },
  fullScreen: {
    flex: 1,
  },
});

export { ReportBakeryOnboarding };
