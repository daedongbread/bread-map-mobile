import React, { Dispatch, SetStateAction } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MenuForReviewEntity } from '@/apis/menu/type';
import { BakeryTagRow } from '@/components/Community/PostWrite';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { RatedBread } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';
import { BreadToggleList } from './BreadToggleList';
import { ContentsList } from './ContentsList';
import { ReviewSearch } from './ReviewSearch';

type Props = {
  breads: MenuForReviewEntity[];
  searchValue: string;
  selectedBreads: MenuForReviewEntity[];
  manualSelectedBreads: RatedBread[];
  manualInputs: MenuForReviewEntity[];
  setManualInputs: Dispatch<SetStateAction<RatedBread[]>>;
  onChangeSearchValue: (searchValue: string) => void;
  onPressConfirmButton: () => void;
  isExistBread: (manualBreadName: string) => boolean;
};

export const ReviewSelectComponent: React.FC<Props> = ({
  breads,
  searchValue,
  selectedBreads,
  manualSelectedBreads,
  manualInputs,
  setManualInputs,
  onChangeSearchValue,
  onPressConfirmButton,
  isExistBread,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <Header isPrevButtonShown />

      <BakeryTagRow bakeryName="아우어 베이커리 논현점" isShowDetailButton={false} />

      <SplitRow height={24} />

      <Text style={styles.titleContainer} color={theme.color.gray900} presets={['heading2', 'bold']}>
        <Text color={theme.color.primary600}>빵집</Text>에서{'\n'}어떤 빵을 먹었나요?
      </Text>

      <SplitRow height={24} />

      <ReviewSearch searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />

      {selectedBreads.length + manualSelectedBreads.length > 0 && (
        <BreadToggleList selectedBreads={selectedBreads} manualSelectedBreads={manualSelectedBreads} />
      )}

      <KeyboardAvoidingView style={styles.contentsContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ContentsList
          breads={breads}
          selectedBreads={selectedBreads}
          manualSelectedBreads={manualSelectedBreads}
          manualInputs={manualInputs}
          setManualInputs={setManualInputs}
          isExistBread={isExistBread}
        />
      </KeyboardAvoidingView>
      <Button
        style={styles.confirmBtn}
        onPress={onPressConfirmButton}
        disabled={selectedBreads.length + manualSelectedBreads.length === 0}
      >
        확인
      </Button>

      {insets.bottom === 0 && <SplitRow height={16} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 20,
  },
  contentsContainer: {
    flex: 1,
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
