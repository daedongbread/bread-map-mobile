import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { Text } from '@/components/Shared/Text';
import { Row } from '@/components/Shared/View';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import VerticalViewMoreIcon from '@shared/Icons/VerticalViewMoreIcon.svg';

type Props = {
  title: string;
  onPressMenu: () => void;
};

export const Header = ({ title, onPressMenu }: Props) => {
  const navigation = useNavigation();

  return (
    <Row style={styles.container}>
      <View style={styles.prevButton}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 20 }}>
          <PrevIcon />
        </Pressable>
      </View>

      <Text color={theme.color.gray900} presets={['body1', 'bold']}>
        {title}
      </Text>

      <TouchableOpacity onPress={onPressMenu}>
        <VerticalViewMoreIcon />
      </TouchableOpacity>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  prevButton: {
    // width: 24,
  },
});
