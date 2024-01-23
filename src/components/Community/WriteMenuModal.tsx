import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PostTopic } from '@/apis/community/types';
import { ToggleMenu } from '@/containers/Community/CommunityContainer';
import { useDimensions } from '@/hooks/useDimensions';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import CloseIcon from '@shared/Icons/CloseIcon.svg';
import { SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';

type Props = {
  visible: boolean;
  menus: ToggleMenu[];
  y: number;
  onPressWrite: (postTopic: PostTopic) => void;
  onPressClose: () => void;
};

export const WriteMenuModal = ({ visible, menus, y, onPressWrite, onPressClose }: Props) => {
  const { height } = useDimensions();
  const navigation = useNavigation();

  return (
    <Modal visible={visible} animationType={'fade'} transparent={true}>
      <Pressable style={styles.container} onPress={onPressClose}>
        <View style={[styles.contentContainer, { bottom: height - y - 48 }]}>
          <Pressable style={[styles.menuContainer, styles.menuTitleContainer]} onPress={() => onPressWrite('REVIEW')}>
            <Text color={theme.color.gray900} presets={['body2', 'regular']}>
              빵집 리뷰
            </Text>
          </Pressable>
          <Pressable
            style={[styles.menuContainer, styles.menuTitleContainer]}
            onPress={() => {
              onPressClose();
              navigation.navigate('ReviewWriteStack', {
                screen: 'BakeryManualWrite',
              });
            }}
          >
            <Text color={theme.color.gray900} presets={['body2', 'regular']}>
              리뷰 직접
            </Text>
          </Pressable>

          <SplitRow height={8} />

          <Pressable style={styles.menuContainer}>
            <FlatList
              keyExtractor={item => item.postTopic}
              data={menus.filter(item => !['ALL', 'REVIEW', 'EVENT'].includes(item.postTopic))}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <SplitRow height={20} />}
              renderItem={({ item }) => (
                <Pressable onPress={() => onPressWrite(item.postTopic)}>
                  <Text color={theme.color.gray900} presets={['body2', 'regular']}>
                    {item.title}
                  </Text>
                </Pressable>
              )}
            />
          </Pressable>

          <SplitRow height={8} />

          <Pressable onPress={onPressClose}>
            <View style={styles.floatingButton}>
              <CloseIcon />
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  contentContainer: {
    position: 'absolute',
    right: 20,
  },
  menuTitleContainer: {
    paddingVertical: 16,
  },
  menuContainer: {
    backgroundColor: theme.color.white,
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 40,
    borderRadius: 8,
  },
  floatingButton: {
    alignSelf: 'flex-end',
    backgroundColor: theme.color.white,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
});
