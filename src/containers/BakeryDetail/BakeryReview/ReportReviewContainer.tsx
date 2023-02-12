import React, { useCallback, useState } from 'react';
import { useReportReview } from '@/apis/review/useReportReview';
import { ReportReviewComponent } from '@/components/BakeryDetail/BakeryReview';

import { ModalStackScreenProps } from '@/pages/Modal/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

export type ReportReviewForm = {
  reason: string;
  content: string;
};

type Navigation = ModalStackScreenProps<'ReportReview'>['navigation'];
type Route = ModalStackScreenProps<'ReportReview'>['route'];

const initialForm: ReportReviewForm = {
  reason: '',
  content: '',
};

export const ReportReviewContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { reviewId } = route.params;
  const { mutateAsync: reportReview } = useReportReview();

  const [form, setForm] = useState<ReportReviewForm>(initialForm);

  const onChange = useCallback(
    (key: keyof ReportReviewForm, value: string) => {
      setForm(prev => {
        return { ...prev, [key]: value };
      });
    },
    [setForm]
  );

  const onSubmit = async () => {
    await reportReview({
      reviewId,
      ...form,
    });

    navigation.goBack();

    navigation.navigate('SuccessBottomSheet', {
      content: '신고 감사해요!\n심사과정을 거쳐 반영할게요!',
    });
  };

  return <ReportReviewComponent form={form} onChange={onChange} onSubmit={onSubmit} />;
};
