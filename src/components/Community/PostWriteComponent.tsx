import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubTitle } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewRating';
import { PhotoSelect } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewRating/PhotoSelect';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { Loading } from '@/components/Shared/Loading';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { TextInput } from '@/components/Shared/TextInput';
import { Row } from '@/components/Shared/View';
import { PostForm, PostValidFormData, TopicForm } from '@/containers/Community/PostWriteContainer';
import { theme } from '@/styles/theme';
import { TouchableOpacity } from '@gorhom/bottom-sheet';

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
  onPressClose,
}) => {
  const insets = useSafeAreaInsets();

  const isValidTitle = form.title.trim().length >= 10;
  const isValidContent = form.content.trim().length >= 10;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'작성하기'} onPressClose={onPressClose} isPrevButtonShown isCloseButtonShown />
      <ScrollView style={styles.contentsContainer} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.formContainer}>
          <SubTitle isRequire>토픽</SubTitle>
          <SplitRow height={13} />
          <Row>
            {topics.map(topic => {
              return (
                <TouchableOpacity
                  key={topic.postTopic}
                  style={[styles.topic, form.postTopic === topic.postTopic && styles.topicActive]}
                  onPress={() => onChange('postTopic', topic.postTopic)}
                >
                  <Text color={theme.color.white} presets={['caption1', 'semibold']}>
                    {topic.value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </Row>

          <SplitRow height={28} />

          <SubTitle isRequire>제목</SubTitle>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.titleInput}
              placeholder="제목을 입력해주세요"
              value={form.title}
              isAlert
              error={!formValid.isValidTitle && !isValidTitle ? '10자이상 입력해주세요' : ''}
              onChangeText={text => onChange('title', text)}
            />
          </View>

          <SubTitle isRequire>본문</SubTitle>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.detailReviewTextInput]}
              placeholder="자세한 후기는 다른 빵순이, 빵돌이들에게 많은 도움이 됩니다."
              value={form.content}
              multiline
              isAlert
              error={!formValid.isValidContent && !isValidContent ? '10자이상 입력해주세요' : ''}
              onChangeText={text => onChange('content', text)}
            />
          </View>

          <View>
            <SubTitle isRequire={false}>사진 업로드</SubTitle>

            <View style={styles.photoContainer}>
              <PhotoSelect images={form.photos} onSelectPhotos={onSelectPhotos} deSelectPhoto={deSelectPhoto} />
            </View>
          </View>

          <SplitRow height={16} />
        </View>
      </ScrollView>

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
  inputContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 6,
  },
  titleInput: {
    backgroundColor: theme.color.gray50,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: theme.color.gray800,
  },
  detailReviewTextInput: {
    color: theme.color.gray800,
    height: height * 0.15,
    borderRadius: 8,
    backgroundColor: theme.color.gray50,
    textAlignVertical: 'top',
    paddingTop: 12,
    paddingHorizontal: 16,
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
