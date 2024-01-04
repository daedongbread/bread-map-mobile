import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubTitle } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewRating';
import { PhotoSelect } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewRating/PhotoSelect';
import { Button } from '@/components/Shared/Button/Button';
import { Loading } from '@/components/Shared/Loading';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { presets } from '@/components/Shared/Text/presets';
import { PostForm, PostValidFormData, TopicForm } from '@/containers/Community/PostWrite/PostWriteContainer';
import { theme } from '@/styles/theme';
import { BakeryTagRow } from './BakeryTagRow';
import { Header } from './Header';

const { height } = Dimensions.get('screen');

type Props = {
  form: PostForm;
  formValid: PostValidFormData;
  topics: TopicForm[];
  isLoading: boolean;
  onChange: (key: keyof PostForm, value: string) => void;
  onSelectPhotos: () => void;
  deSelectPhoto: (uri?: string) => void;
  onPressConfirm: () => void;
  onPressClose: () => void;
};

export const PostWriteComponent: React.FC<Props> = ({
  form,
  formValid,
  topics,
  isLoading,
  onChange,
  onSelectPhotos,
  deSelectPhoto,
  onPressConfirm,
}) => {
  const insets = useSafeAreaInsets();

  const isValidTitle = form.title.trim().length >= 10;
  const isValidContent = form.content.trim().length >= 10;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'빵지순례'} />

      <BakeryTagRow bakeryName="아우어 베이커리 논현점" />

      <View style={styles.formContainer}>
        <SplitRow height={20} />

        <TextInput
          style={styles.titleInput}
          placeholder="(선택)제목을 입력해주세요."
          value={form.title}
          maxLength={40}
          onChangeText={text => onChange('title', text)}
        />

        <SplitRow height={20} />

        <TextInput
          style={styles.detailReviewTextInput}
          placeholder="자세한 후기는 다른 빵순이, 빵돌이들에게 많은 도움이 됩니다."
          placeholderTextColor={theme.color.gray500}
          value={form.content}
          multiline
          maxLength={400}
          onChangeText={text => onChange('content', text)}
        />

        <View>
          <SubTitle isRequire={false}>사진 업로드</SubTitle>

          <View style={styles.photoContainer}>
            <PhotoSelect images={form.photos} onSelectPhotos={onSelectPhotos} deSelectPhoto={deSelectPhoto} />
          </View>
        </View>

        <SplitRow height={16} />
      </View>

      <Button style={styles.confirmBtn} onPress={onPressConfirm}>
        {'확인'}
      </Button>

      {insets.bottom === 0 && <SplitRow height={16} />}

      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentsContainer: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  topic: {
    backgroundColor: theme.color.primary200,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    borderRadius: 100,
  },
  topicActive: {
    backgroundColor: theme.color.primary500,
  },
  titleInput: {
    color: theme.color.gray900,
    ...presets.heading2,
  },
  detailReviewTextInput: {
    flex: 1,
    color: theme.color.gray800,
    textAlignVertical: 'top',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  photoContainer: {
    marginHorizontal: -20,
  },
  confirmBtn: {
    paddingHorizontal: 20,
  },
});
