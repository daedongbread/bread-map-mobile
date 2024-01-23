import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BakeryTagRow } from '@/components/Community/PostWrite';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { Row } from '@/components/Shared/View';
import { theme } from '@/styles/theme';
import { resizePixel, resizePixels } from '@/utils';
import { Tag } from './Tag';

type Props = {
  tags: string[];
  onPressTag: (tag: string) => void;
  onPressSubmit: () => void;
};

const bakeryToggleList = ['데이트 코스로 좋아요', '뷰 맛집이에요', '아늑해요', '모임하기 좋아요', '분위기가 좋아요'];
const breadToggleList = ['빵이 자주 나와서 좋아요', '빵 종류가 다양해요', '가성비가 좋아요', '"재료에 진심"'];

export const ReviewTagSelectComponent = ({ tags, onPressTag, onPressSubmit }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.flex} mode="padding" edges={['top', 'bottom']}>
      <ScrollView bounces={false}>
        <Header isPrevButtonShown />

        <BakeryTagRow bakeryName="아우어 베이커리 논현점" />

        <View style={styles.container}>
          <SplitRow height={19} />

          <Text color={theme.color.primary600} presets={['heading1', 'bold']}>
            빵집<Text color={theme.color.black}> 의{'\n'}어떤점이 좋았나요?</Text>
          </Text>

          <SplitRow height={9} />
          <Text color={theme.color.gray600} presets={['caption2', 'regular']}>
            총 3개까지 선택할 수 있어요.
          </Text>

          <SplitRow height={56} />

          <Text color={theme.color.gray800} presets={['subhead', 'bold']}>
            빵집은
          </Text>
          <SplitRow height={11} />

          <Row style={styles.toggleListContainer}>
            {bakeryToggleList.map(toggle => {
              return (
                <TouchableOpacity key={toggle} onPress={() => onPressTag(toggle)}>
                  <Tag isSelected={tags.includes(toggle)} text={toggle} />
                </TouchableOpacity>
              );
            })}
          </Row>

          <SplitRow height={38} />

          <Text color={theme.color.gray800} presets={['subhead', 'bold']}>
            빵은
          </Text>

          <SplitRow height={11} />

          <Row style={styles.toggleListContainer}>
            {breadToggleList.map(toggle => {
              return (
                <TouchableOpacity key={toggle} onPress={() => onPressTag(toggle)}>
                  <Tag isSelected={tags.includes(toggle)} text={toggle} />
                </TouchableOpacity>
              );
            })}
          </Row>
        </View>

        <SplitRow height={50} />
      </ScrollView>

      <Button style={styles.confirmButton} onPress={onPressSubmit}>
        {'계속'}
      </Button>
      {insets.bottom === 0 && <SplitRow height={16} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    flex: {
      flex: 1,
    },
    container: {
      paddingLeft: resizePixel(20),
      paddingRight: resizePixel(30),
    },
    confirmBtn: {
      paddingHorizontal: 20,
    },
    toggleListContainer: {
      flexWrap: 'wrap',
    },
    confirmButton: {
      paddingHorizontal: 20,
      justifyContent: 'flex-end',
    },
  })
);
