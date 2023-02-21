import React, { Dispatch, SetStateAction } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MenuForReviewEntity } from '@/apis/menu/type';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { ReviewWriteStackNavigationProps } from '@/pages/ReviewWriteStack/Stack';
import { RatedBread } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { BreadToggleList } from './BreadToggleList';
import { ContentsHeader } from './ContentsHeader';
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
  closePage: () => void;
};

type Navigation = ReviewWriteStackNavigationProps<'ReviewSelect'>['navigation'];

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
  closePage,
}) => {
  const navigation = useNavigation<Navigation>();
  const insets = useSafeAreaInsets();

  const onPressHeaderCloseButton = () => {
    if (selectedBreads.length > 0) {
      goNavQuestionBottomSheet();
    } else {
      closePage();
    }
  };

  const goNavQuestionBottomSheet = () => {
    navigation.navigate('QuestionBottomSheet', {
      title: '리뷰작성을 그만할까요?',
      subTitle: '삭제한 리뷰는 되돌릴 수 없으니\n신중히 생각해주세요!',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header title={'리뷰작성'} onPressClose={onPressHeaderCloseButton} isCloseButtonShown />
        <BreadToggleList selectedBreads={selectedBreads} manualSelectedBreads={manualSelectedBreads} />
        <ReviewSearch searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />
      </View>
      <KeyboardAvoidingView
        style={styles.contentsContainer}
        // keyboardVerticalOffset={10}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ContentsHeader title={'메뉴선택'} breadCount={breads.length} />
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
        disabled={Boolean(selectedBreads.length + manualSelectedBreads.length === 0)}
        appearance={selectedBreads.length + manualSelectedBreads.length ? 'primary' : 'quaternary'}
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
    // paddingBottom: 8,
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 16,
  },
});
