import React, { memo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { useRoute } from '@react-navigation/native';
import { Text } from '../Shared/Text';
import { Header } from './Header';
import { ListDetailInfoBottomSheet } from './ListDetailInfoBottomSheet';
import { ListDetailItem } from './ListDetailItem';

type Props = {
  getFlagData: any;
  loading: boolean;
  name: string;
  len: number;
  color: string;
  deleteBottomSheetRef: any;
  editBottomSheetRef: any;
  onListDeleteClick: () => void;
};

export function ListDetailComponent({
  getFlagData,
  loading,
  name,
  len,
  color,
  deleteBottomSheetRef,
  editBottomSheetRef,
  onListDeleteClick,
}: Props) {
  const {
    params: { flagId, isMe },
  } = useRoute<RootRouteProps<'ListDetail'>>();

  const onMoreClick = () => {
    editBottomSheetRef.current?.expand();
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Header type="DETAIL" title="저장목록" onClickRight={onMoreClick} isMe={isMe} name={name} />
      {loading ? null : (
        <FlatList
          ListHeaderComponent={ListHeaderComponent(name, len)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.Flatlist}
          data={getFlagData}
          renderItem={data => {
            return <ListDetailItem item={data.item} name={name} color={color} flagId={flagId} isMe={isMe} />;
          }}
          keyExtractor={(item: any) => item?.id}
        />
      )}
      <ListDetailInfoBottomSheet
        bottomSheetRef={editBottomSheetRef}
        deleteBottomSheetRef={deleteBottomSheetRef}
        onListDeleteClick={onListDeleteClick}
        name={name}
        color={color}
        flagId={flagId}
      />
    </SafeAreaView>
  );
}

const ListHeaderComponent = (name: string, len: number) =>
  memo(() => (
    <View style={styles.Title}>
      <Text style={styles.TitleTextName} presets={['body1', 'bold']}>
        {name}
      </Text>
      <Text style={styles.TitleTextCount} presets={['subhead', 'bold']}>
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
