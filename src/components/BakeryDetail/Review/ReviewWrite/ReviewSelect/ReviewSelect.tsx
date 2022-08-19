import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button } from '@/components/Shared/Button/Button';
import { BakeryType } from '@/containers/Review/ReviewSelectContainer';
import { theme } from '@/styles/theme';
import { BakeryToggleList } from './BakeryToggleList';
import { ContentsHeader } from './ContentsHeader';
import { ContentsList } from './ContentsList';
import { ReviewSearch } from './ReviewSearch';
import { TopHeader } from './TopHeader';

type Props = {
  bakerys: BakeryType[];
  searchValue: string;
  selectedBakery: BakeryType[];
  onChnageSearchValue: (searchValue: string) => void;
  onChangeSeledtedBakery: (bakery: BakeryType, value: boolean) => void;
  onPressConfirmButton: () => void;
};

export const ReviewSelect: React.FC<Props> = ({
  bakerys,
  searchValue,
  selectedBakery,
  onChnageSearchValue,
  onChangeSeledtedBakery,
  onPressConfirmButton,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TopHeader title={'리뷰작성'} />
        <BakeryToggleList selectedBakery={selectedBakery} onChangeSeledtedBakery={onChangeSeledtedBakery} />
        <ReviewSearch searchValue={searchValue} onChnageSearchValue={onChnageSearchValue} />
      </View>
      <View style={styles.contentsContainer}>
        <ContentsHeader title={'메뉴선택'} bakeryCount={bakerys.length} />
        <ContentsList
          bakerys={bakerys}
          selectedBakery={selectedBakery}
          onChangeSeledtedBakery={onChangeSeledtedBakery}
        />
      </View>
      <Button
        onPress={onPressConfirmButton}
        style={styles.confirmBtn}
        disabled={Boolean(selectedBakery.length === 0)}
        appearance={selectedBakery.length ? 'primary' : 'quaternary'}
      >
        확인
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentsContainer: {
    flex: 1,
    paddingTop: 12,
  },
  disabledConfirmBtn: {
    paddingHorizontal: 20,
    backgroundColor: theme.color.gray400,
  },
  confirmBtn: {
    paddingHorizontal: 20,
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 16,
  },
});
