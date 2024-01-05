import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LocationMarker } from '@/components/Shared/Icons';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { Row } from '@/components/Shared/View';
import { theme } from '@/styles/theme';
import BigRightArrow from '@shared/Icons/BigRightArrow.svg';
import CancleIcon from '@shared/Icons/CancleIcon.svg';

type Props = {
  bakeryName: string;
};

export const BakeryTagRow = ({ bakeryName }: Props) => {
  return (
    <Row style={[styles.container, !!bakeryName && styles.activeContainer]}>
      <Row style={styles.alignCenter}>
        {bakeryName ? (
          <>
            <LocationMarker fillColor="#F66131" subFillColor="#FFF6F4" />
            <SplitColumn width={8} />
            <Text color={theme.color.primary600} presets={['bold']}>
              {bakeryName}
            </Text>
          </>
        ) : (
          <>
            <LocationMarker fillColor="#9E9E9E" subFillColor="#F5F5F5" />
            <SplitColumn width={8} />
            <Text color={theme.color.gray600} presets={['body2', 'regular']}>
              빵집을 태그해 주세요.
            </Text>
          </>
        )}
      </Row>

      <Row style={styles.alignCenter}>
        {bakeryName ? (
          <CancleIcon />
        ) : (
          <>
            <View style={styles.requireTag}>
              <Text color={theme.color.primary600} presets={['caption2', 'regular']}>
                필수
              </Text>
            </View>
            <SplitColumn width={8} />
            <BigRightArrow />
          </>
        )}
      </Row>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.gray100,
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  activeContainer: {
    backgroundColor: theme.color.primary50,
    paddingVertical: 16,
  },
  alignCenter: {
    alignItems: 'center',
  },
  requireTag: {
    borderColor: theme.color.primary600,
    borderWidth: 1,
    borderRadius: 34,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
});
