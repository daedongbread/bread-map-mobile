import React, { memo, useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import BottomSheet from '@gorhom/bottom-sheet';
import { Text } from '../Shared/Text';
import { Header } from './Header';
import { ListDetailInfoBottomSheet } from './ListDetailInfoBottomSheet';
import { ListDetailItem } from './ListDetailItem';
import { ListDetailItemBottomSheet } from './ListDetailItemBottomSheet';

type Props = {
  getFlagData: any;
  loading: boolean;
  name: string;
  len: number;
  color: string;
};

export function ListDetailComponent({ getFlagData, loading, name, len, color }: Props) {
  const infoBottomSheetRef = useRef<BottomSheet>(null);
  const editBottomSheetRef = useRef<BottomSheet>(null);
  const onMoreClick = () => {
    editBottomSheetRef.current?.expand();
  };
  console.log(getFlagData);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Header type="DETAIL" title="저장목록" onClickRight={onMoreClick} />
      {loading ? null : (
        <FlatList
          ListHeaderComponent={ListHeaderComponent(name, len)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.Flatlist}
          data={getFlagData}
          renderItem={data => {
            return <ListDetailItem item={data.item} bottomSheetRef={infoBottomSheetRef} name={name} color={color} />;
          }}
          keyExtractor={(item: any) => item?.id}
        />
      )}
      <ListDetailItemBottomSheet bottomSheetRef={infoBottomSheetRef} />
      <ListDetailInfoBottomSheet bottomSheetRef={editBottomSheetRef} />
    </SafeAreaView>
  );
}

const ListHeaderComponent = (name: string, len: number) =>
  memo(() => (
    <View style={styles.Title}>
      <Text style={styles.TitleTextName} presets={['bold', 'number1']}>
        {name}
      </Text>
      <Text style={styles.TitleTextCount} presets={['bold', 'subtitle2']}>
        &nbsp;{len}
      </Text>
    </View>
  ));

const styles = StyleSheet.create(
  resizePixels({
    SafeAreaView: {
      flex: 1,
    },
    Flatlist: {
      marginLeft: 20,
    },
    Title: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 16,
      paddingBottom: 17,
    },
    TitleTextName: {
      fontSize: 18,
      color: 'black',
    },
    TitleTextCount: {
      fontSize: 16,
      color: theme.color.primary500,
    },
  })
);

const MockData = [
  {
    image: 'https://source.unsplash.com/collection/1',
    icon: 'heart',
    iconBackgroundColor: '#1A73E9',
    name: '꼼다비뛰드',
    flagCount: '1,200',
    starCount: '150',
    reviewCount: '1,180',
    reviews: [
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡가나다라마바사',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
    ],
  },
  {
    image: 'https://source.unsplash.com/collection/2',
    icon: 'flag',
    iconBackgroundColor: 'blue',
    name: '꼼다비뛰드',
    flagCount: '1,200',
    starCount: '150',
    reviewCount: '1,180',
    reviews: [
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
    ],
  },
  {
    image: 'https://source.unsplash.com/collection/3',
    icon: 'heart',
    iconBackgroundColor: 'blue',
    name: '꼼다비뛰드',
    flagCount: '1,200',
    starCount: '150',
    reviewCount: '1,180',
    reviews: [
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
    ],
  },
  {
    image: 'https://source.unsplash.com/collection/1',
    icon: 'heart',
    iconBackgroundColor: 'blue',
    name: '꼼다비뛰드',
    flagCount: '1,200',
    starCount: '150',
    reviewCount: '1,180',
    reviews: [
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
    ],
  },
  {
    image: 'https://source.unsplash.com/collection/1',
    icon: 'heart',
    iconBackgroundColor: 'blue',
    name: '꼼다비뛰드',
    flagCount: '1,200',
    starCount: '150',
    reviewCount: '1,180',
    reviews: [
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
    ],
  },
  {
    image: 'https://source.unsplash.com/collection/1',
    icon: 'heart',
    iconBackgroundColor: 'blue',
    name: '꼼다비뛰드',
    flagCount: '1,200',
    starCount: '150',
    reviewCount: '1,180',
    reviews: [
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
      {
        text: '한입 물었을 때 나오는 버터의존재감bbb 맛나요 빵♡',
      },
    ],
  },
];
