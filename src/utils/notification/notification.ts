import { storage } from '@/utils/storage/storage';
import messaging from '@react-native-firebase/messaging';

export const notification = () => {
  const init = () => {
    return messaging().registerDeviceForRemoteMessages();
  };

  const getDeviceToken = async (cb?: (token: string | null | undefined) => void) => {
    const token = await messaging().getToken();

    cb?.(token);
  };

  const setDeviceToken = (token: string) => {
    return storage.set('deviceToken', token);
  };

  const clearDeviceToken = () => {
    return storage.set('deviceToken', null);
  };

  return {
    init,
    getDeviceToken,
    setDeviceToken,
    clearDeviceToken,
  };
};
