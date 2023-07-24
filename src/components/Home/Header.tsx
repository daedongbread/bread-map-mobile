import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import MoreIcon from '@shared/Icons/MoreIcon.svg';

type Props = {
  title: string;
  onPressMore: () => void;
};

export const Header = ({ title, onPressMore }: Props) => {
  return (
    <View style={styles.container}>
      <Text color="#1E1E1E" presets={['subhead', 'bold']}>
        {title}
      </Text>

      <TouchableOpacity style={styles.moreButtonContainer} onPress={onPressMore}>
        <Text color={theme.color.gray500} presets={['body2', 'medium']}>
          더보기
        </Text>
        <MoreIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moreButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
