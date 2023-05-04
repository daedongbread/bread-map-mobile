import React, { useCallback, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { usePostReport } from '@/apis/report';
import { UsePostReportRequest } from '@/apis/report/usePostReport';
import { ReportBakeryComponent } from '@/components/ReportBakery';
import { ReportBakeryStackScreenProps } from '@/pages/MainStack/ReportBakeryStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useNavigation } from '@react-navigation/native';

const initailForm: UsePostReportRequest = {
  name: '',
  location: '',
  content: '',
};

const initialFormValid: ReportBakeryValidFormData = {
  isValidName: true,
  isValidLocation: true,
};

export type ReportBakeryValidFormData = {
  isValidName: boolean;
  isValidLocation: boolean;
};

export const ReportBaekryContainer: React.FC = ({}) => {
  const navigation = useNavigation<ReportBakeryStackScreenProps<'ReportBakery'>['navigation']>();
  const { mutate, isLoading: isSaving } = useMutation({
    mutationFn: usePostReport,
    onSuccess: () => {
      reportSuccessBottomSheetRef.current?.expand();
    },
  });

  const reportSuccessBottomSheetRef = useRef<BottomSheet>(null);

  const [form, setForm] = useState(initailForm);
  const [formValid, setFormValid] = useState(initialFormValid);

  const onChange = useCallback(
    (key: string, value: string) => {
      setForm(prev => {
        return { ...prev, [key]: value };
      });
    },
    [setForm]
  );

  const validate = useCallback(() => {
    let _formValid: ReportBakeryValidFormData = initialFormValid;

    if (form.name.trim().length === 0) {
      _formValid = { ..._formValid, isValidName: false };
    }
    if (form.location.trim().length === 0) {
      _formValid = { ..._formValid, isValidLocation: false };
    }

    setFormValid(_formValid);

    return _formValid.isValidName && _formValid.isValidLocation;
  }, [form.location, form.name]);

  const onPressConfirm = () => {
    if (!validate() || isSaving) {
      return;
    }

    mutate(form);
  };

  const closePage = () => {
    navigation.getParent()?.goBack();
  };

  return (
    <ReportBakeryComponent
      form={form}
      formValid={formValid}
      reportSuccessBottomSheetRef={reportSuccessBottomSheetRef}
      onChange={onChange}
      onPressConfirm={onPressConfirm}
      closePage={closePage}
    />
  );
};
