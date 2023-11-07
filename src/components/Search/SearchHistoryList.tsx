import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SearchEntity } from '@/apis/bakery/types';
import { Divider } from '@/components/BakeryDetail/Divider';
import { HistoryItem } from '@/components/Search/HistoryItem';
import { BreadCry } from '@/components/Shared/Icons/BreadCry';
import { XCircle } from '@/components/Shared/Icons/XCircle';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { theme } from '@/styles/theme';
import { Text } from '@shared/Text';

type Props = {
  searchHistory: SearchEntity[];
  onPressBakery: (searchEntity: SearchEntity) => void;
  removeSearchHistory: (bakeryId: number) => void;
};

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Text presets={['body1', 'bold']} color={theme.color.gray900}>
        최근 검색
      </Text>
    </View>
  );
};

const SearchHistoryList: React.FC<Props> = memo(({ searchHistory, onPressBakery, removeSearchHistory }) => {
  if (!searchHistory?.length) {
    return (
      <View>
        <Title />

        <View style={styles.emptyContainer}>
          <BreadCry />

          <SplitRow height={20} />

          <Text presets={['body1', 'medium']} style={styles.emptyText}>
            최근 검색 내역이 없어요.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Title />

      {searchHistory?.map(item => {
        const { bakeryId, bakeryName } = item;
        return (
          <View key={bakeryId}>
            <View style={styles.row}>
              <View style={styles.flex}>
                <HistoryItem
                  name={bakeryName}
                  onPress={() => {
                    onPressBakery(item);
                  }}
                />
              </View>

              <Pressable style={styles.closeIcon} onPress={() => removeSearchHistory(bakeryId)}>
                <XCircle />
              </Pressable>
            </View>

            <Divider style={styles.divider} />
          </View>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: theme.color.gray500,
  },
  divider: {
    height: 1,
    backgroundColor: theme.color.gray300,
  },
  titleContainer: {
    padding: 20,
  },
  closeIcon: {
    paddingRight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
});

export { SearchHistoryList };
