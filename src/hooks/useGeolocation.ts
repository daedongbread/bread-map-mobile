import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import Geolocation, { AuthorizationResult } from 'react-native-geolocation-service';

export type Position = {
  latitude: number;
  longitude: number;
};

export const useGeolocation = () => {
  const currentPositionRef = useRef<Position>();
  const [currentPosition, setCurrentPosition] = useState<Position>();
  const [watchId, setWatchId] = useState<number | null>(null);
  const [authorization, setAuthorization] = useState<AuthorizationResult>();

  const requireAuthorization = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');

      setAuthorization(auth);
      return auth;
    }
  }, []);

  const getLocation = useCallback(async () => {
    const permission = await requireAuthorization();

    if (permission === 'granted') {
      Geolocation.getCurrentPosition(
        position => {
          if (position) {
            const {
              coords: { latitude, longitude },
            } = position;

            setCurrentPosition({ latitude, longitude });
          }
        },
        error => {
          // TODO: 권한을 가지고 오다가 실패했을경우
          // eslint-disable-next-line
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }, [requireAuthorization]);

  const watchLocation = useCallback(async () => {
    const permission = await requireAuthorization();

    if (permission === 'granted') {
      const id = Geolocation.watchPosition(
        position => {
          if (position) {
            const {
              coords: { latitude, longitude },
            } = position;

            setCurrentPosition({ latitude, longitude });
          }
        },
        error => {
          setWatchId(null);

          // TODO: 권한을 가지고 오다가 실패했을경우
          // eslint-disable-next-line
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, distanceFilter: 0, interval: 5000, fastestInterval: 2000 }
      );

      setWatchId(id);
    }
  }, [requireAuthorization]);

  const clearWatch = useCallback(() => {
    if (typeof watchId === 'number') {
      Geolocation.clearWatch(watchId);
    }

    setWatchId(null);
  }, [watchId]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    currentPositionRef.current = currentPosition;
  }, [currentPosition]);

  useEffect(() => {
    watchLocation();
  }, [watchLocation]);

  return {
    geolocationAuthorization: authorization,
    getLocation,
    isWatched: typeof watchId === 'number',
    currentPosition,
    currentPositionRef,
    watchLocation,
    clearWatch,
  };
};
