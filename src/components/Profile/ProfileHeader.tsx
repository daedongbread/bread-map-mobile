import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Notification, Setting } from '@shared/Icons';

interface ProfileHeaderProps {
  showBackButton: boolean;
}

const ProfileHeader = ({ showBackButton }: ProfileHeaderProps) => {
  const { goBack } = useNavigation<MainStackScreenProps<'Profile'>['navigation']>();

  return (
    <View style={propStyles(showBackButton).header}>
      {showBackButton ? (
        <ArrowLeft onPress={goBack} />
      ) : (
        <View style={styles.iconWrapper}>
          <View style={styles.notificationIcon}>
            <Notification />
          </View>
          <View>
            <Setting />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    marginRight: 12,
  },
});

const propStyles = (showBackButton: boolean) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: showBackButton ? 'flex-start' : 'flex-end',
      height: 52,
    },
  });

export { ProfileHeader };
