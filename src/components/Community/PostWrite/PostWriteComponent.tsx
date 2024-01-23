import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UploadButton } from '@/components/Shared/Button';
import { ImageCloseIcon } from '@/components/Shared/Icons';
import { Loading } from '@/components/Shared/Loading';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { presets } from '@/components/Shared/Text/presets';
import { Row } from '@/components/Shared/View';
import { PostForm, TopicData } from '@/containers/Community/PostWrite/PostWriteContainer';
import { useKeyboard } from '@/hooks/useKeyboard';
import { theme } from '@/styles/theme';
import { BakeryTagRow } from './BakeryTagRow';
import { Header } from './Header';
import { ShortUploadButton } from './ShortUploadButton';

const { width } = Dimensions.get('window');

type Props = {
  bakeryName: string;
  form: PostForm;
  isLoading: boolean;
  topicData: TopicData;
  onPressBakeryTagRow: () => void;
  onPressCancleBakeryTag: () => void;
  onChange: (key: keyof PostForm, value: string) => void;
  onPressUploadButton: () => void;
  deSelectPhoto: (uri?: string) => void;
  onPressConfirm: () => void;
  onPressClose: () => void;
};

export const PostWriteComponent = ({
  bakeryName,
  form,
  topicData,
  isLoading,
  onPressBakeryTagRow,
  onPressCancleBakeryTag,
  onChange,
  onPressUploadButton,
  deSelectPhoto,
  onPressConfirm,
}: Props) => {
  const { keyboardHeight } = useKeyboard();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          title={topicData.title}
          rightButtonDisabled={form.content.length < 10}
          onPressRightButton={onPressConfirm}
        />

        <TouchableOpacity onPress={onPressBakeryTagRow} disabled={!!bakeryName}>
          <BakeryTagRow
            bakeryName={bakeryName}
            isRequire={topicData.key !== '빵수다'}
            onPressCancle={onPressCancleBakeryTag}
          />
        </TouchableOpacity>

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
        </View>

        <Row>
          <FlatList
            data={form.photos}
            contentContainerStyle={styles.imageListContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
            ListHeaderComponent={<UploadButton style={styles.uploadImage} onPress={onPressUploadButton} />}
            ListHeaderComponentStyle={styles.photoButton}
            ItemSeparatorComponent={() => <SplitColumn width={8} />}
            renderItem={({ item }) => {
              return (
                <View>
                  <Image style={styles.uploadImage} source={{ uri: item.uri }} />
                  <TouchableOpacity style={styles.uploadImageCloseButton} onPress={() => deSelectPhoto(item.uri)}>
                    <ImageCloseIcon />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </Row>

        <SplitRow height={20} />
        {isLoading && <Loading />}
      </SafeAreaView>

      {keyboardHeight > 0 && (
        <View style={{ bottom: keyboardHeight }}>
          <ShortUploadButton onPress={onPressUploadButton} />
        </View>
      )}
    </>
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
    flex: 1,
    color: theme.color.gray800,
    textAlignVertical: 'top',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  photoButton: {
    marginRight: 8,
  },
  uploadImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 8,
  },
  uploadImageCloseButton: {
    position: 'absolute',

    right: -5,
    top: -5,
  },
  imageListContainer: {
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  confirmBtn: {
    paddingHorizontal: 20,
  },
});
