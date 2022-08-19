import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { BakeryType } from '@/containers/Review/ReviewSelectContainer';
import { BakeryToggle } from './BakeryToggle';

type Props = {
  selectedBakery: BakeryType[];
  onChangeSeledtedBakery: (bakery: BakeryType, value: boolean) => void;
};

export const BakeryToggleList: React.FC<Props> = ({ selectedBakery, onChangeSeledtedBakery }) => {
  return (
    <FlatList
      data={selectedBakery}
      contentContainerStyle={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <BakeryToggle bakery={item} onChangeSeledtedBakery={onChangeSeledtedBakery} />}
      // 임시 name을 key && pk 값으로 사용 추후 백엔드와 논의 필요
      keyExtractor={item => item.name}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
