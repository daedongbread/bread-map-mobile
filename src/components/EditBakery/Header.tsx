import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { Text } from '@/components/Shared/Text';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { CloseIcon } from '../Shared/Icons';

type Props = {
  onClickLeft?: boolean;
  title?: string;
  onClickRight?: () => void;
};

export const Header = ({ onClickLeft, title, onClickRight }: Props) => {
  const navigation = useNavigation<MainStackScreenProps<'ProfileStack'>['navigation']>();

  const onPressPrevBtn = () => {
    navigation.pop();
  };

  return (
    <View style={styles.DetailContainer}>
      {onClickLeft && (
        <TouchableOpacity onPress={onPressPrevBtn}>
          <PrevIcon />
        </TouchableOpacity>
      )}
      <View style={styles.TextWrap}>
        <Text style={styles.Text} presets={['bold', 'subtitle2']}>
          {title}
        </Text>
      </View>

      {onClickRight && (
        <TouchableOpacity style={styles.RightIcon} onPress={onClickRight}>
          <CloseIcon color="#222222" />
        </TouchableOpacity>
      )}
    </View>
  );
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
      paddingLeft: 12,
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
