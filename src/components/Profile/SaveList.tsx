import React, { memo } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { resizePixels } from '@/utils';
import { SaveListItem } from './SaveListItem';

export function SaveList({ userFlagList, onItemClick }: any) {
  return (
    <>
      <FlatList
        data={userFlagList}
        numColumns={2}
        renderItem={data => {
          return <SaveListItem item={data?.item} onItemClick={onItemClick} />;
        }}
        style={styles.Flatlist}
        ItemSeparatorComponent={ItemSeparatorComponent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </>
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
