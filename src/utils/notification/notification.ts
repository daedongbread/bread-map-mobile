import { storage } from '@/utils/storage/storage';
import messaging from '@react-native-firebase/messaging';

export const notification = () => {
  const init = () => {
    return messaging().registerDeviceForRemoteMessages();
  };

  const getDeviceToken = () => {
    return messaging().getToken();
  };

  const setDeviceToken = (token: string) => {
    return storage.set('deviceToken', token);
  };

  const clearDeviceToken = () => {
    return storage.set('deviceToken', null);
  };

  const requestPermission = async () => {
    const status = await messaging().requestPermission();
    const enabled =
      status === messaging.AuthorizationStatus.AUTHORIZED || status === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  };

  return {
    init,
    requestPermission,
    getDeviceToken,
    setDeviceToken,
    clearDeviceToken,
  };
};
