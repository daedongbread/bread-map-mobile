import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@shared/Button/Button';
import { Text } from '@shared/Text';

interface ProfileProps {
  navigation: MainStackScreenProps<'Profile'>;
}

const Profile = ({ navigation }: ProfileProps) => {
  {
    /* TODO: navigate 시 back button header 테스트를 위한 임시 코드. 테스트 이후 제거 예정 */
  }
  const { navigate } = useNavigation();

  // bottom tab에서 프로필 페이지에 접근한 경우, navigation 객체에 jumpTo property가 존재하므로 jumpTo로 backButton을 보여줄 것인지 트리거
  // @ts-ignore
  const showBackButton = navigation.jumpTo === undefined;

  return (
    <SafeAreaView>
      <View style={styles.layout}>
        <ProfileHeader showBackButton={showBackButton} />
        <Text>Profile</Text>

        {/* TODO: navigate 시 back button header 테스트를 위한 임시 코드. 테스트 이후 제거 예정 */}
        <Button
          onPress={() => {
            navigate('MainStack', {
              screen: 'Profile',
            });
          }}
        >
          다른 사람 프로필 보러가기
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 20,
  },
});

export { Profile };
