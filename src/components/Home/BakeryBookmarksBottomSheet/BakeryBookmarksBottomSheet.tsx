import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { SvgProps } from 'react-native-svg';

import { BakeryEntity } from '@/apis';

import { resizePixels } from '@/utils';

import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';

import { Text } from '@shared/Text';

import { Footer } from './Footer';
import { Header } from './Header';
import { StoreListHeader } from './StoreListHeader';

type List = {
  icon: React.FC<SvgProps>;
  text: string;
  isSelect: boolean;
};

type Props = Pick<BottomSheetProps, 'onChange'> & {
  list: Array<List>;
  bakery?: BakeryEntity | null;
  onPressNewBookmark: () => void;
  onClose: () => void;
  onSave: () => void;
};

const snapPoints = ['40%'];

const renderItem = ({ item }: { item: List }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.iconWrapper}>
        <item.icon width={32} height={32} />
      </View>
      <Text presets={['body1', 'bold']}>{item.text}</Text>
      <View style={styles.checkboxWrapper}>
        {item.isSelect ? <Text>Selected check-box</Text> : <Text> unSelect check-box</Text>}
      </View>
    </View>
  );
};

export const BakeryBookmarksBottomSheet: React.FC<Props> = React.memo(
  ({ bakery, list, onPressNewBookmark, onClose, onSave }) => {
    const bakeryName = bakery?.bakeryName || '';

    const bakeryRef = useRef<BottomSheet>(null);

    const onCloseBottomSheet = () => {
      bakeryRef.current?.close();
    };

    const ListHeaderComponent = useCallback(
      () => <StoreListHeader onPress={onPressNewBookmark} />,
      [onPressNewBookmark]
    );

    useEffect(() => {
      if (bakery) {
        bakeryRef.current?.expand();
      }
    }, [bakery]);

    return (
      <Modal visible={!!bakery} transparent statusBarTranslucent>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={onCloseBottomSheet}>
            <View style={styles.background} />
          </TouchableWithoutFeedback>
          <BottomSheet snapPoints={snapPoints} ref={bakeryRef} onClose={onClose} style={styles.bottomSheetContainer}>
            <View>
              <Header name={bakeryName} />
              <FlatList data={list} renderItem={renderItem} ListHeaderComponent={ListHeaderComponent} />
              <Footer onClose={onCloseBottomSheet} onSave={onSave} />
            </View>
          </BottomSheet>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create(
  resizePixels({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    background: {
      flex: 1,
    },
    bottomSheetContainer: {
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
  })
);
