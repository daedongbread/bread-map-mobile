import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const useGeolocation = () => {
  const [currentPosition, setCurrentPosition] = useState<{ latitude: number; longitude: number }>();
  const [watchId, setWatchId] = useState<number | null>(null);

  const requireAuthorization = useCallback(async () => {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('whenInUse');
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

  return {
    getLocation,
    isWatched: typeof watchId === 'number',
    currentPosition,
    watchLocation,
    clearWatch,
  };
};
