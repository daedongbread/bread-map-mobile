import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Notification, Setting } from '@shared/Icons';

const ProfileHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.iconWrapper}>
        <View style={styles.notificationIcon}>
          <Notification />
        </View>
        <View>
          <Setting />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 52,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    marginRight: 12,
  },
});

export { ProfileHeader };
