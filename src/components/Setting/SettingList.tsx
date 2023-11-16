import React, { ComponentProps } from 'react';
import { FlatList, StyleSheet, Switch, SwitchProps, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider } from '@/components/BakeryDetail/Divider';
import { SettingDivider, SettingItem } from '@/pages/MainStack/Setting';
import { theme } from '@/styles/theme';
import { Text } from '@shared/Text';
import { Header } from '../Shared/Header';
import { SplitRow } from '../Shared/SplitSpace';

interface Props {
  isEnableNotice: boolean;
  onChangeEnableNotice: (value: boolean) => void;
  onPressAnnounce: () => void;
  onPressBlackList: () => void;
  appVersion: string;
  logout: () => void;
  onPressDeleteAccount: () => void;
  onPressServiceTerm: () => void;
  onPressPrivacyTerm: () => void;
}
export const SettingList = ({
  isEnableNotice,
  onChangeEnableNotice,
  onPressAnnounce,
  onPressBlackList,
  appVersion,
  logout,
  onPressDeleteAccount,
  onPressPrivacyTerm,
  onPressServiceTerm,
}: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  const settings: Array<SettingItem | SettingDivider> = [
    {
      type: 'section',
      action: 'none',
      label: '알림',
    },
    {
      type: 'item',
      action: 'toggle',
      label: '활동알림',
      subLabel: '댓글, 리뷰, 팔로우 등 알림',
      switchProps: {
        onValueChange: value => {
          onChangeEnableNotice(value);
        },
        value: isEnableNotice,
      },
    },
    {
      type: 'divide',
    },
    {
      type: 'section',
      action: 'none',
      label: '고객센터',
    },
    {
      type: 'item',
      action: 'navigate',
      label: '공지사항',
      onPress: () => {
        onPressAnnounce();
      },
    },
    {
      type: 'item',
      action: 'navigate',
      label: '차단사용자 관리',
      onPress: () => {
        onPressBlackList();
      },
    },
    {
      type: 'divide',
    },
    {
      type: 'section',
      action: 'none',
      label: '약관 및 정책',
    },
    {
      type: 'item',
      action: 'navigate',
      label: '서비스 이용약관',
      onPress: () => {
        onPressServiceTerm();
      },
    },
    {
      type: 'item',
      action: 'navigate',
      label: '개인정보 처리방침',
      onPress: () => {
        onPressPrivacyTerm();
      },
    },
    {
      type: 'divide',
    },
    {
      type: 'section',
      label: '앱버전',
      action: 'none',
      right: <Text>{appVersion}</Text>,
    },
    {
      type: 'section',
      label: '로그아웃',
      action: 'navigate',
      onPress: () => {
        logout();
      },
    },
    {
      type: 'section',
      label: '탈퇴하기',
      action: 'navigate',
      onPress: () => {
        onPressDeleteAccount();
      },
    },
  ];
  return (
    <FlatList
      data={settings}
      ListHeaderComponent={
        <>
          <SplitRow height={top} />
          <Header title={'설정'} isPrevButtonShown />
        </>
      }
      ListFooterComponent={<SplitRow height={bottom} />}
      renderItem={({ item }) => {
        if (item.type === 'divide') {
          return <Divider style={styles.divider} />;
        }

        return (
          <Wrapper action={item.action} style={[styles.flex, styles.wrapper]} onPress={item.onPress}>
            <View style={styles.flex}>
              <Text {...getLabelProps(item.type)}>{item.label}</Text>
              {'subLabel' in item ? (
                <Text presets={['caption1']} style={styles.subLabel}>
                  {item.subLabel}
                </Text>
              ) : null}
            </View>
            <View>{item.action === 'toggle' ? <Toggle {...item.switchProps} /> : item.right}</View>
          </Wrapper>
        );
      }}
    />
  );
};

const Wrapper = (props: TouchableOpacityProps & { action: SettingItem['action'] }) => {
  if (props.action === 'navigate') {
    return <TouchableOpacity {...props} />;
  }

  return <View {...props} />;
};

const Toggle = (props: SwitchProps) => {
  return <Switch thumbColor={'white'} trackColor={{ true: theme.color.primary500 }} {...props} />;
};

const getLabelProps = (type: 'section' | 'item'): ComponentProps<typeof Text> => {
  if (type === 'section') {
    return {
      presets: ['body2', 'bold'],
      style: styles.sectionLabel,
    };
  }

  if (type === 'item') {
    return {
      presets: ['body1', 'medium'],
      style: styles.itemLabel,
    };
  }

  return {};
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLabel: {
    color: theme.color.gray500,
  },
  itemLabel: {
    color: theme.color.gray900,
  },
  subLabel: {
    color: theme.color.gray700,
  },
  divider: {
    marginVertical: 16,
  },
});
