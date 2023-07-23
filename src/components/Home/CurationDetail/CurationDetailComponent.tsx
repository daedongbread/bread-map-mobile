import React from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider } from '@/components/BakeryDetail/Divider';
import { IcLike } from '@/components/Shared/Icons';
import { Call } from '@/components/Shared/Icons/Call';
import { LinkAngled } from '@/components/Shared/Icons/LinkAngled';
import { Location } from '@/components/Shared/Icons/Location';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { TimeCircle } from '@/components/Shared/Icons/TimeCircle';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { Greetings } from './Greetings';
import { RowInfo } from './RowInfo';
import { Tag } from './Tag';

type Props = {
  curationImage: string;
  title: string;
  likeCount: number;
  Introduction: string;
  bakeryName: string;
  location: string;
  openingHours: string;
  phone: string;
  link: string;
  tag: string;
  breadImages: Array<String>;
  breadMenuName: string;
  recommendReason: string;
  checkPoint: string;
  breadOutTime: string;
  conclusion: string;
};

export const CurationDetailComponent: React.FC<Props> = ({
  curationImage,
  title,
  likeCount,
  Introduction,
  bakeryName,
  location,
  openingHours,
  phone,
  link,
  tag,
  breadImages,
  breadMenuName,
  recommendReason,
  checkPoint,
  breadOutTime,
  conclusion,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { top } = insets;

  const onPressPrevBtn = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* 1. 콘텐츠 Title */}
        <ImageBackground
          source={{ uri: 'https://picsum.photos/200/180' }}
          style={[styles.imageBackgroundContainer, { height: 180 + top }]}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.safeAreaViewContainer} />
          <View style={styles.imageBackgroundSubContainer}>
            {/* Backbutton */}
            <TouchableOpacity onPress={onPressPrevBtn} style={styles.prevButton}>
              <PrevIcon fillColor={theme.color.white} />
            </TouchableOpacity>

            {/* Title */}
            <View style={styles.titleContainerInImage}>
              <Text presets={['body1', 'opacity1']} color="white">
                빵순 빵돌 사이에서 소문난
              </Text>
              <Text presets={['heading1']} color="white">
                겉바속쫀 소금빵 먹킷리스트
              </Text>
            </View>

            {/* Like count */}
            <View style={styles.likeCountContainer}>
              <View style={[styles.row, styles.likeCountView]}>
                <IcLike fill="white" opacity={0.8} />
                <SplitColumn width={4} />
                <Text presets={['body2', 'opacity1']} color="white">
                  78
                </Text>
              </View>
            </View>
          </View>
          <SafeAreaView style={styles.safeAreaViewContainer} />
        </ImageBackground>
        <SplitRow height={20} />

        {/* 2. 콘텐츠 서론 */}
        <View style={styles.greetingsContainer}>
          <Greetings text={'안녕하세요 ! 빵빠레에요 인기가 많아 빨리 가야하는 소금빵 맛집 5곳을 알려드릴게요'} />
        </View>
        <SplitRow height={20} />

        {/* 3. 콘텐츠 메인(Body) */}
        <View style={styles.body}>
          <View>
            <Text presets={['body2']}>하루 6번 갓구워낸</Text>
            <Text presets={['heading2']}>자연도 소금빵</Text>
          </View>
          <SplitRow height={10} />

          <View>
            <RowInfo
              icon={<Location />}
              text={'인천 중구 은하수로 10 더테라스프라자 1층'}
              textColor={theme.color.gray500}
              splitColumn={8}
            />
            <RowInfo
              icon={<TimeCircle />}
              text={'매일 09:00 ~ 22:00'}
              textColor={theme.color.gray500}
              splitColumn={8}
            />
            <RowInfo icon={<Call />} text={'031-746-2245'} textColor={theme.color.gray500} splitColumn={8} />
            <RowInfo
              icon={<LinkAngled />}
              text={'@saltbread.in.seaside'}
              textColor={theme.color.primary400}
              splitColumn={8}
            />
          </View>
          <SplitRow height={10} />

          <View style={styles.tagContainer}>
            <Tag text={'주차 가능'} />
            <Tag text={'배달 가능'} />
          </View>
          <SplitRow height={25} />

          <View>
            <FastImage
              source={{ uri: 'https://picsum.photos/200/180' }}
              style={styles.breadImage}
              // resizeMode="contain"
            />
            <SplitRow height={15} />
          </View>

          <View style={styles.row}>
            <Text presets={['body1', 'bold']} color={theme.color.gray900} style={styles.rowText1}>
              오리지날 소금빵
            </Text>
            <Text presets={['body1', 'bold']} color={theme.color.primary600} style={styles.rowText2}>
              4개 세트 12,000원
            </Text>
          </View>
          <SplitRow height={15} />
          <View>
            <Text presets={['body2']} color={theme.color.gray900}>
              {
                '소금빵 전문점이라고 들어보셨나요?\n자연도 소금빵은 캐나다산 최고등급 cw1 alf 100%와\n서해 천일염 100% 만을 사용해서 만들고 있어요.'
              }
            </Text>
          </View>
          <SplitRow height={30} />
          <View>
            <Text presets={['body2', 'bold']}>{'✅ 체크 포인트'}</Text>
            <Text presets={['body2']} color={theme.color.gray900}>
              {'세트 기준으로 판매하고 있어요'}
            </Text>
          </View>
          <SplitRow height={30} />
          <View>
            <Text presets={['body2', 'bold']}>{'🥐 갓군빵 나오는 시간'}</Text>
            <Text presets={['body2']} color={theme.color.primary600}>
              {'소금빵이 모두 판매되면 조기마감'}
            </Text>
            <Text presets={['body2']} color={theme.color.gray900}>
              {'오전 9 : 00 ~ 오전 10 :00\n오전 11:30 ~오전  12:00\n오후 12:00 ~ 오후 1:00\n오후 1:00 ~ 오후 2:00'}
            </Text>
          </View>
        </View>
        <SplitRow height={40} />

        {/* 4. 콘텐츠 결론 */}
        <View style={styles.greetingsContainer}>
          <Greetings text={'다음에 또 다른 신규 빵집으로 찾아올께요~!'} />
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

          <TouchableOpacity style={styles.likeButton}>
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
      width: Dimensions.get('window').width,
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
    likeCountContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: 20,
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
