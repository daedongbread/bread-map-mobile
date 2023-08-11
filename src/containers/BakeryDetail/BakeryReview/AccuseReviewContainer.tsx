import React, { useCallback, useState } from 'react';
import { useReportReview } from '@/apis/review/useReportReview';
import { AccuseComponent } from '@/components/Accuse';
import { ModalStackScreenProps } from '@/pages/Modal/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

export type AccuseForm = {
  reason: string;
  content: string;
};

const initialForm: AccuseForm = {
  reason: '',
  content: '',
};

const reasonList = [
  { key: 'IRRELEVANT_CONTENT', value: '리뷰와 관련없는 내용' },
  { key: 'INAPPROPRIATE_CONTENT', value: '음란성, 욕설 등 부적절한 내용' },
  { key: 'IRRELEVANT_IMAGE', value: '리뷰와 관련없는 사진 게시' },
  { key: 'UNFIT_CONTENT', value: '리뷰 작성 취지에 맞지 않는 내용(복사글 등)' },
  { key: 'COPYRIGHT_THEFT', value: '저작권 도용 의심(사진 등)' },
  { key: 'ETC', value: '기타(하단 내용 작성)' },
];

type Navigation = ModalStackScreenProps<'AccuseReview'>['navigation'];
type Route = ModalStackScreenProps<'AccuseReview'>['route'];

export const AccuseReviewContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { reviewId } = route.params;
  const { mutateAsync: reportReview, isLoading } = useReportReview();

  const [form, setForm] = useState<AccuseForm>(initialForm);

  const onChange = useCallback(
    (key: keyof AccuseForm, value: string) => {
      setForm(prev => {
        return { ...prev, [key]: value };
      });
    },
    [setForm]
  );

  const onSubmit = async () => {
    if (isLoading) {
      return;
    }

    await reportReview({
      reviewId,
      ...form,
    });

    navigation.goBack();

    navigation.navigate('SuccessBottomSheet', {
      content: '신고 감사해요!\n심사과정을 거쳐 반영할게요!',
    });
  };

  return (
    <AccuseComponent
      headerText={'리뷰 신고하기'}
      title={'리뷰를 신고하는\n이유를 알려주세요!'}
      subTitle={'타당한 근거 없이 신고된 내용은 관리자 확인 후\n반영되지 않을 수 있습니다.'}
      reasonList={reasonList}
      form={form}
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};
