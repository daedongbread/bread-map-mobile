import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FeedDetail } from '@/apis/feed/types';
import { HomePageRowInfo } from '@/components/BakeryDetail/BakeryHome/HomePageRowInfo';
import { Divider } from '@/components/BakeryDetail/Divider';
import { IcLike } from '@/components/Shared/Icons';
import { Call } from '@/components/Shared/Icons/Call';
import IcReport from '@/components/Shared/Icons/IcReport.svg';
import { Location } from '@/components/Shared/Icons/Location';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { TimeCircle } from '@/components/Shared/Icons/TimeCircle';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { getFacilityText } from '@/containers/BakeryDetail/BakeryInfo/BakeryInfoContainer';
import { theme } from '@/styles/theme';
import { resizePixel, resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { Greetings } from './Greetings';
import { RowInfo } from './RowInfo';
import { Tag } from './Tag';

type Props = {
  feedDetail: FeedDetail;
  onPressFlag: (bakeryId: number, bakeryName: string) => void;
  onLikePress: () => void;
};

export const CurationDetailComponent: React.FC<Props> = ({ feedDetail, onPressFlag, onLikePress }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { top } = insets;

  const { common, curation, likeCounts } = feedDetail;
  const { subTitle, introduction, conclusion, thumbnailUrl } = common;

  const onPressPrevBtn = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1. 콘텐츠 Title */}
        <ImageBackground
          source={{ uri: thumbnailUrl }}
          style={[styles.imageBackgroundContainer, { minHeight: resizePixel(180 + top) }]}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.safeAreaViewContainer} />
          <View style={styles.imageBackgroundSubContainer}>
            {/* Backbutton */}
            <TouchableOpacity onPress={onPressPrevBtn} style={styles.prevButton}>
              <PrevIcon fillColor={theme.color.white} />
            </TouchableOpacity>

            {/* Like count */}
            <View style={styles.likeCountContainer}>
              <View style={[styles.row, styles.likeCountView]}>
                <IcLike fill="white" opacity={0.8} />
                <SplitColumn width={4} />
                <Text presets={['body2', 'opacity1']} color="white">
                  {likeCounts}
                </Text>
              </View>
            </View>
          </View>
          <SafeAreaView style={styles.safeAreaViewContainer} />
        </ImageBackground>
        <SplitRow height={20} />

        {/* 2. 콘텐츠 서론 */}
        <View style={styles.greetingsContainer}>
          <Greetings text={introduction} />
        </View>
        <SplitRow height={20} />

        {/* 3. 콘텐츠 메인(Body) */}
        {curation?.map((item, curationId) => {
          const {
            bakeryId,
            bakeryName,
            bakeryAddress,
            openingHours,
            bakeryImageUrl,
            checkPoint,
            newBreadTime,
            // address,
            // detailedAddress,
            websiteURL,
            instagramURL,
            facebookURL,
            blogURL,
            facilityInfo,
            phoneNumber,
            // productId,
            productName,
            productPrice,
            productImageUrl,
            reason,
            flagged,
          } = item;
          return (
            <View key={`curationBody:${curationId}`}>
              <View style={styles.body}>
                <View style={styles.mainContainer}>
                  <View style={styles.mainTextInfoContainer}>
                    <Text presets={['body2']}>{subTitle}</Text>
                    <Text presets={['heading2']}>{bakeryName}</Text>
                    <SplitRow height={10} />
                    {!!bakeryAddress && (
                      <RowInfo
                        icon={<Location />}
                        text={bakeryAddress}
                        textColor={theme.color.gray500}
                        splitColumn={8}
                      />
                    )}
                    {!!openingHours && (
                      <View>
                        <SplitRow height={2} />
                        <RowInfo
                          icon={<TimeCircle />}
                          text={openingHours}
                          textColor={theme.color.gray500}
                          splitColumn={8}
                        />
                      </View>
                    )}
                    {!!phoneNumber && (
                      <View>
                        <SplitRow height={2} />
                        <RowInfo
                          icon={<Call />}
                          text={phoneNumber}
                          textColor={theme.color.gray500}
                          splitColumn={8}
                          onPressText={() => {
                            Linking.openURL(`tel:${phoneNumber}`);
                          }}
                        />
                      </View>
                    )}
                    {!!instagramURL && (
                      <View>
                        <SplitRow height={6} />
                        <HomePageRowInfo
                          websiteURL={websiteURL}
                          instagramURL={instagramURL}
                          facebookURL={facebookURL}
                          blogURL={blogURL}
                        />
                      </View>
                    )}
                  </View>

                  <View style={styles.reportButtonContainer}>
                    <TouchableOpacity onPress={() => onPressFlag(bakeryId, bakeryName)}>
                      <IcReport
                        width={28}
                        height={28}
                        style={{ color: flagged ? theme.color.primary600 : theme.color.gray300 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <SplitRow height={5} />
                <View style={styles.tagContainer}>
                  {facilityInfo?.map((category, facilityId) => {
                    return <Tag key={`facilityInfo:${facilityId}`} text={getFacilityText(category)} />;
                  })}
                </View>
                <SplitRow height={25} />

                {bakeryImageUrl && (
                  <View>
                    <FastImage
                      source={{ uri: bakeryImageUrl }}
                      style={styles.breadImage}
                      // resizeMode="contain"
                    />
                    <SplitRow height={15} />
                  </View>
                )}
                {productImageUrl && (
                  <View>
                    <FastImage
                      source={{ uri: productImageUrl }}
                      style={styles.breadImage}
                      // resizeMode="contain"
                    />
                    <SplitRow height={15} />
                  </View>
                )}
                <View style={styles.row}>
                  <Text presets={['body1', 'bold']} color={theme.color.gray900} style={styles.rowText1}>
                    {productName}
                  </Text>
                  <Text presets={['body1', 'bold']} color={theme.color.primary600} style={styles.rowText2}>
                    {`${productPrice ? Number(productPrice).toLocaleString() : 0}원`}
                  </Text>
                </View>
                <View>
                  <SplitRow height={15} />
                  <Text presets={['body2']} color={theme.color.gray900}>
                    {reason}
                  </Text>
                </View>
                {checkPoint && (
                  <View>
                    <SplitRow height={30} />
                    <View>
                      <Text presets={['body2', 'bold']}>{'✅ 체크 포인트'}</Text>
                      <Text presets={['body2']} color={theme.color.gray900}>
                        {checkPoint}
                      </Text>
                    </View>
                  </View>
                )}
                {newBreadTime && (
                  <View>
                    <SplitRow height={30} />
                    <Text presets={['body2', 'bold']}>{'🥐 갓군빵 나오는 시간'}</Text>
                    {/* <Text presets={['body2']} color={theme.color.primary600}>
                    {'소금빵이 모두 판매되면 조기마감'}
                  </Text> */}
                    <Text presets={['body2']} color={theme.color.gray900}>
                      {newBreadTime}
                    </Text>
                  </View>
                )}
              </View>
              {curation.length - 1 !== curationId ? (
                <View>
                  <SplitRow height={40} />
                  <Divider />
                  <SplitRow height={40} />
                </View>
              ) : (
                <SplitRow height={30} />
              )}
            </View>
          );
        })}

        {/* 4. 콘텐츠 결론 */}
        <View style={styles.greetingsContainer}>
          <Greetings text={conclusion} />
        </View>

        <SplitRow height={40} />
        <Divider />

        <View style={styles.contentLikeContainer}>
          <View>
            <Text presets={['caption1']} color={theme.color.gray900}>
              방금 보고 온 빵 콘텐츠가
            </Text>
            <Text presets={['subhead']} color={theme.color.gray900}>
              마음에 들었다면?
            </Text>
          </View>

          <SplitColumn width={63} />

          <TouchableOpacity style={styles.likeButton} onPress={onLikePress}>
            <IcLike fill="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      flex: 1,
    },
    safeAreaViewContainer: {
      opacity: 0,
    },
    imageBackgroundContainer: {
      width: '100%',
      overflow: 'hidden',
      flex: 1,
    },
    imageBackgroundSubContainer: {
      flex: 1,
    },
    titleContainerInImage: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      maxWidth: Dimensions.get('screen').width * 0.8,
      textAlign: 'center',
    },
    likeCountContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginVertical: 20,
    },
    likeCountView: {
      backgroundColor: 'rgba(34, 34, 34, 0.3)',
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 3,
    },
    greetingsContainer: {
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    prevButton: {
      paddingHorizontal: 30,
      paddingVertical: 25,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    body: {
      paddingHorizontal: 20,
    },
    mainContainer: {
      flexDirection: 'row',
    },
    mainTextInfoContainer: {
      flex: 1,
    },
    reportButtonContainer: {
      marginTop: 40,
    },
    tagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    breadImage: {
      width: '100%',
      height: 300,
    },
    rowText1: {
      maxWidth: Dimensions.get('screen').width * 0.4,
      marginRight: 8,
    },
    rowText2: {
      maxWidth: Dimensions.get('screen').width * 0.6,
    },
    contentLikeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    },
    likeButton: {
      backgroundColor: theme.color.primary600,
      paddingHorizontal: 26,
      paddingVertical: 9,
      borderRadius: 4,
    },
  })
);
