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
  buttonType: number;
  setButtonType: Dispatch<SetStateAction<number>>;
};
//뷰
export const ProfileComponent = ({ buttonType, setButtonType }: Props) => {
  return (
    <>
      <SectionList
        sections={[{ title: 'none', data: [''] }]}
        ListHeaderComponent={() => (
          <>
            <Header type="ME" />
            <SplitRow height={16} />
            <ProfileInfo />
            <SplitRow height={16} />
          </>
        )}
        renderSectionHeader={() => (
          <View style={styles.Header}>
            <ListButtonWrap buttonType={buttonType} setButtonType={setButtonType} />
          </View>
        )}
        stickySectionHeadersEnabled
        key={buttonType === 0 ? 'G' : 'L'}
        renderItem={() => (buttonType === 0 ? <SaveList /> : <ReviewList />)}
      />
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
