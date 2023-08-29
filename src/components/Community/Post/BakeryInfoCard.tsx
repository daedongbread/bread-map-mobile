import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LocationMarker } from '@/components/Shared/Icons';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import MoreIcon from '@shared/Icons/MoreIcon.svg';

type Props = {
  bakeryId: number;
  bakeryName: string;
  address: string;
  thumbnail: string;
};

type Navigation = HomeStackScreenProps<'Bakery'>['navigation'];

export const BakeryInfoCard = ({ bakeryId, bakeryName, address, thumbnail }: Props) => {
  const navigation = useNavigation<Navigation>();

  const onPress = () => {
    navigation.navigate('Bakery', {
      screen: 'BakeryDetailHome',
      params: {
        bakeryId,
        bakeryName,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <Image style={styles.bakeryImage} source={{ uri: thumbnail }} />
        <SplitColumn width={19} />
        <View style={styles.bakeryInfoContainer}>
          <Text color="#222222" presets={['body2', 'bold']}>
            {bakeryName}
          </Text>

          <View style={styles.adressRow}>
            <LocationMarker />
            <SplitColumn width={4} />
            <Text
              color="#424242"
              presets={['caption2', 'medium']}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.addressText}
            >
              {address}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <MoreIcon width={24} height={24} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.color.gray200,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  bakeryImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  bakeryInfoContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  adressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    flexShrink: 1,
  },
});
