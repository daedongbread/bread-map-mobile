import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { useRoute } from '@react-navigation/native';
import { TermsStackNavigationProps } from '../Stack';

const URI = 'https://sugared-chamomile-e10.notion.site/111c09f9f3784d80afd2abe353224e50';

type Route = TermsStackNavigationProps<'Marketing'>['route'];

export const Service = () => {
  const insets = useSafeAreaInsets();
  const { params } = useRoute<Route>();
  const { onClickAgree } = params;

  return (
    <SafeAreaView style={styles.fullScreen}>
      <Header isCloseButtonShown />

      <WebView style={styles.contentsContainer} source={{ uri: URI }} startInLoadingState={true} />

      <Button style={styles.button} appearance="primary" onPress={() => onClickAgree(true)}>
        동의
      </Button>

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
  button: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
});
