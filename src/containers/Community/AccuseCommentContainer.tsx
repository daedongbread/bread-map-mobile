import React, { useCallback, useState } from 'react';
import { AccuseComponent } from '@/components/Accuse';
import { ModalStackScreenProps } from '@/pages/Modal/Stack';
import { useNavigation } from '@react-navigation/native';

export type AccuseForm = {
  reason: string;
  content: string;
};

const initialForm: AccuseForm = {
  reason: '',
  content: '',
};

const reasonList = [
  { key: 'IRRELEVANT_CONTENT', value: '토픽에 관련없는 내용' },
  { key: 'INAPPROPRIATE_CONTENT', value: '음란성, 욕설 등 부적절한 내용' },
  { key: 'IRRELEVANT_IMAGE', value: '개인정보 노출을 포함한 글' },
  { key: 'UNFIT_CONTENT', value: '중복 / 도배성 글' },
  { key: 'COPYRIGHT_THEFT', value: '광고, 홍보성 글' },
  { key: 'ETC', value: '기타(하단 내용 작성)' },
];

type Navigation = ModalStackScreenProps<'AccuseComment'>['navigation'];
// type Route = ModalStackScreenProps<'AccuseComment'>['route'];

export const AccuseCommentContainer = () => {
  const navigation = useNavigation<Navigation>();
  // const route = useRoute<Route>();

  // const { commentId } = route.params;
  // const { mutateAsync: reportReview } = useReportReview();

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
    // await reportReview({
    //   reviewId,
    //   ...form,
    // });

    navigation.goBack();

    navigation.navigate('SuccessBottomSheet', {
      content: '신고 감사해요!\n심사과정을 거쳐 반영할게요!',
    });
  };

  return (
    <AccuseComponent
      headerText={'댓글 신고하기'}
      title={'댓글을 신고하는\n이유를 알려주세요!'}
      subTitle={'타당한 근거 없이 신고된 내용은 관리자 확인 후\n반영되지 않을 수 있습니다.'}
      reasonList={reasonList}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};
