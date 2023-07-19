import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LikeIcon, ViewMoreIcon } from '@/components/Shared/Icons';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { Row } from '@/components/Shared/View';
import Ellipse from '@shared/Icons/Ellipse.svg';

type Props = {
  isReply?: boolean;
};

export const Comment = ({ isReply = false }: Props) => {
  return (
    <Row style={[styles.container, isReply && styles.replyContainer]}>
      <Image style={styles.profileImage} source={{ uri: 'https://picsum.photos/40/40' }} />

      <SplitColumn width={8} />

      <View style={styles.commentContainer}>
        <Row style={styles.commentHeader}>
          <Text color="#000000" presets={['body2', 'semibold']}>
            크로와상짱짱
          </Text>

          <Row style={styles.commentHeaderRightContainer}>
            <Text color="#9E9E9E" presets={['caption2', 'medium']}>
              2021.12.05
            </Text>

            <SplitColumn width={2} />

            <TouchableOpacity onPress={() => null}>
              <ViewMoreIcon />
            </TouchableOpacity>
          </Row>
        </Row>

        <SplitRow height={2} />

        <Text color="#616161" presets={['caption2', 'medium']}>
          {isReply
            ? '오! 감사합니당~'
            : '헐 저도 출근길에 아침마다 크로와상 몇개씩 사오는데! 저기 애플파이나 잠봉뵈르도 너무맛있어요...!제가 너무좋아하는 빵집인데 여기서 보니 반갑네용'}
        </Text>

        <SplitRow height={8} />

        <Row style={styles.commentFooter}>
          <LikeIcon width={16} height={16} />
          <SplitColumn width={2} />
          <Text color="#9E9E9E" presets={['caption2', 'medium']}>
            12
          </Text>

          <SplitColumn width={4} />
          <Ellipse />
          <SplitColumn width={4} />

          <Text color="#9E9E9E" presets={['caption2', 'medium']}>
            댓글달기
          </Text>
        </Row>
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    marginHorizontal: 20,
  },
  replyContainer: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  commentContainer: {
    flex: 1,
  },
  commentHeader: {
    justifyContent: 'space-between',
  },
  commentHeaderRightContainer: {
    alignItems: 'center',
  },
  commentFooter: {
    alignItems: 'center',
  },
});