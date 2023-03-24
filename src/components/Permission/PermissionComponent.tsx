import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/styles/theme';
import { Button } from '../Shared/Button/Button';
import { Header } from '../Shared/Header';
import { SplitColumn, SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';

type Props = {
  permissions: any[];
  onPressConfirm: () => void;
};

type RenderItemProps = {
  icon: any;
  title: string;
  subTitle: string;
};

const RenderItem = ({ icon, title, subTitle }: RenderItemProps) => (
  <React.Fragment>
    <View style={styles.permissionContainer}>
      <View style={styles.iconContainer}>{icon}</View>

      <SplitColumn width={16} />

      <View>
        <Text color={theme.color.gray900} presets={['body2', 'bold']}>
          {title}
        </Text>
        <SplitRow height={4} />
        <Text color={theme.color.gray600} presets={['caption1', 'medium']}>
          {subTitle}
        </Text>
      </View>
    </View>

    <SplitRow height={24} />
  </React.Fragment>
);

export const PermissionComponent = ({ permissions, onPressConfirm }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ScrollView style={styles.container}>
        <Header isCloseButtonShown />

        <SplitRow height={12} />

        <View style={styles.contentsContainer}>
          <Text color="#000000" presets={['heading1', 'bold']}>
            앱 권한 설정
          </Text>
          <SplitRow height={12} />
          <Text color="#222222" presets={['body1', 'semibold']}>
            서비스 이용을 위해 반드시{'\n'}허용 설정이 필요한 항목입니다.
          </Text>

          <SplitRow height={36} />

          {permissions.map((permission, index) => (
            <RenderItem key={index} icon={permission.icon} title={permission.title} subTitle={permission.subTitle} />
          ))}
        </View>
      </ScrollView>

      <Button style={styles.button} onPress={onPressConfirm} appearance={'primary'}>
        권한 허용
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
  permissionContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    alignSelf: 'flex-start',
    padding: 12,
    backgroundColor: theme.color.gray50,
    borderRadius: 16,
  },
  button: {
    paddingHorizontal: 20,
  },
});
