import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Terms } from '@/containers/Terms/TermsContainer';
import { theme } from '@/styles/theme';
import { Button } from '../Shared/Button/Button';
import { CustomCheckBox } from '../Shared/Chcekbox/CustomCheckBox';
import { Header } from '../Shared/Header';
import { RightPrev } from '../Shared/Icons';
import { SplitColumn, SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';

type Props = {
  terms: Terms[];
  onPressConfirm: () => void;
};

const RenderItem = ({ value, isRequire }: Terms) => (
  <View style={styles.termsContainer}>
    <View style={styles.termLeft}>
      <CustomCheckBox width={20} height={20} strokeWidth={2} />

      <SplitColumn width={8} />

      <Text presets={['caption1', 'semibold']}>{value}</Text>

      <SplitColumn width={2} />

      {isRequire ? (
        <Text color={theme.color.primary500} presets={['caption1', 'medium']}>
          (필수)
        </Text>
      ) : (
        <Text color={theme.color.gray700} presets={['caption1', 'medium']}>
          (선택)
        </Text>
      )}
    </View>

    <RightPrev strokeWidth={2} />
  </View>
);

export const TermsComponent = ({ terms, onPressConfirm }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ScrollView style={styles.container}>
        <Header isCloseButtonShown />

        <SplitRow height={12} />

        <View style={styles.contentsContainer}>
          <Text color={theme.color.primary500} presets={['heading1', 'bold']}>
            서비스 이용 약관
            <Text color="#000000">에{'\n'}동의해주세요.</Text>
          </Text>

          <SplitRow height={24} />

          <View style={styles.allTermsContainer}>
            <CustomCheckBox strokeWidth={2} />
            <SplitColumn width={8} />
            <Text presets={['body1', 'bold']}>전체 약관에 동의합니다</Text>
          </View>

          <SplitRow height={8} />

          {terms.map(term => {
            return <RenderItem {...term} />;
          })}
        </View>
      </ScrollView>

      <Button style={styles.button} onPress={onPressConfirm} appearance={'primary'}>
        다음
      </Button>

      {insets.bottom === 0 && <SplitRow height={16} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentsContainer: {
    paddingHorizontal: 20,
  },
  allTermsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.color.gray50,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  termLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 20,
  },
});
