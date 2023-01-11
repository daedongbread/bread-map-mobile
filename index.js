import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { LogBox } from 'react-native';
import { initNotification } from '@/utils/notification';
import App from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

initNotification();

AppRegistry.registerComponent(appName, () => App);
