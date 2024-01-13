import React, { useCallback, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useGetAllFeeds } from '@/apis/feed/useGetFeeds';
import { CurationBannerComponent } from '@/components/Home/Curation/CurationBannerComponent';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useNavigation } from '@react-navigation/native';

type Props = {};

type Navigation = HomeStackScreenProps<'Home'>['navigation'];

export const CurationBannerContainer = ({}: Props) => {
  const navigation = useNavigation<Navigation>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { feed = [] } = useGetAllFeeds();

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const totalWidth = event.nativeEvent.layoutMeasurement.width;
      const xPosition = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(xPosition / totalWidth);

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    },
    [currentIndex]
  );

  const onPressBanner = useCallback(
    (feedId: number) => {
      navigation.navigate('CurationDetail', {
        feedId,
      });
    },
    [navigation]
  );

  if (!feed) {
    return null;
  }

  return (
    <CurationBannerComponent
      feeds={feed}
      totalIndex={feed.length}
      currentIndex={currentIndex}
      onScroll={onScroll}
      onPressBanner={onPressBanner}
    />
  );
};
