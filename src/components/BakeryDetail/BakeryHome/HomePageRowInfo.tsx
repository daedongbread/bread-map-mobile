import React, { useState } from 'react';
import { Dimensions, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { EarthIcon, TopArrow } from '@/components/Shared/Icons';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

type Props = {
  websiteURL?: string;
  instagramURL?: string;
  facebookURL?: string;
  blogURL?: string;
};

type URL = '인스타그램' | '페이스북' | '블로그';

const { width } = Dimensions.get('screen');

export const HomePageRowInfo: React.FC<Props> = React.memo(({ websiteURL, instagramURL, facebookURL, blogURL }) => {
  const [isShowSocialContainer, setIsShowSocialContainer] = useState(true);

  const onPressInstagramURL = async () => {
    const username = instagramURL!.split('.com')[1].replaceAll('/', '');
    const instagramDeepLink = `instagram://user?username=${username}`;

    const isCanOpen = await Linking.canOpenURL(instagramDeepLink);

    openURL(isCanOpen ? instagramDeepLink : instagramURL!);
  };

  const onPressFacebookURL = async () => {
    const userId = facebookURL!.split('?id=')[1];
    const facebookDeepLink = `fb://profile/${userId}`;

    const isCanOpen = await Linking.canOpenURL(facebookDeepLink);

    openURL(isCanOpen ? facebookDeepLink : facebookURL!);
  };

  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  const SocialItem = ({ name, onPress }: { name: URL; onPress: () => void }) => {
    return (
      <React.Fragment>
        <TouchableOpacity onPress={onPress}>
          <Text color="#4992FF" presets={['caption2', 'medium']}>
            {name}
          </Text>
        </TouchableOpacity>
        <SplitColumn width={10} />
      </React.Fragment>
    );
  };

  return (
    <View style={[styles.row, styles.container]}>
      <View>
        <EarthIcon />
      </View>

      <View style={styles.textWrapper}>
        {!!websiteURL && (
          <>
            <View style={[styles.row, styles.websiteContainer]}>
              <TouchableOpacity onPress={() => openURL(websiteURL)}>
                <Text color={theme.color.primary500} presets={['caption2', 'medium']} style={styles.text}>
                  {websiteURL.trim()}
                </Text>
              </TouchableOpacity>

              <SplitColumn width={4} />

              <TouchableOpacity onPress={() => setIsShowSocialContainer(prev => !prev)}>
                <TopArrow strokeWidth={2} style={!isShowSocialContainer && styles.reverseRotate} />
              </TouchableOpacity>
            </View>

            <SplitRow height={4} />
          </>
        )}

        {isShowSocialContainer && (
          <View style={styles.row}>
            {!!instagramURL && <SocialItem name="인스타그램" onPress={onPressInstagramURL} />}
            {!!facebookURL && <SocialItem name="페이스북" onPress={onPressFacebookURL} />}
            {!!blogURL && <SocialItem name="블로그" onPress={() => openURL(blogURL)} />}
          </View>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create(
  resizePixels({
    row: {
      flexDirection: 'row',
    },
    container: {
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
    websiteContainer: {
      alignItems: 'center',
    },
    reverseRotate: {
      transform: [{ rotate: '180deg' }],
    },
  })
);
