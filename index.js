import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import { notification } from './src/utils/notification/notification';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'VirtualizedLists should never be nested',
]);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  notification().showANDROIDNotification();
});

// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('notification', notification);

//     notification.finish(PushNotificationIOS.FetchResult.NoData); //추가
//   },
//   popInitialNotification: true,
//   requestPermissions: Platform.OS === 'ios',
// });

AppRegistry.registerComponent(appName, () => App);
