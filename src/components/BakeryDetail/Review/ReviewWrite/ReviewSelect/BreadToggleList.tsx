import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { BreadEntity } from '@/apis/bread';
import { BreadToggle } from './BreadToggle';

type Props = {
  selectedBreads: BreadEntity[];
  manualSelectedBreads: BreadEntity[];
};

export const BreadToggleList: React.FC<Props> = ({ selectedBreads, manualSelectedBreads }) => {
  const renderData = [...selectedBreads, ...manualSelectedBreads];

  return (
    <FlatList
      data={renderData}
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <BreadToggle bread={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
