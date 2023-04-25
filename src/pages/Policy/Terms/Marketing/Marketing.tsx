import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { useRoute } from '@react-navigation/native';
import { TermsStackNavigationProps } from '../Stack';

const URI = 'https://sugared-chamomile-e10.notion.site/5f04a195d951430b9dfa16819cb6afcf';

type Route = TermsStackNavigationProps<'Marketing'>['route'];

export const Marketing = () => {
  const insets = useSafeAreaInsets();
  const { params } = useRoute<Route>();
  const { onClickAgree } = params;

  return (
    <SafeAreaView style={styles.fullScreen}>
      <Header isCloseButtonShown />

      <WebView style={styles.contentsContainer} source={{ uri: URI }} startInLoadingState={true} />

      <View style={styles.buttonContainer}>
        <Button style={styles.button} appearance="terdary" onPress={() => onClickAgree(false)}>
          동의안함
        </Button>
        <SplitColumn width={8} />
        <Button style={styles.button} appearance="primary" onPress={() => onClickAgree(true)}>
          동의
        </Button>
      </View>

      {insets.bottom === 0 && <SplitRow height={16} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  contentsContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    paddingTop: 15,
  },
});
