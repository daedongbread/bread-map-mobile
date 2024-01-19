import React from 'react';
import { ReviewTagSelectComponent } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewTagSelect';
import { ReviewWriteStackNavigationProps } from '@/pages/ReviewWriteStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

type Navigation = ReviewWriteStackNavigationProps<'ReviewTagSelect'>['navigation'];
type Route = ReviewWriteStackNavigationProps<'ReviewTagSelect'>['route'];

export type PostTagSelectToggleForm = {
  bakeryToggle: string;
  breadToggle: string;
};

export const ReviewTagSelectContainer = () => {
  // const [form, setForm] = useState<PostTagSelectToggleForm>('');
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Route>();
  const { bakeryId } = params;

  const onPressSubmit = () => {
    // logic..
    // goNavPostWrite();
    navigation.navigate('ReviewSelect', {
      bakeryId,
    });
  };

  return <ReviewTagSelectComponent onPressSubmit={onPressSubmit} />;
};
