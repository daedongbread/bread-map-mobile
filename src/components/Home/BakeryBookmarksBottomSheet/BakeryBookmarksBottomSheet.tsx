import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TouchableWithoutFeedback, View, ViewProps } from 'react-native';

import { SvgProps } from 'react-native-svg';

import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';

import { Checkbox } from '@shared/Chcekbox/Checkbox';
import { Text } from '@shared/Text';

import { Footer } from './Footer';
import { Header } from './Header';
import { StoreListHeader } from './StoreListHeader';

export type BookmarkList = {
  flagId: number;
  icon: React.FC<SvgProps>;
  color?: string;
  name: string;
};

type Props = Pick<BottomSheetProps, 'onChange'> & {
  list: Array<BookmarkList>;
  bakery?: { id: number; name: string } | null;
  onPressNewBookmark: () => void;
  selectBookmark?: BookmarkList;
  onClose: () => void;
  onClick: (bookmark: BookmarkList) => void;
  onSave: () => void;
};

type RenderItemProps = {
  item: BookmarkList;
  isSelected: boolean;
  onClick: (selectBookmark: BookmarkList) => void;
};

const RenderItem: React.FC<RenderItemProps> = ({ item, isSelected, onClick }) => {
  return (
    <Pressable onPress={() => onClick(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.iconWrapper}>
          <item.icon width={32} height={32} color={item.color || theme.color.primary500} />
        </View>
        <Text style={styles.flex} presets={['body1', 'bold']}>
          {item.name}
        </Text>
        <Checkbox checked={isSelected} />
      </View>
    </Pressable>
  );
};

export const BakeryBookmarksBottomSheet: React.FC<Props> = React.memo(
  ({ bakery, list, onPressNewBookmark, selectBookmark, onClose, onClick, onSave }) => {
    const [snapPoints, setSnapPoints] = useState<[number | string]>(['40%']);

    const bakeryName = bakery?.name || '';

    const bakeryRef = useRef<BottomSheet>(null);

    const onLayout: ViewProps['onLayout'] = e => {
      const height = e.nativeEvent.layout.height;
      if (height) {
        setSnapPoints([height + 30]);
      }
    };

    const onCloseBottomSheet = () => {
      bakeryRef.current?.close();
    };

    useEffect(() => {
      if (bakery) {
        bakeryRef.current?.expand();
      }
    }, [bakery]);

    return (
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onCloseBottomSheet}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <BottomSheet snapPoints={snapPoints} ref={bakeryRef} onClose={onClose}>
          <View onLayout={onLayout}>
            <Header name={bakeryName} />
            <FlatList
              style={styles.listContainer}
              data={list}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.bookmarkItem}>
                    {index === 0 ? (
                      <StoreListHeader onPress={onPressNewBookmark} />
                    ) : (
                      <RenderItem item={item} isSelected={item.flagId === selectBookmark?.flagId} onClick={onClick} />
                    )}
                  </View>
                );
              }}
            />
            <Footer onClose={onCloseBottomSheet} onSave={onSave} />
          </View>
        </BottomSheet>
      </View>
    );
  }
);

const styles = StyleSheet.create(
  resizePixels({
    flex: {
      flex: 1,
    },
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    background: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    listContainer: {
      backgroundColor: theme.color.gray200,
    },
    bookmarkItem: {
      marginBottom: 1,
      backgroundColor: 'white',
      paddingHorizontal: 20,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
    },
    iconWrapper: {
      marginRight: 12,
    },
    checkboxWrapper: {
      marginLeft: 'auto',
    },
    checkbox: {
      borderRadius: 50,
    },
  })
);
