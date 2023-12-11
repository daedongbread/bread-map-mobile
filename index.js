import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import { LogBox } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import store from './src/slices';
import { updateRequestedScreenInfo } from './src/slices/notification';
import { notification } from './src/utils/notification/notification';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'VirtualizedLists should never be nested',
]);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  notification().showANDROIDNotification(remoteMessage);
});

PushNotification.configure({
  onNotification: function (_notification) {
    // 푸시알림 클릭으로 앱 진입시
    if (_notification.userInteraction) {
      store.dispatch(updateRequestedScreenInfo(_notification.data));
    }

    if (Platform.OS === 'ios') {
      if (notification.finish) {
        notification.finish(PushNotificationIOS.FetchResult.NoData); //추가
      }
    }
  },
});

AppRegistry.registerComponent(appName, () => App);
