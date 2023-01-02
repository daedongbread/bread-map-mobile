import React from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { PhotoSelect } from '@/components/BakeryDetail/Review/ReviewWrite/ReviewRating/PhotoSelect';
import { NavigateHeader } from '@/components/Shared/NavigateHeader/NavigateHeader';
import { TextInputWithLabel } from '@/components/Shared/TextInput';
import { PHOTO_LIMIT } from '@/containers/Review/ReviewRatingContainer';
import styled from '@emotion/native';
import { HomeStackScreenProps } from '../Stack';

const BakeryBreadReport: React.FC<HomeStackScreenProps<'BakeryMenuReviews'>> = ({ navigation }) => {
  const onSelectPhotos = async () => {
    const { assets, didCancel } = await launchImageLibrary({ mediaType: 'photo', selectionLimit: PHOTO_LIMIT });
    if (!didCancel && assets) {
      // dispatch(updateImages([...images, ...assets]));
    }
  };
  return (
    <Base>
      <NavigateHeader title="" onPressPrevBtn={() => navigation.pop()} />
      <Header>
        <Title>
          <Highlight>어떤 빵</Highlight>을{'\n'}제보하시나요?
        </Title>
      </Header>
      <TextInputWithLabel
        label={'메뉴명'}
        onChange={() => {}}
        placeholder={'텍스트 입력'}
        maxLength={10}
        autoCorrect={false}
        error="메뉴명을 입력해주세요"
        value={''}
        isRequire={true}
      />
      <TextInputWithLabel
        label={'가격'}
        onChange={() => {}}
        placeholder={'원'}
        keyboardType="numeric"
        maxLength={10}
        autoCorrect={false}
        error="가격을 입력해주세요"
        value={''}
        isRequire={true}
      />

      <PhotoSelect images={[]} deSelectPhoto={() => {}} onSelectPhotos={onSelectPhotos} />
    </Base>
  );
};

export { BakeryBreadReport };

const Base = styled.SafeAreaView``;
const Header = styled.View`
  padding-top: 12px;
  padding-left: 20px;
  margin-bottom: 18px;
`;

const Highlight = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.color.primary500};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
`;
