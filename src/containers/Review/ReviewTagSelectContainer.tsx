import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReviewTagSelectComponent } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewTagSelect';
import { ReviewWriteStackNavigationProps } from '@/pages/ReviewWriteStack/Stack';
import { updateSelectedTags } from '@/slices/reviewWrite';
import { useNavigation, useRoute } from '@react-navigation/native';

type Navigation = ReviewWriteStackNavigationProps<'ReviewTagSelect'>['navigation'];
type Route = ReviewWriteStackNavigationProps<'ReviewTagSelect'>['route'];

export const ReviewTagSelectContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Route>();
  const { bakeryId } = params;

  const [tags, setTags] = useState<string[]>([]);

  const onPressTag = (tag: string) => {
    const isSelectedIndex = tags.indexOf(tag);
    const newTags = [...tags];

    // 선택된 태그를 클릭했을 경우
    if (isSelectedIndex >= 0) {
      newTags.splice(isSelectedIndex, 1);
    } else {
      if (tags.length === 3) {
        newTags.shift();
      }

      newTags.push(tag);
    }

    setTags(newTags);
  };

  const updateSelectedTag = () => {
    dispatch(updateSelectedTags(tags));
  };

  const onPressSubmit = () => {
    updateSelectedTag();
    navigation.navigate('ReviewSelect', {
      bakeryId,
    });
  };

  return <ReviewTagSelectComponent tags={tags} onPressTag={onPressTag} onPressSubmit={onPressSubmit} />;
};
