import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { BreadEntity } from '@/apis/bread';
import { BreadToggle } from './BreadToggle';

type Props = {
  selectedBreads: BreadEntity[];
};

export const BreadToggleList: React.FC<Props> = ({ selectedBreads }) => {
  return (
    <FlatList
      data={selectedBreads}
      contentContainerStyle={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <BreadToggle bread={item} />}
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
