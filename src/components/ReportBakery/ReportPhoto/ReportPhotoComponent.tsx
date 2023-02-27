import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { PhotoSelect } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewRating/PhotoSelect';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

const TEXT_MAX_LIMIT = 12;

type Props = {
  bakeryName: string;
  photos: Asset[];
  onPressPhotoSelectButton: () => void;
  onPressPhotoDeleteButton: (uri?: string) => void;
  onPressReportButton: () => void;
};

export const ReportPhotoComponent = ({
  bakeryName,
  photos,
  onPressPhotoSelectButton,
  onPressPhotoDeleteButton,
  onPressReportButton,
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <Header isCloseButtonShown />
      <ScrollView style={styles.fullScreen}>
        <SplitRow height={25} />

        <View style={styles.textContainer}>
          <Text style={styles.titleText} presets={['subTitle1', 'bold']} numberOfLines={1} ellipsizeMode={'tail'}>
            {bakeryName.length > TEXT_MAX_LIMIT ? bakeryName.substring(0, TEXT_MAX_LIMIT) + '...' : bakeryName}
          </Text>
          <Text style={styles.titleText} presets={['subTitle1', 'bold']}>
            사진 제보 하시나요?
          </Text>
        </View>

        <SplitRow height={30} />

        <View>
          <PhotoSelect
            images={photos}
            onSelectPhotos={onPressPhotoSelectButton}
            deSelectPhoto={onPressPhotoDeleteButton}
          />
        </View>
      </ScrollView>

      <Button style={styles.button} onPress={onPressReportButton}>
        제보하기
      </Button>

      {insets.bottom === 0 && <SplitRow height={16} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  titleText: {
    color: theme.color.gray900,
  },
  button: {
    marginHorizontal: 20,
  },
});
