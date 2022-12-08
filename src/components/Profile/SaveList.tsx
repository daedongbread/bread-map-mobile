import React, { memo } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { resizePixels } from '@/utils';
import { SaveListItem } from './SaveListItem';

export function SaveList({ userFlagList }: any) {
  console.log(userFlagList);

  return (
    <FlatList
      data={userFlagList}
      numColumns={2}
      renderItem={data => {
        return <SaveListItem item={data?.item} />;
      }}
      style={styles.Flatlist}
      ItemSeparatorComponent={ItemSeparatorComponent}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
}

const ItemSeparatorComponent = memo(() => <View style={styles.Separator} />);

const styles = StyleSheet.create(
  resizePixels({
    Flatlist: {
      paddingTop: 24,
      paddingHorizontal: 20,
    },
    Separator: {
      paddingVertical: 24,
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
  })
);

const mockSaveData = [
  {
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
      {
        url: 'https://source.unsplash.com/collection/2',
      },
      {
        url: 'https://source.unsplash.com/collection/3',
      },
      {
        url: 'https://source.unsplash.com/collection/4',
      },
      {
        url: 'https://source.unsplash.com/collection/5',
      },
    ],
    name: '가고싶어요',
    icon: 'heart',
    color: '#FF6E40',
  },
  {
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
    ],
    name: '가봤어요',
    icon: 'flag',
    color: '#FF6E40',
  },
  {
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
      {
        url: 'https://source.unsplash.com/collection/2',
      },
    ],
    name: '연남동빵지순례',
    icon: 'heart',
    color: '#1A73E9',
  },
  {
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
      {
        url: 'https://source.unsplash.com/collection/2',
      },
      {
        url: 'https://source.unsplash.com/collection/3',
      },
    ],
    name: '연남동빵지순례',
    icon: 'heart',
    color: '#1A73E9',
  },
  {
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
      {
        url: 'https://source.unsplash.com/collection/2',
      },
      {
        url: 'https://source.unsplash.com/collection/3',
      },
      {
        url: 'https://source.unsplash.com/collection/4',
      },
    ],
    name: '연남동빵지순례',
    icon: 'heart',
    color: '#1A73E9',
  },
  {
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
      {
        url: 'https://source.unsplash.com/collection/2',
      },
    ],
    name: '연남동빵지순례',
    icon: 'heart',
    color: '#1A73E9',
  },
  {
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
      {
        url: 'https://source.unsplash.com/collection/2',
      },
    ],
    name: '연남동빵지순례',
    icon: 'heart',
    color: '#1A73E9',
  },
  {
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
      {
        url: 'https://source.unsplash.com/collection/2',
      },
    ],
    name: '연남동빵지순례',
    icon: 'heart',
    color: '#1A73E9',
  },
  {
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
      {
        url: 'https://source.unsplash.com/collection/2',
      },
    ],
    name: '연남동빵지순례',
    icon: 'heart',
    color: '#1A73E9',
  },
];
