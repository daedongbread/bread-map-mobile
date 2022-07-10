import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ReportBakeryStackScreenProps } from '@/pages/MainStack/ReportBakeryStack/Stack';
import { Button } from '@shared/Button/Button';
import { Text } from '@shared/Text';

type Props = ReportBakeryStackScreenProps<'ReportBakery'>;
const ReportBakery = ({ navigation }: Props) => {
  const onReport = useCallback(() => {
    const parent = navigation.getParent();
    if (parent) {
      parent.goBack();
      return;
    }

    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Report Bakery</Text>
      </View>
      <Button onPress={onReport}>확인</Button>
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

export { ReportBakery };
