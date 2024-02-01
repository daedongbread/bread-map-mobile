import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from '@/components/BakeryDetail/Divider';
import { HistoryItem } from '@/components/Search/HistoryItem';
import { BreadCry } from '@/components/Shared/Icons/BreadCry';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { theme } from '@/styles/theme';
import { Text } from '@shared/Text';

type Props = {
  keywords: Array<string>;
  onPress: (keyword: string) => void;
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

const SearchHistoryList: React.FC<Props> = memo(({ keywords, onPress }) => {
  if (!keywords?.length) {
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

      {keywords?.map((keyword, index) => {
        return (
          <View key={index}>
            <View style={styles.row}>
              <View style={styles.flex}>
                <HistoryItem
                  name={keyword}
                  onPress={() => {
                    onPress(keyword);
                  }}
                />
              </View>

              {/* <Pressable style={styles.closeIcon} onPress={() => {}}>
                <XCircle />
              </Pressable> */}
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
