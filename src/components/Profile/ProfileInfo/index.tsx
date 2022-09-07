import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@/components/Shared/Button/Button';
import { Text } from '@/components/Shared/Text';
import { useNavigation } from '@react-navigation/native';
import { FollowInfo } from './FollowInfo';

interface ProfileInfoProps {
  isTabNavigated: boolean;
}

const ProfileInfo = ({ isTabNavigated }: ProfileInfoProps) => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.flexBox}>
        <View style={styles.profileImage} />

        <View style={styles.infoWrapper}>
          <Text presets={['body1', 'bold']} style={styles.nickname}>
            빵순이님
          </Text>

          <FollowInfo />
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          appearance={isTabNavigated ? 'secondary' : 'terdary'}
          style={styles.buttonStyle}
          onPress={() => {
            if (!isTabNavigated) {
              navigate('MainStack', {
                screen: 'ProfileEdit',
              });
            }
          }}
        >
          {isTabNavigated ? '팔로우' : '수정'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: 60,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    padding: 0,
  },
  buttonStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  profileImage: {
    width: 60,
    height: 60,
    backgroundColor: 'gray',
    marginRight: 16,
  },
  infoWrapper: {
    flexDirection: 'column',
  },
  nickname: {
    marginBottom: 6,
  },
});

export { ProfileInfo };
