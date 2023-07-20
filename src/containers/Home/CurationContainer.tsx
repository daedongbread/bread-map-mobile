import React, { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import { CarouselRenderItem } from '@/components/Home/Curation/CarouselRenderItem';
import { CarouselItemType, CurationComponent } from '@/components/Home/Curation/CurationComponent';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

type Navigation = MainStackScreenProps<'Community'>;

export const CurationContainer = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const carouselItems = [
    {
      subtitle: '빵순이들 사이에서 소문난',
      title: '겉바속쫀 소금빵 먹킷리스트',
      source: 'https://picsum.photos/200/181',
    },
    {
      subtitle: '빵에 진심인 사람들이 모였다',
      title: '대빵팀이 추천하는 리얼빵지도',
      source: 'https://picsum.photos/200/180',
    },
  ];
  const screenWidth = Dimensions.get('screen').width;

  const navigation = useNavigation<Navigation['navigation']>();
  const onPressDetail = () => {
    goCurationDetail();
  };
  const goCurationDetail = useCallback(() => {
    navigation.push('MainTab', {
      screen: 'HomeStack',
      params: {
        screen: 'Curation',
        params: undefined,
      },
    });
  }, [navigation]);
  const renderItem = ({ item }: { item: CarouselItemType; index: number }) => {
    return (
      <CarouselRenderItem
        item={item}
        activeIndex={activeIndex}
        totalPageSize={carouselItems.length}
        onPressDetail={onPressDetail}
      />
    );
  };

  return (
    <CurationComponent
      carouselItems={carouselItems}
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
