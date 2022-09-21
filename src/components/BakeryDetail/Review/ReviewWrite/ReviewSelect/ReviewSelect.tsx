import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { BreadEntity } from '@/apis/bread';
import { Button } from '@/components/Shared/Button/Button';
import { theme } from '@/styles/theme';
import { Header } from '../Header';
import { BreadToggleList } from './BreadToggleList';
import { ContentsHeader } from './ContentsHeader';
import { ContentsList } from './ContentsList';
import { ReviewSearch } from './ReviewSearch';

type Props = {
  breads: BreadEntity[];
  searchValue: string;
  selectedBreads: BreadEntity[];
  onChangeSearchValue: (searchValue: string) => void;
  onPressConfirmButton: () => void;
  closePage: () => void;
};

export const ReviewSelect: React.FC<Props> = ({
  breads,
  searchValue,
  selectedBreads,
  onChangeSearchValue,
  onPressConfirmButton,
  closePage,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header title={'리뷰작성'} closePage={closePage} />
        <BreadToggleList selectedBreads={selectedBreads} />
        <ReviewSearch searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />
      </View>
      <View style={styles.contentsContainer}>
        <ContentsHeader title={'메뉴선택'} breadCount={breads.length} />
        <ContentsList breads={breads} selectedBreads={selectedBreads} />
      </View>
      <Button
        onPress={onPressConfirmButton}
        style={styles.confirmBtn}
        disabled={Boolean(selectedBreads.length === 0)}
        appearance={selectedBreads.length ? 'primary' : 'quaternary'}
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
