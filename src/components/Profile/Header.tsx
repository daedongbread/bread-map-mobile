import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import IcMore from '@/components/Shared/Icons/IcMore.svg';
import IcSetting from '@/components/Shared/Icons/IcSetting.svg';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';

type Props = {
  type: 'ME' | 'OTHER' | 'DETAIL';
  title?: string;
  onClickRight?: () => void;
  isMe: boolean;
  name: string;
};

export const Header = ({ type, title, onClickRight, isMe, name }: Props) => {
  const navigation = useNavigation<MainStackScreenProps<'ProfileStack'>['navigation']>();

  const onPressPrevBtn = () => {
    navigation.pop();
  };

  const navigateSetting = () => {
    navigation.push('SettingModal');
  };

  if (type === 'ME') {
    return (
      <View style={styles.MeContainer}>
        <SplitColumn width={16} />
        <TouchableOpacity onPress={navigateSetting}>
          <IcSetting />
        </TouchableOpacity>
      </View>
    );
  }
  if (type === 'OTHER') {
    return (
      <View style={styles.DetailContainer}>
        <TouchableOpacity onPress={onPressPrevBtn}>
          <PrevIcon />
        </TouchableOpacity>
      </View>
    );
  }
  if (type === 'DETAIL') {
    return (
      <View style={styles.DetailContainer}>
        <View style={styles.TextWrap}>
          <Text style={styles.Text} presets={['subhead', 'bold']}>
            {title}
          </Text>
        </View>

        <TouchableOpacity onPress={onPressPrevBtn}>
          <PrevIcon />
        </TouchableOpacity>

        {isMe && onClickRight && name !== '가고싶어요' && name !== '가봤어요' ? (
          <TouchableOpacity style={styles.RightIcon} onPress={onClickRight}>
            <IcMore color="#222222" />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create(
  resizePixels({
    MeContainer: {
      height: 52,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: 15.5,
    },
    OtherContainer: {
      height: 52,
      display: 'flex',
      flexDirection: 'row',
    },
    DetailContainer: {
      position: 'relative',
      paddingLeft: 19,
      paddingRight: 12,
      height: 52,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    TextWrap: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    Text: {
      color: 'black',
    },
    RightIcon: {
      marginLeft: 'auto',
    },
  })
);
