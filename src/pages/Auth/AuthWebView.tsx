import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView, { WebViewProps } from 'react-native-webview';
import { useAuth } from '@/hooks/useAuth';
import { RootStackScreenProps } from '@/pages/Stack';
import { useRoute } from '@react-navigation/native';

type Route = RootStackScreenProps<'AuthWebView'>['route'];

const AuthWebView = () => {
  const {
    params: { type },
  } = useRoute<Route>();
  const { logIn } = useAuth();

  const onMessage: WebViewProps['onMessage'] = nativeEvent => {
    const data = nativeEvent.nativeEvent.data;
    const responseData = JSON.parse(data);
    const { accessToken, refreshToken } = responseData;

    logIn({ accessToken, refreshToken });
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        javaScriptEnabled={true}
        originWhitelist={['*']}
        injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
        injectedJavaScriptForMainFrameOnly={false}
        injectedJavaScriptBeforeContentLoaded={`
            window.addEventListener("message", function(event) {
              window.ReactNativeWebView.postMessage(JSON.stringify(event.data));
            }, false);
        `}
        injectedJavaScript={
          Platform.OS === 'android'
            ? '(function() {' +
              'if(window.document.getElementsByTagName("pre").length>0){' +
              'var pre = window.document.getElementsByTagName("pre")[0].innerHTML; var startIndex = pre.indexOf("(\'"); var endIndex = pre.indexOf("\')");' +
              'window.ReactNativeWebView.postMessage((pre.slice(startIndex + 2, endIndex)));' +
              '}' +
              '})();'
            : ''
        }
        style={styles.container}
        onMessage={onMessage}
        source={{ uri: `http://ec2-3-36-94-161.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/${type}` }}
        userAgent={
          Platform.OS === 'android'
            ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
            : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
        }
        cacheEnabled={false}
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
      />
    </SafeAreaView>
  );
};

export { AuthWebView };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
