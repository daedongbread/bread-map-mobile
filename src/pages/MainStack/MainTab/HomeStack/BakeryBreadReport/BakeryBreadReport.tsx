import React from 'react';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { PhotoSelect } from '@/components/BakeryDetail/Review/ReviewWrite/ReviewRating/PhotoSelect';
import { Button } from '@/components/Shared/Button/Button';
import { NavigateHeader } from '@/components/Shared/NavigateHeader/NavigateHeader';
import { TextInputWithLabel } from '@/components/Shared/TextInput';
import { PHOTO_LIMIT } from '@/containers/Review/ReviewRatingContainer';
import styled from '@emotion/native';
import { HomeStackScreenProps } from '../Stack';

type SubmitDataType = {
  menuName: string;
  price: string;
  images: Asset[];
};
const BakeryBreadReport: React.FC<HomeStackScreenProps<'BakeryMenuReviews'>> = ({ navigation }) => {
  const [submitData, setSubmitData] = React.useState<SubmitDataType>({
    menuName: '',
    price: '',
    images: [],
  });
  const onChangeMenuName = (text: string) => {
    setSubmitData(prev => ({ ...prev, menuName: text }));
  };
  const onChangePrice = (text: string) => {
    setSubmitData(prev => ({ ...prev, price: text }));
  };

  const onSelectPhotos = async () => {
    const { assets, didCancel } = await launchImageLibrary({ mediaType: 'photo', selectionLimit: PHOTO_LIMIT });
    if (!didCancel && assets) {
      setSubmitData(prev => ({ ...prev, images: [...submitData.images, ...assets] }));
    }
  };

  const onSubmitButtonPress = () => {
    //TODO: 서버에 데이터 전송
  };

  const isSubmitDataValid = !!submitData.menuName && !!submitData.price;

  return (
    <Base>
      <FormView>
        <NavigateHeader title="" onPressPrevBtn={() => navigation.pop()} />
        <Header>
          <Title>
            <Highlight>어떤 빵</Highlight>을{'\n'}제보하시나요?
          </Title>
        </Header>
        <TextInputWithLabel
          label={'메뉴명'}
          isAlert
          onChangeText={onChangeMenuName}
          placeholder={'텍스트 입력'}
          autoCorrect={false}
          error={submitData.menuName ? undefined : '메뉴명을 입력해주세요'}
          value={submitData.menuName}
          isRequire={true}
        />
        <TextInputWithLabel
          label={'가격'}
          onChangeText={onChangePrice}
          isAlert
          placeholder={'원'}
          keyboardType="numeric"
          autoCorrect={false}
          value={submitData.price}
          isRequire={true}
          error={submitData.price ? undefined : '가격을 입력해주세요'}
        />

        <PhotoSelect images={submitData.images} deSelectPhoto={() => {}} onSelectPhotos={onSelectPhotos} />
      </FormView>
      <ButtonWrapper>
        <Button
          onPress={onSubmitButtonPress}
          disabled={isSubmitDataValid}
          appearance={isSubmitDataValid ? 'primary' : 'quaternary'}
        >
          확인
        </Button>
      </ButtonWrapper>
    </Base>
  );
};

export { BakeryBreadReport };
const FormView = styled.View``;
const Base = styled.SafeAreaView`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;
const Header = styled.View`
  padding-top: 12px;
  padding-left: 20px;
  margin-bottom: 18px;
`;

const ButtonWrapper = styled.View`
  padding: 0 20px;
  margin: 20px 0;
  background-color: ${({ theme }) => theme.color.white};
`;
const Highlight = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.color.primary500};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
`;
