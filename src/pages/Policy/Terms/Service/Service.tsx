import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';

export const Service = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.fullScreen}>
      <Header isCloseButtonShown />

      <WebView style={styles.contentsContainer} source={{ uri: 'https://naver.com' }} />

      <Button style={styles.button} appearance="primary">
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
