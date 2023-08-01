import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ToggleMenu } from '@/containers/Community/CommunityContainer';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { SplitRow } from '../Shared/SplitSpace';
import { Row } from '../Shared/View';
import { Header } from './Header';
import { PostSummary } from './Post';
import { Toggle } from './Toggle';

type Props = {
  menus: ToggleMenu[];
  topic: string;
  onPressPrev: () => void;
  onPressWrite: () => void;
  onPressToggle: (topic: string) => void;
  onPressPost: (type: number) => void;
};

export const CommunityComponent = ({ menus, topic, onPressPrev, onPressWrite, onPressToggle, onPressPost }: Props) => {
  return (
    <ScrollView>
      <SafeAreaView>
        <Header title="커뮤니티" onPressPrev={onPressPrev} onPressWrite={onPressWrite} />

        <SplitRow height={8} />

        <Row>
          <FlatList
            data={menus}
            renderItem={({ item }) => (
              <Toggle
                title={item.title}
                isSeleted={item.topic === topic}
                onPressToggle={() => onPressToggle(item.topic)}
              />
            )}
            contentContainerStyle={styles.toggleContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </Row>

        <SplitRow height={16} />

        <View style={styles.postCntainer}>
          <TouchableOpacity onPress={() => onPressPost(0)}>
            <PostSummary isFirst />
          </TouchableOpacity>
          <PostSummary isFirst={false} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    paddingHorizontal: 19,
  },
  postCntainer: {
    paddingHorizontal: 20,
  },
});
