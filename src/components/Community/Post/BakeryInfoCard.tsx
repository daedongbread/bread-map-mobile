import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomImage } from '@/components/Shared/CustomImage';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { Row } from '@/components/Shared/View';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import MapActiveIcon from '@shared/Icons/MapActiveIcon.svg';
import RightArrow from '@shared/Icons/RightArrow.svg';

type Props = {
  bakeryId: number;
  bakeryName: string;
  address: string;
  thumbnail: string;
};

type Navigation = MainStackScreenProps<'BakeryDetail'>['navigation'];

export const BakeryInfoCard = ({ bakeryId, bakeryName, address, thumbnail }: Props) => {
  const navigation = useNavigation<Navigation>();

  const onPress = () => {
    navigation.navigate('BakeryDetail', {
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
        <CustomImage
          style={styles.bakeryImage}
          source={{ uri: thumbnail }}
          resizeMode="cover"
          width={styles.bakeryImage.width}
          height={styles.bakeryImage.height}
          resizedWidth={150}
          resizedHeight={150}
          isResizable
        />

        <SplitColumn width={12} />

        <View style={styles.bakeryInfoContainer}>
          <Row style={styles.bakeryNameContainer}>
            <Text color="#222222" presets={['body2', 'bold']}>
              {bakeryName}
            </Text>
            <RightArrow />
          </Row>

          <View style={styles.adressRow}>
            <Text
              color={theme.color.gray600}
              presets={['caption2', 'regular']}
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
        <MapActiveIcon />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: theme.color.gray200,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  bakeryImage: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  bakeryInfoContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  bakeryNameContainer: {
    alignItems: 'center',
  },
  adressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    flexShrink: 1,
    paddingRight: 10,
  },
});
