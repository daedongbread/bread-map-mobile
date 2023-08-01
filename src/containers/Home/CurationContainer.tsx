import React, { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import { FeedEntity } from '@/apis/feed/types';
import { useGetAllFeeds } from '@/apis/feed/useGetFeeds';
import { CarouselRenderItem } from '@/components/Home/Curation/CarouselRenderItem';
import { CurationComponent } from '@/components/Home/Curation/CurationComponent';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

type Navigation = MainStackScreenProps<'Community'>;

export const CurationContainer = () => {
  const navigation = useNavigation<Navigation['navigation']>();
  const screenWidth = Dimensions.get('screen').width;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { feed } = useGetAllFeeds();

  const onPressDetail = (feedId: number) => {
    goCurationDetail(feedId);
  };
  const goCurationDetail = useCallback(
    (feedId: number) => {
      navigation.push('MainTab', {
        screen: 'HomeStack',
        params: {
          screen: 'CurationDetail',
          params: { feedId },
        },
      });
    },
    [navigation]
  );
  const renderItem = ({ item }: { item: FeedEntity; index: number }) => {
    const { feedId } = item;
    return (
      <CarouselRenderItem
        item={item}
        activeIndex={activeIndex}
        totalPageSize={feed ? feed.length : 0}
        onPressDetail={() => onPressDetail(feedId)}
      />
    );
  };

  return (
    <CurationComponent
      carouselItems={feed ?? []}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth}
      itemHeight={screenWidth}
      onSnapToItem={setActiveIndex}
      decelerationRate={2}
      enableMomentum
    />
  );
};
