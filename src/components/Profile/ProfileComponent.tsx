import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, SectionList, View } from 'react-native';
import { resizePixels } from '@/utils';
import { SplitRow } from '../Shared/SplitSpace';
import { Header } from './Header';
import { ListButtonWrap } from './ListButtonWrap';
import { ProfileInfo } from './ProfileInfo';
import { ReviewList } from './ReviewList';
import { SaveList } from '.';

type Props = {
  profileInfoData: any;
  loading: boolean;
  buttonType: number;
  setButtonType: Dispatch<SetStateAction<number>>;
};
//뷰
export const ProfileComponent = ({ profileInfoData, loading, buttonType, setButtonType }: Props) => {
  return (
    <>
      {loading ? null : (
        <SectionList
          sections={[{ title: 'none', data: [''] }]}
          ListHeaderComponent={() => (
            <>
              <Header type="ME" />
              <SplitRow height={16} />
              <ProfileInfo profileInfoData={profileInfoData} />
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
              <SaveList userFlagList={profileInfoData?.userFlagList} />
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
