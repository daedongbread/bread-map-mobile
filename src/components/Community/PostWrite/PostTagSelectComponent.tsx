import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { Row } from '@/components/Shared/View';
import { theme } from '@/styles/theme';

type Props = {
  onPressSubmit: () => void;
};

const bakeryToggleList = [
  '💑 데이트하기 좋아요',
  '🌇 뷰 맛집이에요',
  '🛋️ 아늑해요',
  '👥 모임하기 좋아요',
  '🎨 컨셉이 독특해요',
];
const bakeryAndDrinkToggleList = [
  '🍞 빵이 맛있어요',
  '🍹 음료가 맛있어요',
  '🥐 특별한 빵이 있어요',
  '💰 가성비가 좋아요',
  '🥘 양이 많아요',
];

export const PostTagSelectComponent = ({ onPressSubmit }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <Header isPrevButtonShown />

        <View style={styles.container}>
          <SplitRow height={19} />

          <Text color={theme.color.primary600} presets={['heading1', 'bold']}>
            빵집<Text color={theme.color.black}> 의{'\n'}어떤점이 좋았나요?</Text>
          </Text>

          <SplitRow height={9} />
          <Text color={theme.color.black} presets={['caption2', 'bold']}>
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
                <View key={toggle} style={styles.toggle}>
                  <Text color={theme.color.white} presets={['caption1', 'semibold']}>
                    {toggle}
                  </Text>
                </View>
              );
            })}
          </Row>

          <SplitRow height={38} />

          <Text color={theme.color.gray800} presets={['subhead', 'bold']}>
            빵과 음료는
          </Text>

          <SplitRow height={11} />

          <Row style={styles.toggleListContainer}>
            {bakeryAndDrinkToggleList.map(toggle => {
              return (
                <View key={toggle} style={styles.toggle}>
                  <Text color={theme.color.white} presets={['caption1', 'semibold']}>
                    {toggle}
                  </Text>
                </View>
              );
            })}
          </Row>
        </View>

        <Button style={styles.confirmButton} onPress={onPressSubmit}>
          {'확인'}
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  confirmBtn: {
    paddingHorizontal: 20,
  },
  toggleListContainer: {
    flexWrap: 'wrap',
  },
  toggle: {
    backgroundColor: theme.color.primary300,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 100,
  },
  confirmButton: {
    paddingHorizontal: 20,
  },
});
