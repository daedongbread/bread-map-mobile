import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { UploadButton } from '@/components/Shared/Button';
import { Loading } from '@/components/Shared/Loading';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { presets } from '@/components/Shared/Text/presets';
import { PostForm, PostValidFormData, TopicData, TopicForm } from '@/containers/Community/PostWrite/PostWriteContainer';
import { theme } from '@/styles/theme';
import { BakeryTagRow } from './BakeryTagRow';
import { Header } from './Header';

const { height } = Dimensions.get('screen');

type Props = {
  form: PostForm;
  formValid: PostValidFormData;
  topics: TopicForm[];
  isLoading: boolean;
  topicData: TopicData;
  onChange: (key: keyof PostForm, value: string) => void;
  onPressUploadButton: () => void;
  deSelectPhoto: (uri?: string) => void;
  onPressConfirm: () => void;
  onPressClose: () => void;
};

export const PostWriteComponent = ({
  form,
  formValid,
  topics,
  topicData,
  isLoading,
  onChange,
  onPressUploadButton,
  deSelectPhoto,
  onPressConfirm,
}: Props) => {
  const insets = useSafeAreaInsets();

  const isValidTitle = form.title.trim().length >= 10;
  const isValidContent = form.content.trim().length >= 10;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={topicData.title} />

      <BakeryTagRow bakeryName="" />

      <View style={styles.formContainer}>
        <SplitRow height={20} />

        <TextInput
          style={styles.titleInput}
          placeholder="(선택)제목을 입력해주세요."
          placeholderTextColor={theme.color.gray500}
          value={form.title}
          maxLength={40}
          onChangeText={text => onChange('title', text)}
        />

        <SplitRow height={20} />

        <View style={styles.contentTextInputContainer}>
          <TextInput
            style={styles.contentTextInput}
            placeholder={topicData.contentPlaceholder}
            placeholderTextColor={theme.color.gray500}
            value={form.content}
            multiline
            maxLength={400}
            onChangeText={text => onChange('content', text)}
          />
        </View>

        <View style={styles.photoContainer}>
          {/* <PhotoSelect images={form.photos} onSelectPhotos={onSelectPhotos} deSelectPhoto=
          {deSelectPhoto} /> */}
          <UploadButton onPress={onPressUploadButton} />
        </View>
        {/* <SplitRow height={16} /> */}
      </View>

      <SplitRow height={20} />
      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
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
    ...presets.bold,
  },
  contentTextInputContainer: {
    flex: 1,
  },
  contentTextInput: {
    color: theme.color.gray800,
    textAlignVertical: 'top',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  photoContainer: {},
  confirmBtn: {
    paddingHorizontal: 20,
  },
});
