import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

export const SplashProvider: React.FC = props => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      //  TODO: fix hide time
    }, 2000);
  }, []);

  return <React.Fragment {...props} />;
};
