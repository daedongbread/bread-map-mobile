import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { UploadIcon } from '@/components/Shared/Icons';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { presets } from '@/components/Shared/Text/presets';
import { Row } from '@/components/Shared/View';
import { theme } from '@/styles/theme';
import { resizePixel } from '@/utils';
import { TouchableOpacity } from '@gorhom/bottom-sheet';

type Props = {
  comment: string;
  mentionInfo: string;
  setComment: (text: string) => void;
  onPressCommentSubmit: () => void;
};

export const Input = ({ comment, mentionInfo, setComment, onPressCommentSubmit }: Props) => {
  const isSubmittable = comment.trim().length > 0;

  return (
    <Row style={styles.container}>
      <Row style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="댓글을 입력하세요"
          multiline
          value={`${mentionInfo} ${comment}`}
          onChangeText={text => setComment(text)}
        />
      </Row>

      <SplitColumn width={10} />

      <TouchableOpacity onPress={isSubmittable ? onPressCommentSubmit : () => null}>
        <UploadIcon style={styles.enterIcon} fill={isSubmittable ? theme.color.primary500 : '#FFA88C'} />
      </TouchableOpacity>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopColor: '#EFEFEF',
    borderTopWidth: 1,
  },
  inputContainer: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.color.gray200,
    borderRadius: 21,
  },
  input: {
    flexShrink: 1,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 3,
    fontSize: resizePixel(14),
    ...presets.medium,
  },
  enterIcon: {
    width: 40,
    height: 40,
  },
});
