import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { NewBakery } from '@/apis/bakery/useGetNewBakeries';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { SubHeader } from '../SubHeader';
import { ViewMoreButton } from '../ViewMoreButton';
import { NewBakeryCard } from './NewBakeryCard';

type Props = {
  newBakery?: NewBakery[];
  onPressBakery: (bakeryId: number, bakeryName: string) => void;
};

export const NewBakeryComponent = ({ newBakery, onPressBakery }: Props) => {
  return (
    <View style={styles.container}>
      <Text color={theme.color.primary600} presets={['caption2', 'regular']} style={styles.label}>
        빵순 제보
      </Text>

      <SplitRow height={8} />

      <SubHeader title="방금 구운 따끈따끈 신상 빵집" />

      <SplitRow height={5} />

      <FlatList
        listKey="NewBakeryCardFlatList"
        keyExtractor={item => item.id.toString()}
        style={styles.cardContainer}
        data={newBakery?.slice(0, 2)}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onPressBakery(item.id, item.name)}>
            <NewBakeryCard isFirst={index === 0} newBakery={item} />
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />

      <ViewMoreButton onPress={() => null} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  label: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.color.primary200,
    alignSelf: 'flex-start',
  },
  cardContainer: {
    marginHorizontal: -20,
  },
});
