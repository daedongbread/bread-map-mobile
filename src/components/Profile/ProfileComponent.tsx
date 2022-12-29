import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, SectionList, View } from 'react-native';
import { resizePixels } from '@/utils';
import { SplitRow } from '../Shared/SplitSpace';
import { Header } from './Header';
import { ListButtonWrap } from './ListButtonWrap';
import { ProfileInfo } from './ProfileInfo';
import { ReviewList } from './ReviewList';
import { SaveList } from '.';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';

type Props = {
  profileInfoData: any;
  loading: boolean;
  buttonType: number;
  setButtonType: Dispatch<SetStateAction<number>>;
  onItemClick: (item: any) => void;
  onClickUpdateButton: () => void;
  onFollowButtonClick: (userId: number) => void;
  userId: any;
};

export const FlagColors = {
  ORANGE: '#FF6E40',
  GREEN: '#1EC780',
  YELLOW: '#FFBF1B',
  CYAN: '#00C7D3',
  BLUE: '#1A73E9',
  SKY: '#50A0FF',
  NAVY: '#AD44FF',
  PURPLE: '#7B61FF',
  RED: '#FF4141',
  PINK: '#FF7294',
} as const;

export const ProfileComponent = ({
  profileInfoData,
  loading,
  buttonType,
  setButtonType,
  onItemClick,
  onClickUpdateButton,
  onFollowButtonClick,
  userId,
}: Props) => {
  return (
    <>
      {loading ? null : (
        <SectionList
          sections={[{ title: 'none', data: [''] }]}
          bounces={false}
          ListHeaderComponent={() => (
            <>
              <Header type={userId ? 'OTHER' : 'ME'} />
              <SplitRow height={16} />
              <ProfileInfo
                profileInfoData={profileInfoData}
                onClickUpdateButton={onClickUpdateButton}
                onFollowButtonClick={onFollowButtonClick}
                userId={userId}
              />
              <SplitRow height={16} />
            </>
          )}
          renderSectionHeader={() => (
            <View style={styles.Header}>
              <ListButtonWrap profileInfoData={profileInfoData} buttonType={buttonType} setButtonType={setButtonType} />
            </View>
          )}
          stickySectionHeadersEnabled
          key={buttonType === 0 ? 'G' : 'L'}
          renderItem={() =>
            buttonType === 0 ? (
              <SaveList userFlagList={profileInfoData?.userFlagList} onItemClick={onItemClick} />
            ) : (
              <ReviewList userReviewList={profileInfoData?.userReviewList} />
            )
          }
        />
      )}
    </>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    Header: {
      height: 48,
      backgroundColor: 'white',
    },
  })
);
