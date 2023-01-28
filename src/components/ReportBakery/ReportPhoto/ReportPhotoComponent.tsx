import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhotoSelect } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewRating/PhotoSelect';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { ReportSuccessBottomSheet } from '../ReportSuccessBottomSheet';

const TEXT_MAX_LIMIT = 12;

type Props = {
  bakeryName: string;
  photos: Asset[];
  reportSuccessBottomSheetRef: React.ForwardedRef<BottomSheet>;
  onPressPhotoSelectButton: () => void;
  onPressPhotoDeleteButton: (uri?: string) => void;
  onPressReportButton: () => void;
  closeSuccessPopup: () => void;
};

export const ReportPhotoComponent = ({
  bakeryName,
  photos,
  reportSuccessBottomSheetRef,
  onPressPhotoSelectButton,
  onPressPhotoDeleteButton,
  onPressReportButton,
  closeSuccessPopup,
}: Props) => (
  <SafeAreaView style={styles.container}>
    <Header isCloseButtonShown />
    <ScrollView style={styles.fullScreen}>
      <SplitRow height={25} />
      <View>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode={'tail'}>
          {bakeryName.length > TEXT_MAX_LIMIT ? bakeryName.substring(0, TEXT_MAX_LIMIT) + '...' : bakeryName}
        </Text>
        <Text style={styles.titleText}>사진 제보 하시나요?</Text>
      </View>
      <SplitRow height={30} />
      <View style={styles.photoContainer}>
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
    <ReportSuccessBottomSheet
      bottomSheetRef={reportSuccessBottomSheetRef}
      title="사진 제보"
      onPress={closeSuccessPopup}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 18,
  },
  fullScreen: {
    flex: 1,
    paddingLeft: 20,
  },
  titleText: {
    color: theme.color.gray900,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  photoContainer: {},
  button: {
    marginHorizontal: 20,
  },
});
