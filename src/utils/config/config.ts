import { default as Env } from 'react-native-config';

const loadEnv = (key: string): string => {
  const value = Env[key];
  if (value === undefined || value === '') {
    // eslint-disable-next-line no-console
    console.error(`환경변수 ${key}가 정의 되지 않음`);
  }
  return value;
};

export const Config = {
  API_URI: loadEnv('API_URI'),
  AUTH_TOKEN: loadEnv('AUTH_TOKEN'),
  S3_URI: loadEnv('S3_URI'),
  ANDROID_APP_NAME: loadEnv('ANDROID_APP_NAME'),
  WEB_CLIENT_ID: loadEnv('WEB_CLIENT_ID'),
  ANDROID_CLIENT_ID: loadEnv('ANDROID_CLIENT_ID'),
  IOS_CLIENT_ID: loadEnv('IOS_CLIENT_ID'),
};
