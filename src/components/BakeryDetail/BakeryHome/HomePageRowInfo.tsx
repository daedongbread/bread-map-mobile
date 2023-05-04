import React from 'react';
import { Dimensions, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { EarthIcon } from '@/components/Shared/Icons';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

type Props = {
  url: string;
};

const { width } = Dimensions.get('screen');

export const HomePageRowInfo: React.FC<Props> = ({ url }) => {
  const onPressWebsiteURL = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.row}>
      <View>
        <EarthIcon />
      </View>

      <TouchableOpacity onPress={onPressWebsiteURL} style={styles.textWrapper}>
        <Text color={theme.color.primary500} presets={['caption2', 'medium']} style={styles.text}>
          {url.trim()}
        </Text>
      </TouchableOpacity>

      <SplitColumn width={12} />
    </View>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    row: {
      flexDirection: 'row',
      marginBottom: 6,
      alignItems: 'flex-start',
    },
    textWrapper: {
      marginLeft: 8,
    },
    text: {
      alignSelf: 'center',
      maxWidth: width * 0.7,
    },
  })
);
